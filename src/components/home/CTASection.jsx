import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

/**
 * CTASection
 * Section in Royal Blue (#123B68)
 * - Teal primary CTA and White outline CTA
 */
export default function CTASection() {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-royal/90 backdrop-blur-md text-white overflow-hidden z-10 border-t border-white/15">
      {/* Background with cinematic architecture image and royal gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero/house-after.jpg"
          alt="Aurelia Estates Architecture"
          className="w-full h-full object-cover opacity-20 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-dark/95 via-royal/90 to-royal/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-teal mb-4">
              BEGIN YOUR SANCTUARY
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-6">
              Your Next Chapter <br />
              <span className="italic font-normal text-teal">Starts Here.</span>
            </h2>
            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed mb-10 font-light">
              Explore meticulously engineered spaces designed for the life you deserve. Arrange a confidential consultation with our private client directors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/20 hover:scale-105"
              >
                <span>Explore Properties</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/enquire"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300"
              >
                <CalendarCheck className="w-4 h-4 text-teal" />
                <span>Schedule a Consultation</span>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
