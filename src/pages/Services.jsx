import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import RevealOnScroll from '../components/common/RevealOnScroll';
import FinalEnquiryCTA from '../components/home/FinalEnquiryCTA';
import services from '../data/services';

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Comprehensive Real Estate Solutions"
        title="Architectural &amp; Real Estate Services."
        subtitle="Guiding clients through bespoke property acquisition, structural construction, and wealth-building real estate portfolios."
        breadcrumbItems={[{ label: "Services" }]}
        image="/assets/images/hero/services-hero.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Our Capabilities"
            title="End-to-End Excellence Across the Property Lifecycle."
            subtitle="From identifying off-market parcels to delivering turnkey, custom-constructed residences."
            centered={true}
          />

          <div className="space-y-16 sm:space-y-20 mt-12 sm:mt-14">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <RevealOnScroll>
                      <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-royal-deep/80 text-teal text-xs font-semibold backdrop-blur-md">
                            {service.category}
                          </span>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <RevealOnScroll delay={150}>
                      <span className="text-xs font-semibold text-teal uppercase tracking-[0.2em] block mb-2">
                        Service 0{index + 1}
                      </span>
                      <h3 className="text-3xl font-serif font-bold text-heading mb-4">
                        {service.title}
                      </h3>
                      <p className="text-body text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {service.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                            <span className="text-sm text-heading font-medium">{b}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={`/enquire?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-teal text-white font-semibold text-xs tracking-wider uppercase hover:bg-teal-hover transition-all duration-300 shadow-md group"
                      >
                        <span>Enquire for {service.title}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </RevealOnScroll>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <FinalEnquiryCTA />
    </div>
  );
}
