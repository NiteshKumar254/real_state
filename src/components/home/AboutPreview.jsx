import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

/**
 * AboutPreview
 * First overlay content card over the construction animation:
 * - Royal Blue translucent glass panel (bg-[#123B68]/78)
 * - Teal highlights and icons
 * - Background construction visible on the right
 */
export default function AboutPreview() {
  const highlights = [
    { title: "RERA Certified Assurance", desc: "Rigorous legal validation and clear title due diligence on every square foot" },
    { title: "Master Artisan Detailing", desc: "Imported Italian stone, European timber, and seismic-engineered RCC frames" },
    { title: "Bespoke Spatial Architecture", desc: "Biophilic ventilation, double-height voids, and private landscaped courtyards" }
  ];

  return (
    <section id="about-preview-section" className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Royal Blue Glass Card (7 cols) */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <div className="p-8 sm:p-12 rounded-3xl bg-royal/80 backdrop-blur-md border border-white/20 shadow-2xl text-white">
                <span className="inline-block text-xs font-semibold text-teal uppercase tracking-[0.25em] mb-4">
                  01 / INTRODUCTION — DISCOVER AURELIA ESTATES
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6">
                  Redefining the Way You Live.
                </h2>

                <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed mb-8 font-light">
                  Thoughtfully designed spaces, exceptional architecture, and modern living experiences crafted around your aspirations. From the foundational steel reinforcement visible in our construction journey to the final polished marble threshold, we build with unyielding integrity.
                </p>

                <div className="space-y-4 mb-10">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-teal/20 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs text-blue-100/70 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-md group"
                >
                  <span>Discover Our Story</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Architectural Craft Badge (5 cols) */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <RevealOnScroll delay={150}>
              <div className="p-6 rounded-2xl bg-royal/65 backdrop-blur-md border border-white/15 shadow-xl max-w-xs text-white">
                <div className="flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-teal" />
                  <span>Aurelia Craft</span>
                </div>
                <p className="text-xs text-blue-100/80 font-light leading-relaxed">
                  Monolithic structural engineering harmonizing with timeless aesthetic grace. Watch the transformation unfold as you explore.
                </p>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
