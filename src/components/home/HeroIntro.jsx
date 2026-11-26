import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import HeroEnquiryForm from './HeroEnquiryForm';

/**
 * HeroIntro
 * Foreground content for the initial hero screen:
 * - Left: Headline, description, and CTAs (100% preserved character-for-character)
 * - Right: Floating Glassmorphic Lead Generation Form (HeroEnquiryForm)
 * - Bottom Bar: Scroll Indicator ("SCROLL TO DISCOVER") and RERA Certification badge
 * - Mobile: Content-driven height (no forced 100vh), 20px gutters, clamped H1, 48px CTAs
 */
export default function HeroIntro() {
  return (
    <section className="relative w-full min-h-[100svh] max-md:min-h-0 max-md:h-auto flex flex-col justify-between pt-24 sm:pt-28 max-md:pt-24 pb-8 sm:pb-12 max-md:pb-8 px-6 sm:px-8 lg:px-12 xl:px-16 max-md:px-5 text-white">
      {/* Top spacing - hidden on mobile to eliminate artificial gaps */}
      <div className="h-2 sm:h-4 max-md:hidden" />

      {/* Main Content Area: Left Headline/CTAs + Right Floating Enquiry Form */}
      <div className="w-full my-auto max-md:my-0 flex flex-col lg:flex-row items-center max-md:items-start justify-between gap-10 lg:gap-16 max-md:gap-8 py-4 max-md:py-2">
        {/* Left Hero Content (Preserved exactly as requested) */}
        <div className="max-w-2xl w-full animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-deep/80 backdrop-blur-md border border-white/20 text-teal text-[11px] sm:text-xs max-md:text-[12px] max-md:tracking-[0.16em] font-semibold tracking-widest uppercase mb-4 sm:mb-5 max-md:mb-3.5 shadow-lg">
            <Compass className="w-3.5 h-3.5 text-teal" />
            <span>THE ART OF BUILDING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-5 max-md:mb-3.5 max-md:text-[clamp(2rem,8.6vw,2.375rem)] max-md:leading-[1.12] drop-shadow-[0_3px_12px_rgba(11,37,64,0.95)]">
            From Vision <br />
            <span className="italic font-normal text-teal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">to Reality.</span>
          </h1>

          <p className="text-base sm:text-lg text-white font-medium leading-relaxed mb-7 max-md:mb-6 max-md:text-[16px] max-md:leading-[1.55] max-w-lg drop-shadow-[0_2px_8px_rgba(11,37,64,0.95)]">
            Transforming land into extraordinary living spaces.
          </p>

          <div className="flex flex-wrap max-md:flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-md:gap-3 w-full">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 max-md:h-12 max-md:min-h-[48px] max-md:w-full rounded-full bg-teal text-white font-semibold text-xs sm:text-sm max-md:text-[15px] hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/35 hover:scale-105"
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/enquire"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 max-md:h-12 max-md:min-h-[48px] max-md:w-full rounded-full bg-royal-deep/85 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm max-md:text-[15px] hover:bg-royal transition-all duration-300 shadow-lg"
            >
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>

        {/* Right Floating Enquiry Form */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 max-md:w-full max-md:mt-2">
          <HeroEnquiryForm />
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="flex max-md:flex-col max-md:items-center max-md:gap-3 sm:flex-row items-end justify-between w-full pt-6 max-md:pt-5 max-md:pb-2 border-t border-white/25">
        <a
          href="#about-preview-section"
          className="flex items-center gap-3 text-xs max-md:text-[13px] tracking-widest uppercase font-semibold text-white hover:text-teal transition-colors group drop-shadow-[0_2px_6px_rgba(11,37,64,0.9)]"
        >
          <div className="w-8 h-8 rounded-full bg-royal-deep/75 border border-white/35 flex items-center justify-center group-hover:border-teal transition-colors shadow-md">
            <ArrowDown className="w-4 h-4 text-teal group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </div>
          <span>SCROLL TO DISCOVER</span>
        </a>

        <div className="hidden sm:flex max-md:flex items-center gap-2 text-xs max-md:text-[12.5px] text-white font-medium drop-shadow-[0_2px_6px_rgba(11,37,64,0.9)]">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span>RERA Certified Luxury Architectural Living</span>
        </div>
      </div>
    </section>
  );
}
