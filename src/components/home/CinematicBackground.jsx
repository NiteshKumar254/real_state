import React, { useState, useEffect, useRef } from 'react';
import ConstructionCanvas from './ConstructionCanvas';
import { useConstructionFrames } from '../../hooks/useConstructionFrames';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * CinematicBackground
 * Crystal-Clear Hero & Scroll-Driven Construction Animation
 * - Stage A (Scroll 0): Displays the initial empty land plot (hero-land.jpg) with ZERO overlays or dark tints.
 * - Stage B (Scroll down): As the user scrolls, the 235-frame construction sequence builds the house
 *                         directly onto this land, completely crystal-clear with raw natural colors.
 * - Reverse scroll: Smoothly reverses back to the initial empty land.
 * - Completion: Persists final completed luxury residence at Featured Properties.
 */
export default function CinematicBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { totalFrames, getRenderableImage } = useConstructionFrames();

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentFrameIndex(totalFrames - 1);
      currentFrameRef.current = totalFrames - 1;
      return;
    }

    const calculateFrame = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight || 800;
      const featuredElem = document.getElementById('featured-properties-section');

      // Scroll progression distance matching the story arc
      let animationDistance = windowH * 2.5;
      if (featuredElem) {
        const rect = featuredElem.getBoundingClientRect();
        const absoluteTop = rect.top + scrollY;
        animationDistance = Math.max(windowH * 1.5, absoluteTop - (windowH * 0.25));
      }

      const rawProgress = scrollY / animationDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      const newFrame = Math.round(clampedProgress * (totalFrames - 1));

      if (newFrame !== currentFrameRef.current) {
        currentFrameRef.current = newFrame;
        setCurrentFrameIndex(newFrame);
      }
    };

    const handleScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(calculateFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateFrame();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion, totalFrames]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. INITIAL HERO IMAGE: The crystal-clear land plot (Frame 1) */}
      {/* Immediately visible with zero delays, zero overlays, zero effects */}
      <img
        src="/assets/images/hero/hero-land.jpg"
        alt="Aurelia Estate Prime Residential Land"
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover object-center max-md:object-[50%_35%]"
      />

      {/* 2. CONSTRUCTION ANIMATION CANVAS */}
      {/* Draws frame-by-frame smoothly over the land as user scrolls, 100% crystal-clear */}
      <ConstructionCanvas
        getRenderableImage={getRenderableImage}
        targetFrameIndex={currentFrameIndex}
      />
    </div>
  );
}
