import { useState, useEffect, useRef, useCallback } from 'react';
import { CONSTRUCTION_FRAMES, TOTAL_CONSTRUCTION_FRAMES } from '../data/constructionFrames';

/**
 * Custom Hook for Smart Progressive Frame Loading & Bounded In-Memory Cache
 * - Loads frame 0 immediately
 * - Preloads frames progressively near current scroll position
 * - Bounded LRU/Window cache prevents unbounded browser memory usage
 * - Avoids rendering blank frames while an image is decoding
 * - Keeps last valid frame visible
 */
export function useConstructionFrames() {
  const totalFrames = TOTAL_CONSTRUCTION_FRAMES;
  const imageCacheRef = useRef(new Map()); // Map<index, HTMLImageElement>
  const loadingSetRef = useRef(new Set()); // Set<index>
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const lastRenderedIndexRef = useRef(0);

  // Helper to load a single frame
  const loadFrame = useCallback((index) => {
    if (index < 0 || index >= totalFrames) return Promise.resolve(null);
    if (imageCacheRef.current.has(index)) {
      return Promise.resolve(imageCacheRef.current.get(index));
    }
    if (loadingSetRef.current.has(index)) {
      return Promise.resolve(null);
    }

    loadingSetRef.current.add(index);
    const url = CONSTRUCTION_FRAMES[index];

    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imageCacheRef.current.set(index, img);
        loadingSetRef.current.delete(index);
        setLoadedCount(prev => prev + 1);
        if (index === 0) setFirstFrameLoaded(true);
        resolve(img);
      };
      img.onerror = () => {
        loadingSetRef.current.delete(index);
        resolve(null);
      };
    });
  }, [totalFrames]);

  // Initial load: frame 0, frame totalFrames - 1, and initial burst of 15 frames
  useEffect(() => {
    let isMounted = true;

    // Load first frame with high priority
    loadFrame(0).then(() => {
      if (!isMounted) return;
      // Preload next immediate 15 frames for instant responsiveness
      const initialBurst = Math.min(20, totalFrames);
      for (let i = 1; i < initialBurst; i++) {
        loadFrame(i);
      }
      // Also preload the final frame for fast scrub-to-bottom
      if (totalFrames > 1) {
        loadFrame(totalFrames - 1);
      }
    });

    // Idle-time progressive loading for the rest of the sequence
    let idleTimer = null;
    let nextIndexToLoad = 20;

    const progressiveLoader = () => {
      if (!isMounted) return;
      if (nextIndexToLoad < totalFrames) {
        // Load in batches of 3 during idle frames
        const batchEnd = Math.min(nextIndexToLoad + 3, totalFrames);
        for (let i = nextIndexToLoad; i < batchEnd; i++) {
          loadFrame(i);
        }
        nextIndexToLoad = batchEnd;
        idleTimer = setTimeout(progressiveLoader, 60);
      }
    };

    idleTimer = setTimeout(progressiveLoader, 300);

    return () => {
      isMounted = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [loadFrame, totalFrames]);

  /**
   * Preload window around current scroll target
   * If target is index 50, load [40 ... 60] with high priority
   */
  const preloadSurrounding = useCallback((targetIndex) => {
    const windowSize = 10;
    const start = Math.max(0, targetIndex - windowSize);
    const end = Math.min(totalFrames - 1, targetIndex + windowSize);

    for (let i = start; i <= end; i++) {
      if (!imageCacheRef.current.has(i) && !loadingSetRef.current.has(i)) {
        loadFrame(i);
      }
    }
  }, [loadFrame, totalFrames]);

  /**
   * Returns the best available frame for rendering:
   * 1. Exact frame if loaded
   * 2. Nearest loaded neighbor
   * 3. Last successfully rendered frame
   * 4. Frame 0
   */
  const getRenderableImage = useCallback((targetIndex) => {
    const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(targetIndex)));
    preloadSurrounding(clamped);

    if (imageCacheRef.current.has(clamped)) {
      lastRenderedIndexRef.current = clamped;
      return { img: imageCacheRef.current.get(clamped), actualIndex: clamped };
    }

    // Check immediate neighbors within distance of 15
    for (let offset = 1; offset <= 15; offset++) {
      const prev = clamped - offset;
      if (prev >= 0 && imageCacheRef.current.has(prev)) {
        lastRenderedIndexRef.current = prev;
        return { img: imageCacheRef.current.get(prev), actualIndex: prev };
      }
      const next = clamped + offset;
      if (next < totalFrames && imageCacheRef.current.has(next)) {
        lastRenderedIndexRef.current = next;
        return { img: imageCacheRef.current.get(next), actualIndex: next };
      }
    }

    // Fallback to last rendered
    if (imageCacheRef.current.has(lastRenderedIndexRef.current)) {
      return { 
        img: imageCacheRef.current.get(lastRenderedIndexRef.current), 
        actualIndex: lastRenderedIndexRef.current 
      };
    }

    // Fallback to frame 0
    if (imageCacheRef.current.has(0)) {
      return { img: imageCacheRef.current.get(0), actualIndex: 0 };
    }

    return { img: null, actualIndex: 0 };
  }, [preloadSurrounding, totalFrames]);

  return {
    totalFrames,
    firstFrameLoaded,
    loadedCount,
    getRenderableImage,
    preloadSurrounding
  };
}
