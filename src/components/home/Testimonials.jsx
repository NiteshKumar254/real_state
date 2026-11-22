import React from 'react';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import RevealOnScroll from '../common/RevealOnScroll';
import testimonials from '../../data/testimonials';

/**
 * Testimonials
 * Section in Soft Blue (#DDEBF3)
 * - Testimonial cards in Pure White (#FFFFFF) with Teal stars
 */
export default function Testimonials() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-softblue/90 backdrop-blur-md relative z-10 text-darkheading border-t border-ice-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="CLIENT ACCOLADES"
          title="Stories of Trust. Homes of Happiness."
          subtitle="Reflections from our esteemed homeowners, investors, and business leaders."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <RevealOnScroll key={t.id} delay={index * 80}>
              <div className="p-8 rounded-3xl bg-white border border-ice-border hover:border-teal transition-all duration-300 flex flex-col justify-between h-full text-darkheading shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center gap-1 text-teal mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-teal" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-teal/30 mb-3" />

                  <p className="text-sm text-bodytext italic leading-relaxed mb-6 font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-ice-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-royal text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-darkheading">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-mutedtext">
                      {t.role}
                    </p>
                    <p className="text-[10px] text-teal font-medium mt-0.5">
                      {t.property}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
