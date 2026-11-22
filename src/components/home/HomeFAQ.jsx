import React from 'react';
import SectionHeading from '../common/SectionHeading';
import FAQAccordion from '../common/FAQAccordion';
import faqs from '../../data/faqs';

/**
 * HomeFAQ
 * Section in Pure White (#FFFFFF)
 */
export default function HomeFAQ() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white/90 backdrop-blur-md relative z-10 text-darkheading border-t border-ice-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="CLARIFICATIONS & INSIGHTS"
          title="Frequently Asked Questions."
          subtitle="Answers to common inquiries regarding property viewings, legal due diligence, and the acquisition process."
          centered={true}
        />

        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
