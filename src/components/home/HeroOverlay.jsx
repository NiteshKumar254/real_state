


import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';

export default function HeroOverlay({
  scrollProgress,
  constructionProgress,
  currentFrame,
  totalFrames
}) {

  // Initial headline animation
  const initialOpacity = Math.max(
    0,
    Math.min(1, 1 - scrollProgress * 5.5)
  );

  // Final headline animation
  let finalHeadlineOpacity = 0;

  if (scrollProgress >= 0.48 && scrollProgress <= 0.74) {
    if (scrollProgress < 0.58) {
      finalHeadlineOpacity = (scrollProgress - 0.48) / 0.10;
    } else {
      finalHeadlineOpacity = Math.max(
        0,
        1 - (scrollProgress - 0.64) / 0.10
      );
    }
  }

  // Scroll indicator
  const scrollIndicatorOpacity = Math.max(
    0,
    1 - scrollProgress * 4.5
  );

  // Construction progress
  const buildPercent = Math.round(constructionProgress * 100);

  const meterOpacity = Math.max(
    0,
    Math.min(1, 1 - (scrollProgress - 0.58) * 6)
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 z-[2] text-white">

      {/* TOP SPACING */}

      <div className="h-16 sm:h-20 flex-shrink-0" />

      {/* INITIAL HERO HEADLINE */}

      <div
        style={{
          opacity: initialOpacity,
          transform: `translateY(${scrollProgress * -35}px)`,
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
        }}
        className="max-w-3xl w-full"
      >

        {/* Badge */}

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-luxury-gold text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4">

          <Compass
            className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0"
          />

          <span>THE ART OF BUILDING</span>

        </div>

        {/* Main Heading */}

        <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 drop-shadow-md">

          From Vision <br />

          <span className="italic font-normal text-luxury-gold">
            to Reality.
          </span>

        </h1>

        {/* Description */}

        <p className="text-sm min-[400px]:text-base sm:text-xl text-gray-200 font-light max-w-xl leading-relaxed drop-shadow">
          Transforming land into extraordinary living spaces.
        </p>

      </div>

      {/* FINAL HEADLINE */}

      <div
        style={{
          opacity: finalHeadlineOpacity,
          transform: `translateY(${(1 - finalHeadlineOpacity) * 20}px)`,
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
        }}
        className="max-w-xl w-full self-start mb-6 sm:mb-12 md:mb-16"
      >

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/40 text-luxury-gold text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-2">

          <Sparkles className="w-3 h-3 flex-shrink-0" />

          <span>VISION REALIZED</span>

        </div>

        <h2 className="text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-lg">

          Where Extraordinary <br />

          <span className="italic font-normal text-luxury-gold">
            Living Begins.
          </span>

        </h2>

      </div>

      {/* BOTTOM STATUS SECTION */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full pt-3 sm:pt-4 border-t border-white/15 flex-shrink-0">

        {/* SCROLL INDICATOR */}

        <div
          style={{
            opacity: scrollIndicatorOpacity,
            transition: 'opacity 0.3s ease'
          }}
          className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-gray-300"
        >

          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center animate-bounce flex-shrink-0">

            <ArrowDown className="w-4 h-4 text-luxury-gold" />

          </div>

          <span>SCROLL TO EXPLORE</span>

        </div>

        {/* CONSTRUCTION TIMELINE METER */}

        <div
          style={{
            opacity: meterOpacity,
            transition: 'opacity 0.3s ease'
          }}
          className="flex items-center gap-2 sm:gap-3 bg-primary-dark/85 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono text-gray-300 w-fit max-w-full"
        >

          <span className="text-luxury-gold font-bold flex-shrink-0">
            {buildPercent}%
          </span>

          <div className="w-16 min-[400px]:w-20 sm:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden flex-shrink-0">

            <div
              className="h-full bg-luxury-gold rounded-full transition-all duration-75"
              style={{
                width: `${buildPercent}%`
              }}
            />

          </div>

          <span className="hidden sm:inline text-gray-400 whitespace-nowrap">
            FRAME {currentFrame + 1}/{totalFrames}
          </span>

        </div>

      </div>

    </div>
  );
}
