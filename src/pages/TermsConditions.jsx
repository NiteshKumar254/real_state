import React from 'react';
import PageHero from '../components/common/PageHero';
import siteConfig from '../data/siteConfig';

export default function TermsConditions() {
  return (
    <div>
      <PageHero
        eyebrow="Terms of Engagement"
        title="Terms &amp; Conditions."
        subtitle="Standard terms governing property representations, bookings, and digital portal usage."
        breadcrumbItems={[{ label: "Terms & Conditions" }]}
        image="/assets/images/hero/about-hero.jpg"
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-sm text-gray-700 leading-relaxed space-y-8">
          
          <div className="p-4 rounded-xl bg-ice border border-teal/30 text-xs text-body">
            <strong>Demonstration Notice:</strong> The terms and property data displayed on this website represent a conceptual presentation. Official property acquisitions are governed strictly by physical RERA-compliant Sale &amp; Construction Agreements executed between parties.
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">1. Property Representations</h3>
            <p className="text-body">
              Renderings, photographs, walkthrough videos, and construction sequences displayed on this website are designed to communicate architectural concept and quality standards. Specific unit dimensions, specifications, and fixtures are governed strictly by the final registered Agreement for Sale.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">2. Pricing &amp; Availability</h3>
            <p className="text-body">
              Quoted prices, taxes, and availability are subject to revision based on construction milestones and market factors without prior notification. Formal pricing quotes remain valid only upon issuance of an official Expression of Interest (EOI) document.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">3. Intellectual Property</h3>
            <p className="text-body">
              All blueprints, architectural designs, logos, trademarks, and media assets displayed on this portal remain the exclusive intellectual property of {siteConfig.name}. Unauthorized duplication or commercial republishing is prohibited.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">4. Statutory Compliance (RERA)</h3>
            <p className="text-body">
              All active and upcoming projects conform to the Real Estate (Regulation and Development) Act standards. Respective RERA registration numbers and sanction clearances are available upon request from our private advisory desk.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
