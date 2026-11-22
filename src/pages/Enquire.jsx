import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, Clock, Award, Phone } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import EnquiryForm from '../components/common/EnquiryForm';
import siteConfig from '../data/siteConfig';

export default function Enquire() {
  const [searchParams] = useSearchParams();
  const prefilledProperty = searchParams.get('property') || searchParams.get('project') || searchParams.get('service') || '';

  return (
    <div>
      <PageHero
        eyebrow="Private Client Portal"
        title="Dedicated Property Consultation."
        subtitle="Submit your requirements to receive comprehensive CAD floorplans, taxation schedules, and a private tour coordinate."
        breadcrumbItems={[{ label: "Enquire Now" }]}
        image="/assets/images/hero/contact-hero.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 bg-ice">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative & Trust Metrics (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold text-teal uppercase tracking-[0.2em] block mb-2">
                  Confidential &amp; Bespoke
                </span>
                <h2 className="text-3xl font-serif font-bold text-heading mb-4">
                  Your Sanctuary Journey Starts with a Conversation.
                </h2>
                <p className="text-body text-sm leading-relaxed">
                  Our private client advisory desk works with high-net-worth individuals, NRIs, and institutional investors to curate architectural properties that match exacting lifestyle and financial aspirations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-ice-border shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-soft-blue text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading">100% Legal Scrutiny</h4>
                    <p className="text-xs text-muted">Clear titles vetted by senior high court legal counsels.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-ice-border shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-soft-blue text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading">2-Hour Rapid Response</h4>
                    <p className="text-xs text-muted">A dedicated partner connects directly via WhatsApp or telephone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-ice-border shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-soft-blue text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading">Tailored Dossier</h4>
                    <p className="text-xs text-muted">Receive high-res blueprints, elevation 3Ds, and financial models.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-royal text-white border border-white/10">
                <h4 className="text-sm font-semibold text-teal uppercase tracking-wider mb-2">
                  Prefer Direct Phone Contact?
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed mb-4">
                  Call our senior concierge desk directly during business hours.
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm font-serif font-bold text-white hover:text-teal transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right: Comprehensive Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm prefilledProperty={prefilledProperty} />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
