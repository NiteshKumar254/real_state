import React from 'react';

/**
 * PageHero
 * Modern, Centered, Editorial Luxury Page Hero:
 * - Center-aligned eyebrow, heading, and subtitle (horizontal & vertical flex centering)
 * - Desktop: 1.3x scaled height: ~440px tablet, ~500px desktop
 * - Mobile: Content-driven height (min-h-[240px]) with 48px vertical padding, H1 30px, subtitle 15px, eyebrow 12px, px 20px
 * - Crystal-clear architectural background image with natural colors and details
 * - Proportional ~35-45% Royal Blue overlay protecting crisp contrast without darkening the image
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
    <div className="relative flex flex-col justify-center items-center min-h-[390px] sm:min-h-[440px] lg:min-h-[500px] max-md:min-h-[240px] pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 max-md:pt-20 max-md:pb-12 bg-royal-deep overflow-hidden border-b border-white/10">
      {/* 1. ARCHITECTURAL BACKGROUND (Visible, sharp, natural) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center opacity-90 scale-100 transition-opacity duration-700"
        />

        {/* Centered subtle directional & radial gradients with reduced 35-45% alpha for bright image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-deep/45 via-royal-deep/35 to-royal-deep/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-royal-deep/10 to-royal-deep/25 pointer-events-none" />
      </div>

      {/* 2. CENTERED EDITORIAL CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 max-md:px-5 text-center flex flex-col items-center justify-center">
        {eyebrow && (
          <span className="inline-block text-[11px] sm:text-xs max-md:text-[12px] max-md:tracking-[0.16em] font-semibold text-teal tracking-[0.22em] uppercase mb-2.5 max-md:mb-2">
            {eyebrow}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-5xl max-md:text-[30px] max-md:leading-[1.18] font-serif font-bold text-white tracking-tight leading-[1.18] max-w-3xl mb-3.5 max-md:mb-2.5 drop-shadow-sm">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg max-md:text-[15px] max-md:leading-relaxed text-blue-100/90 font-light max-w-2xl leading-relaxed mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
