import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Layers, HardHat } from 'lucide-react';
import ConstructionTimelapse from './ConstructionTimelapse';
import RevealOnScroll from '../common/RevealOnScroll';

/**
 * FromLandToLandmark
 * Dedicated construction transformation storytelling section immediately following the luxury hero
 * - Left column: Narrative, milestones (Vision, Foundation, Transformation), and CTA
 * - Right column: Large auto-playing cinematic Canvas timelapse (235 frames, ~7.5s, time-based)
 * - Normal, unblocked natural page scrolling
 */
export default function FromLandToLandmark() {
  const milestones = [
    {
      num: "01",
      title: "The Vision",
      icon: Compass,
      desc: "Topographical soil mapping, orientation studies, and architectural blueprints designed for light and air."
    },
    {
      num: "02",
      title: "The Foundation",
      icon: Layers,
      desc: "Deep excavation, seismic-engineered steel reinforcement cages, and monolithic post-tensioned concrete slabs."
    },
    {
      num: "03",
      title: "The Transformation",
      icon: HardHat,
      desc: "Precision brickwork, triple-glazed European acoustic windows, and lush biophilic landscaping."
    }
  ];

  return (
    <section
      id="from-land-to-landmark"
      className="py-24 md:py-32 bg-warm-offwhite relative overflow-hidden border-b border-gray-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Milestones (5 cols) */}
          <div className="lg:col-span-5">
            <RevealOnScroll>
              <span className="inline-block text-xs font-semibold text-luxury-gold uppercase tracking-[0.25em] mb-4">
                FROM LAND TO LANDMARK
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-dark tracking-tight leading-[1.14] mb-6">
                Every Great Space Begins with a Vision.
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Experience the journey from an empty plot to a beautifully crafted living space — where thoughtful planning, engineering, and architecture come together.
              </p>

              {/* Three Story Milestones */}
              <div className="space-y-5 mb-10">
                {milestones.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-luxury-gold/40 hover:shadow-md transition-all flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-xl bg-luxury-gold/15 text-luxury-gold font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {m.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary-dark mb-1">
                          {m.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Section CTA */}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-dark text-white font-semibold text-xs tracking-wider uppercase hover:bg-luxury-gold hover:text-primary-dark transition-all duration-300 shadow-md group"
              >
                <span>Explore Our Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>

          {/* Right Column: Large Cinematic Timelapse Animation Display (7 cols) */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={150}>
              <ConstructionTimelapse />
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
