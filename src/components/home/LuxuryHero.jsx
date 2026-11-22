import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { FALLBACK_HERO_IMAGE } from '../../utils/imageHelpers';
import { FRAME_METADATA } from '../../data/constructionFrames';

/**
 * LuxuryHero
 * First section of the homepage showcasing the completed luxury property
 * - Full-screen (100svh) cinematic architectural photography
 * - Dark gradient overlay for text legibility
 * - Clear visual hierarchy and luxury real estate branding
 * - Normal, unblocked scrolling directly into the next section
 */
export default function LuxuryHero() {
  const finalImage = FRAME_METADATA.lastFrame || FALLBACK_HERO_IMAGE;

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-between overflow-hidden bg-primary-dark text-white">
      {/* Background completed luxury house image */}
      <div className="absolute inset-0 z-0">
        <img
          src={finalImage}
          alt="Completed luxury modern villa by Aurelia Estates"
          className="w-full h-full object-cover object-center filter brightness-[0.92]"
          loading="eager"
        />
        {/* Layered cinematic gradients for flawless text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/65 to-primary-dark/20 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-transparent to-primary-dark/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16 flex flex-col justify-between h-full">
        {/* Top spacing */}
        <div className="h-6" />

        {/* Main Hero Typography & CTAs (Left-aligned on desktop) */}
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-luxury-gold text-xs font-semibold tracking-widest uppercase mb-5">
            <Compass className="w-3.5 h-3.5 text-luxury-gold" />
            <span>EXCEPTIONAL LIVING SPACES</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-lg">
            Beyond Buildings. <br />
            <span className="italic font-normal text-luxury-gold">Beyond Expectations.</span>
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed mb-8 drop-shadow max-w-xl">
            Discover thoughtfully designed spaces where exceptional architecture meets modern living.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-luxury-gold text-primary-dark font-semibold text-sm hover:bg-luxury-goldLight transition-all duration-300 shadow-xl shadow-luxury-gold/25 hover:scale-105"
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300"
            >
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Trust badge & Scroll indicator */}
        <div className="flex items-end justify-between w-full pt-6 border-t border-white/15">
          {/* Scroll to explore prompt */}
          <a
            href="#from-land-to-landmark"
            className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-gray-300 hover:text-luxury-gold transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-luxury-gold transition-colors">
              <ArrowDown className="w-4 h-4 text-luxury-gold group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </a>

          {/* Subtle architectural assurance note */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-luxury-gold" />
            <span>Master Crafted Architectural Living</span>
          </div>
        </div>
      </div>
    </section>
  );
}
