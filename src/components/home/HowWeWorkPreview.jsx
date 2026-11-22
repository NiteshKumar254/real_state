import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import RevealOnScroll from '../common/RevealOnScroll';

const steps = [
  { num: "01", title: "Discover", desc: "Explore curated residences and establish your spatial, architectural, and financial criteria." },
  { num: "02", title: "Consultation", desc: "Private meeting with our senior partners to examine blueprints, specifications, and growth corridors." },
  { num: "03", title: "Property Selection", desc: "Shortlist prime residences with personalized comparative financial and legal dossiers." },
  { num: "04", title: "Site Visit", desc: "Private chauffeured walk-through of the property, structural quality, and surrounding neighborhood." },
  { num: "05", title: "Documentation", desc: "Seamless RERA-verified title clearance, bespoke customization approvals, and registration." },
  { num: "06", title: "Handover", desc: "Turnkey key presentation with comprehensive structural warranty and continuing concierge care." }
];

/**
 * HowWeWorkPreview
 * Section in Soft Blue (#DDEBF3)
 * - Step cards in Pure White (#FFFFFF)
 */
export default function HowWeWorkPreview() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-softblue/90 backdrop-blur-md relative z-10 text-darkheading border-t border-ice-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="THE STRUCTURED PROCESS"
          title="Your Journey to the Perfect Property."
          subtitle="A refined six-step pathway engineered for absolute discretion, legal transparency, and timely delivery."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {steps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 80}>
              <div className="relative p-8 rounded-3xl bg-white border border-ice-border hover:border-teal hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between text-darkheading shadow-sm">
                <div>
                  <span className="text-3xl font-serif font-bold text-royal block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-darkheading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-bodytext leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/how-we-work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-royal text-white font-semibold text-sm hover:bg-royal-hover transition-all duration-300 shadow-md group"
          >
            <span>Learn About Our Process</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
