import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

/**
 * HeroIntro
 * Foreground text and CTAs for the initial hero screen:
 * - 100% crystal-clear background: ZERO full-screen or section-level dark overlays or blurs.
 * - Razor-sharp typography with refined text drop-shadows for effortless readability over bright land/sky.
 * - Royal Blue + Teal luxury branding.
 */
export default function HeroIntro() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-12 text-white">
      {/* Top spacing */}
      <div className="h-4" />

      {/* Main Hero Headline & CTAs (Left-aligned, open layout with zero dark box/blur overlay) */}
      <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-deep/80 backdrop-blur-md border border-white/20 text-teal text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5 shadow-lg">
          <Compass className="w-3.5 h-3.5 text-teal" />
          <span>THE ART OF BUILDING</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-5 drop-shadow-[0_3px_12px_rgba(11,37,64,0.95)]">
          From Vision <br />
          <span className="italic font-normal text-teal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">to Reality.</span>
        </h1>

        <p className="text-base sm:text-lg text-white font-medium leading-relaxed mb-7 max-w-lg drop-shadow-[0_2px_8px_rgba(11,37,64,0.95)]">
          Transforming land into extraordinary living spaces.
        </p>

        <div className="flex flex-wrap items-center gap-3.5">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-teal text-white font-semibold text-xs sm:text-sm hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/35 hover:scale-105"
          >
            <span>Explore Properties</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            to="/enquire"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-royal-deep/85 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm hover:bg-royal transition-all duration-300 shadow-lg"
          >
            <span>Enquire Now</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="flex items-end justify-between w-full pt-6 border-t border-white/25">
        <a
          href="#about-preview-section"
          className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-white hover:text-teal transition-colors group drop-shadow-[0_2px_6px_rgba(11,37,64,0.9)]"
        >
          <div className="w-8 h-8 rounded-full bg-royal-deep/75 border border-white/35 flex items-center justify-center group-hover:border-teal transition-colors shadow-md">
            <ArrowDown className="w-4 h-4 text-teal group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </div>
          <span>SCROLL TO DISCOVER</span>
        </a>

        <div className="hidden sm:flex items-center gap-2 text-xs text-white font-medium drop-shadow-[0_2px_6px_rgba(11,37,64,0.9)]">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span>RERA Certified Luxury Architectural Living</span>
        </div>
      </div>
    </section>
  );
}
