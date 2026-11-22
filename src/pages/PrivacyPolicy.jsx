import React from 'react';
import PageHero from '../components/common/PageHero';
import siteConfig from '../data/siteConfig';

export default function PrivacyPolicy() {
  return (
    <div>
      <PageHero
        eyebrow="Legal & Governance"
        title="Privacy Policy."
        subtitle="How Aurelia Estates safeguards and respects your personal client information."
        breadcrumbItems={[{ label: "Privacy Policy" }]}
        image="/assets/images/hero/about-hero.jpg"
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-sm text-gray-700 leading-relaxed space-y-8">
          
          <div className="p-4 rounded-xl bg-ice border border-teal/30 text-xs text-body">
            <strong>Demonstration Notice:</strong> This privacy policy is formulated for demonstration and development purposes for Aurelia Estates. Business stakeholders should review and calibrate with legal counsel prior to commercial deployment.
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">1. Information Collection</h3>
            <p>
              When you submit inquiries through our online portal, phone line, or WhatsApp concierge desk, we may collect your full name, telephone number, email address, preferred property locations, and investment budget ranges. This information is gathered solely to facilitate personalized property advisory and scheduling site visits.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">2. Use of Information</h3>
            <p>
              We utilize collected client information strictly to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Coordinate private site visits and architectural consultations.</li>
              <li>Deliver official property brochures, floorplans, and regulatory dossiers.</li>
              <li>Provide statutory documentation required under RERA and local municipality norms.</li>
              <li>Maintain ongoing warranty records and after-sales service coordination.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">3. Confidentiality &amp; Third Parties</h3>
            <p>
              Aurelia Estates never sells, leases, or trades client information to third-party telemarketers or advertisers. Client details are shared only with vetted legal counsels and bank escrow agents as required by the formal transaction process with explicit client consent.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">4. Security Standards</h3>
            <p>
              We enforce administrative and technical safeguards to protect confidential personal and financial dossiers against unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-heading mb-3">5. Contact Regarding Privacy</h3>
            <p>
              For any questions regarding your data or to request removal from our records, please contact our concierge at <a href={`mailto:${siteConfig.contact.email}`} className="text-teal font-medium underline">{siteConfig.contact.email}</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
