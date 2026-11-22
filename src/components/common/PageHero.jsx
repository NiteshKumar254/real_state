import React from 'react';

/**
 * PageHero
 * Modern, Centered, Editorial Luxury Page Hero:
 * - Center-aligned eyebrow, heading, and subtitle
 * - Visible breadcrumb trails removed for clean, minimal architectural elegance
 * - Compact, balanced height (~300-360px on desktop) accounting for navbar clearance
 * - Crystal-clear, recognizable architectural background photography
 * - Subtle centered contrast protection without making the image dark or murky
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "/assets/images/hero/about-hero.jpg",
  // Accepted for backwards compatibility, not rendered visually per design requirement
  breadcrumbItems = []
}) {
  return (
    <div className="relative pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-34 lg:pb-16 bg-royal-deep overflow-hidden border-b border-white/10">
      {/* 1. ARCHITECTURAL BACKGROUND (Visible, sharp, recognizable) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center opacity-50 scale-100 transition-opacity duration-700"
        />

        {/* Centered subtle radial & directional gradients to ensure crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-deep/60 via-royal-deep/45 to-royal-deep/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-royal-deep/20 to-royal-deep/60 pointer-events-none" />
      </div>

      {/* 2. CENTERED EDITORIAL CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
        {eyebrow && (
          <span className="inline-block text-[11px] sm:text-xs font-semibold text-teal tracking-[0.22em] uppercase mb-2.5">
            {eyebrow}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.18] max-w-3xl mb-3.5 drop-shadow-sm">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-blue-100/90 font-light max-w-2xl leading-relaxed mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
