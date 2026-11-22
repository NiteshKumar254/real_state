import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Shield, Building, Home, Coins, HardHat } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import RevealOnScroll from '../common/RevealOnScroll';
import services from '../../data/services';

const icons = [Home, Building, HardHat, Coins, Compass, Shield];

/**
 * ServicesPreview
 * Section in Pure White (#FFFFFF)
 * - Cards in Ice White (#F3F8FC) with Teal icon accents and Royal Blue headings
 */
export default function ServicesPreview() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white/90 backdrop-blur-md relative z-10 text-darkheading border-t border-ice-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="COMPREHENSIVE CAPABILITIES"
            title="Solutions for Every Real Estate Ambition."
            subtitle="Whether securing a private sky penthouse, building a customized villa, or structuring an institutional asset."
            className="mb-0"
          />

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-teal transition-colors group flex-shrink-0"
          >
            <span>Explore All Services</span>
            <ArrowUpRight className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <RevealOnScroll key={service.id} delay={index * 80}>
                <div className="group p-8 rounded-3xl bg-ice border border-ice-border hover:border-teal hover:bg-softblue/30 transition-all duration-300 h-full flex flex-col justify-between shadow-sm hover:shadow-md">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-teal border border-ice-border flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal block mb-2">
                      {service.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-darkheading group-hover:text-royal transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-bodytext leading-relaxed mb-6 font-light">
                      {service.shortDesc}
                    </p>
                  </div>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal hover:text-teal transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal" />
                  </Link>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}
