import { useState, useEffect } from 'react';

/**
 * Tracks normalized scroll progress [0, 1] for a target element
 * Avoids expensive state updates during frame render by optionally using a ref or callback
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;

    const calculateProgress = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // When rect.top is 0, we are at start of sticky container
      // When rect.top is -totalScrollableDistance, we reached the end
      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setProgress(clamped);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return progress;
}
