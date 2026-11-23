// import React from 'react';
// import { ArrowDown, Compass, Sparkles } from 'lucide-react';

// /**
//  * HeroOverlay
//  * Minimal, elegant typography overlays that coordinate with the new scroll timeline:
//  * - Stage 1 (0.00 - 0.10): Initial headline & "SCROLL TO EXPLORE" indicator
//  * - Stage 2 (0.10 - 0.55): Smooth fadeout of initial text; building evolves rapidly unobstructed
//  * - Stage 3 (0.55 - 0.65): Subtle final headline ("Where Extraordinary Living Begins.") appears briefly
//  * - Stage 4 (0.65 - 1.00): Content panel rises from bottom; hero overlays fade smoothly
//  */
// export default function HeroOverlay({ scrollProgress, constructionProgress, currentFrame, totalFrames }) {
//   // Initial headline: 1 at 0 -> 0 at 0.18
//   const initialOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 5.5));

//   // Subtle final headline: appears at ~0.50, peaks at ~0.58-0.65, fades before overlay at 0.72
//   let finalHeadlineOpacity = 0;
//   if (scrollProgress >= 0.48 && scrollProgress <= 0.74) {
//     if (scrollProgress < 0.58) {
//       finalHeadlineOpacity = (scrollProgress - 0.48) / 0.10;
//     } else {
//       finalHeadlineOpacity = Math.max(0, 1 - (scrollProgress - 0.64) / 0.10);
//     }
//   }

//   // Scroll prompt indicator: fades out as soon as user scrolls
//   const scrollIndicatorOpacity = Math.max(0, 1 - scrollProgress * 4.5);

//   // Construction percentage meter (0% to 100% of the build)
//   const buildPercent = Math.round(constructionProgress * 100);
//   const meterOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.58) * 6));

//   return (
//     <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16 z-[2] text-white">
//       {/* Top spacing placeholder below fixed navbar */}
//       <div className="h-20" />

//       {/* STAGE 1 & 2: INITIAL HERO HEADLINE (Fades smoothly on scroll) */}
//       <div
//         style={{
//           opacity: initialOpacity,
//           transform: `translateY(${scrollProgress * -35}px)`,
//           transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
//           pointerEvents: initialOpacity > 0.3 ? 'auto' : 'none'
//         }}
//         className="max-w-3xl"
//       >
//         <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-luxury-gold text-xs font-semibold tracking-widest uppercase mb-4">
//           <Compass className="w-3.5 h-3.5 text-luxury-gold animate-spin" style={{ animationDuration: '10s' }} />
//           <span>THE ART OF BUILDING</span>
//         </div>

//         <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md">
//           From Vision <br />
//           <span className="italic font-normal text-luxury-gold">to Reality.</span>
//         </h1>

//         <p className="text-base sm:text-xl text-gray-200 font-light max-w-xl leading-relaxed drop-shadow">
//           Transforming land into extraordinary living spaces.
//         </p>
//       </div>

//       {/* STAGE 3: SUBTLE COMPLETED BUILDING HEADLINE (0.55 - 0.65) */}
//       <div
//         style={{
//           opacity: finalHeadlineOpacity,
//           transform: `translateY(${(1 - finalHeadlineOpacity) * 20}px)`,
//           transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
//           pointerEvents: finalHeadlineOpacity > 0.4 ? 'auto' : 'none'
//         }}
//         className="max-w-xl self-start mb-12 sm:mb-16"
//       >
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/40 text-luxury-gold text-[11px] font-semibold tracking-widest uppercase mb-2">
//           <Sparkles className="w-3 h-3 text-luxury-gold" />
//           <span>VISION REALIZED</span>
//         </div>

//         <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.12] drop-shadow-lg">
//           Where Extraordinary <br />
//           <span className="italic font-normal text-luxury-gold">Living Begins.</span>
//         </h2>
//       </div>

//       {/* BOTTOM STATUS & SCROLL PROMPT */}
//       <div className="flex items-end justify-between w-full pt-4 border-t border-white/15">
//         {/* Scroll indicator prompt */}
//         <div
//           style={{
//             opacity: scrollIndicatorOpacity,
//             transition: 'opacity 0.3s ease'
//           }}
//           className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-gray-300"
//         >
//           <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center animate-bounce">
//             <ArrowDown className="w-4 h-4 text-luxury-gold" />
//           </div>
//           <span>SCROLL TO EXPLORE</span>
//         </div>

//         {/* Live construction timeline meter */}
//         <div
//           style={{
//             opacity: meterOpacity,
//             transition: 'opacity 0.3s ease'
//           }}
//           className="flex items-center gap-3 bg-primary-dark/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-gray-300"
//         >
//           <span className="text-luxury-gold font-bold">{buildPercent}%</span>
//           <div className="w-20 sm:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-luxury-gold transition-all duration-75 rounded-full"
//               style={{ width: `${buildPercent}%` }}
//             />
//           </div>
//           <span className="hidden sm:inline text-gray-400">
//             FRAME {currentFrame + 1}/{totalFrames}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


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
