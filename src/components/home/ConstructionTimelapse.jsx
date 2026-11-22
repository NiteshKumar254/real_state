import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { useConstructionFrames } from '../../hooks/useConstructionFrames';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

const PLAYBACK_DURATION_MS = 7500; // ~7.5 seconds for complete sequence (~31 FPS)

/**
 * ConstructionTimelapse
 * Standalone time-based auto-playing Canvas animation component
 * - Plays automatically when ~40% visible in viewport (IntersectionObserver)
 * - Elapsed-time based playback ensures consistent 7.5s speed across all hardware
 * - Auto-plays once, leaves final completed house visible
 * - Pauses when scrolled out of view, resumes when returned
 * - Clean minimal controls: Play/Pause, Replay, elapsed progress bar
 */
export default function ConstructionTimelapse() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    totalFrames,
    getRenderableImage
  } = useConstructionFrames();

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Refs for requestAnimationFrame coordinate loops
  const rafIdRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedOffsetRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isVisibleRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Canvas drawing function for a given frame index
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const { img } = getRenderableImage(frameIdx);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = displayWidth / imgAspect;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle vignette
    const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
    gradient.addColorStop(0, 'rgba(17, 24, 39, 0.25)');
    gradient.addColorStop(0.15, 'transparent');
    gradient.addColorStop(0.85, 'transparent');
    gradient.addColorStop(1, 'rgba(17, 24, 39, 0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.restore();
  }, [getRenderableImage]);

  // Main playback loop (elapsed-time based)
  const tick = useCallback((timestamp) => {
    if (!isPlayingRef.current) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = (timestamp - startTimeRef.current) + elapsedOffsetRef.current;
    const rawProgress = Math.min(1, elapsed / PLAYBACK_DURATION_MS);

    setProgress(rawProgress);

    const frameIdx = Math.min(totalFrames - 1, Math.floor(rawProgress * totalFrames));
    setCurrentFrameIndex(frameIdx);
    drawFrame(frameIdx);

    if (rawProgress >= 1) {
      // Finished playback: lock at final frame
      setIsPlaying(false);
      isPlayingRef.current = false;
      setHasPlayedOnce(true);
      elapsedOffsetRef.current = PLAYBACK_DURATION_MS;
      drawFrame(totalFrames - 1);
    } else {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [drawFrame, totalFrames]);

  // Start playback
  const startPlaying = useCallback(() => {
    if (prefersReducedMotion) {
      // Reduced motion: directly show completed frame
      setCurrentFrameIndex(totalFrames - 1);
      setProgress(1);
      drawFrame(totalFrames - 1);
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    startTimeRef.current = null;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame, prefersReducedMotion, tick, totalFrames]);

  // Pause playback
  const pausePlaying = useCallback(() => {
    if (isPlayingRef.current) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      // Save elapsed position
      if (startTimeRef.current) {
        elapsedOffsetRef.current += performance.now() - startTimeRef.current;
      }
    }
  }, []);

  // Replay from beginning
  const handleReplay = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    elapsedOffsetRef.current = 0;
    startTimeRef.current = null;
    setProgress(0);
    setCurrentFrameIndex(0);
    drawFrame(0);
    startPlaying();
  }, [drawFrame, startPlaying]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      pausePlaying();
    } else {
      if (progress >= 1) {
        handleReplay();
      } else {
        startPlaying();
      }
    }
  };

  // IntersectionObserver to auto-play when ~40% visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        isVisibleRef.current = isVisible;

        if (isVisible) {
          // If first time visible, start playback automatically
          if (!hasPlayedOnce && !isPlayingRef.current && progress < 1) {
            startPlaying();
          } else if (isPlayingRef.current) {
            // Resume if it was playing
            startTimeRef.current = null;
            rafIdRef.current = requestAnimationFrame(tick);
          }
        } else {
          // Off-screen: pause to preserve CPU and battery
          if (isPlayingRef.current) {
            pausePlaying();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [hasPlayedOnce, pausePlaying, progress, startPlaying, tick]);

  // Initial draw of frame 0 or final frame
  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentFrameIndex(totalFrames - 1);
      setProgress(1);
      drawFrame(totalFrames - 1);
    } else {
      drawFrame(currentFrameIndex);
    }
  }, [currentFrameIndex, drawFrame, prefersReducedMotion, totalFrames]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrameIndex, drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-primary-dark shadow-2xl border border-gray-100 group"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ display: 'block' }}
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-dark/80 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
        <span className="tracking-wider uppercase text-[11px]">THE MAKING OF A LANDMARK</span>
      </div>

      {/* Frame Counter Tag */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary-dark/80 backdrop-blur-md border border-white/10 text-gray-300 font-mono text-[11px]">
        FRAME {currentFrameIndex + 1}/{totalFrames}
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 bg-gradient-to-t from-primary-dark/95 via-primary-dark/60 to-transparent flex flex-col gap-2.5">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-luxury-gold rounded-full transition-all duration-75"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        {/* Buttons & Status */}
        <div className="flex items-center justify-between text-white text-xs pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white/15 hover:bg-luxury-gold hover:text-primary-dark backdrop-blur-md border border-white/20 transition-all"
              aria-label={isPlaying ? 'Pause Timelapse' : 'Play Timelapse'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={handleReplay}
              className="p-2 rounded-full bg-white/15 hover:bg-luxury-gold hover:text-primary-dark backdrop-blur-md border border-white/20 transition-all"
              aria-label="Replay Timelapse"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-gray-300 font-medium ml-1">
              {progress >= 1 ? 'Completed Transformation' : isPlaying ? 'Playing Timelapse' : 'Paused'}
            </span>
          </div>

          <span className="text-[11px] font-mono text-luxury-gold font-semibold">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
