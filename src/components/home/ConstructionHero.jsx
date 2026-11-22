import React, { useRef } from 'react';
import ConstructionCanvas from './ConstructionCanvas';
import HeroOverlay from './HeroOverlay';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useConstructionFrames } from '../../hooks/useConstructionFrames';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { FALLBACK_HERO_IMAGE } from '../../utils/imageHelpers';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ConstructionHero
 * Redesigned sticky cinematic background hero:
 * - Height tuned to ~225vh (providing ~125vh of scroll travel instead of the old 400vh)
 * - Construction sequence rapidly completes in the first ~58% of scroll travel
 * - The completed house remains visible briefly before the next content panel slides up over it
 */
export default function ConstructionHero() {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const {
    totalFrames,
    getRenderableImage
  } = useConstructionFrames();

  // Rapid frame progression: completes by scrollProgress = 0.58
  // Clamped so it stays at the final frame (completed house) thereafter
  const constructionProgress = Math.max(0, Math.min(1, scrollProgress / 0.58));
  const targetFrameIndex = Math.max(
    0,
    Math.min(totalFrames - 1, Math.round(constructionProgress * (totalFrames - 1)))
  );

  if (prefersReducedMotion) {
    // Accessible Reduced Motion Static Fallback
    return (
      <section className="relative w-full h-screen bg-primary-dark z-0" aria-label="Aurelia Estates Hero">
        <div className="relative w-full h-full">
          <img
            src={FALLBACK_HERO_IMAGE}
            alt="Completed luxury modern villa by Aurelia Estates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent flex items-center justify-center p-6 text-center text-white">
            <div className="max-w-2xl">
              <span className="text-luxury-gold text-xs font-semibold tracking-widest uppercase">
                Aurelia Estates
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-3 mb-6">
                Where Extraordinary Living Begins
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Transforming land into extraordinary architectural living spaces.
              </p>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-primary-dark font-semibold text-sm hover:bg-luxury-goldLight transition-all"
              >
                <span>Explore Properties</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="construction-hero"
      className="relative w-full h-[225vh] sm:h-[230vh] bg-primary-dark z-0"
      aria-label="Interactive Construction Evolution"
    >
      {/* Sticky 100vh Viewport (z-0 background layer) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-dark z-0">
        <ConstructionCanvas
          getRenderableImage={getRenderableImage}
          targetFrameIndex={targetFrameIndex}
        />

        {/* Hero Text & Progress Overlay (z-[2]) */}
        <HeroOverlay
          scrollProgress={scrollProgress}
          constructionProgress={constructionProgress}
          currentFrame={targetFrameIndex}
          totalFrames={totalFrames}
        />
      </div>
    </section>
  );
}
