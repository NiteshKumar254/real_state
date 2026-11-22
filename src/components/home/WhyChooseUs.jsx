import React from 'react';
import { ShieldCheck, MapPin, Eye, Building2, HeartHandshake, Headphones } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import RevealOnScroll from '../common/RevealOnScroll';

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted Expertise",
    desc: "Over a decade of landmark architectural development, guided by veteran industry principals and legal counsels."
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    desc: "Strategically secured parcels across high-growth corridors, airport expressways, and historic central boulevards."
  },
  {
    icon: Eye,
    title: "Transparent Process",
    desc: "100% clear titles, RERA registered compliance, and milestone-linked construction tracking with zero hidden charges."
  },
  {
    icon: Building2,
    title: "Quality Construction",
    desc: "Monolithic concrete casting, seismic Zone compliance, and European architectural fittings that endure generations."
  },
  {
    icon: HeartHandshake,
    title: "Customer-Centric Approach",
    desc: "Bespoke spatial customizations tailored around your personal daily rituals, aesthetics, and family aspirations."
  },
  {
    icon: Headphones,
    title: "End-to-End Assistance",
    desc: "From initial site viewing and documentation through bespoke interior onboarding and long-term aftercare."
  }
];

/**
 * WhyChooseUs
 * Section 10: Appears as the building in the background reaches near-completion
 * - Royal Blue translucent glass cards with Teal accents
 */
export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Right-aligned section header */}
        <div className="flex flex-col lg:items-end text-left lg:text-right mb-16">
          <SectionHeading
            eyebrow="02 / THE AURELIA STANDARD"
            title="More Than Properties. A Promise of Excellence."
            subtitle="Our core pillars define how we create enduring architectural landmarks and nurture lifelong client trust."
            light={true}
            className="mb-0 max-w-2xl"
          />
        </div>

        {/* Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <div className="group p-8 rounded-3xl bg-royal/75 backdrop-blur-md border border-white/20 hover:border-teal transition-all duration-300 h-full flex flex-col justify-between text-white shadow-xl">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-teal border border-white/15 flex items-center justify-center mb-6 shadow-sm group-hover:bg-teal group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-teal transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-blue-100/75 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
