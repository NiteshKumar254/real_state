import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, MessageSquare, Search, Eye, FileText, 
  Key, ShieldCheck, HeartHandshake, ArrowUpRight 
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import FAQAccordion from '../components/common/FAQAccordion';
import FinalEnquiryCTA from '../components/home/FinalEnquiryCTA';
import faqs from '../data/faqs';

const steps = [
  {
    num: "01",
    title: "Initial Enquiry",
    icon: MessageSquare,
    desc: "Reach out via our digital concierge, WhatsApp private desk, or visit our central Bengaluru office to outline your property ambitions."
  },
  {
    num: "02",
    title: "Understanding Requirements",
    icon: Compass,
    desc: "A thorough spatial, architectural, and financial consultation to pinpoint exact square footage, privacy requirements, and investment targets."
  },
  {
    num: "03",
    title: "Property Shortlisting",
    icon: Search,
    desc: "Our senior partners curate an exclusive dossier of matching on-market and off-market residences complete with CAD blueprints."
  },
  {
    num: "04",
    title: "Site Visit & Consultation",
    icon: Eye,
    desc: "Chauffeured, private on-site inspection of shortlisted properties with structural engineers available to answer technical inquiries."
  },
  {
    num: "05",
    title: "Property Selection & Customization",
    icon: FileText,
    desc: "Finalize your chosen residence and coordinate with our interior architects for custom marble, lighting, and layout customizations."
  },
  {
    num: "06",
    title: "Documentation & Title Clearance",
    icon: ShieldCheck,
    desc: "Our legal counsels oversee 100% transparent title verification, Khata clearance, RERA registration, and formal agreement execution."
  },
  {
    num: "07",
    title: "Final Handover & Key Ceremony",
    icon: Key,
    desc: "White-glove walkthrough and official physical brass key presentation along with complete warranty dossiers and appliance manuals."
  },
  {
    num: "08",
    title: "After-Sales Concierge Assistance",
    icon: HeartHandshake,
    desc: "Ongoing post-purchase maintenance, HVAC seasonal inspections, facility management onboarding, and lease advisory."
  }
];

export default function HowWeWork() {
  return (
    <div>
      <PageHero
        eyebrow="The Structured Process"
        title="From Your First Enquiry to Your Final Key."
        subtitle="A transparent, client-centered architectural and acquisition journey designed for peace of mind."
        breadcrumbItems={[{ label: "How We Work" }]}
        image="/assets/images/hero/house-after.jpg"
      />

      {/* Process Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Chronological Pathway"
            title="The 8 Stages of Acquisition."
            subtitle="How we guide each client with meticulous discipline from exploration to lifetime sanctuary care."
            centered={true}
          />

          <div className="relative border-l-2 border-teal/40 ml-4 md:ml-32 pl-6 md:pl-12 space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Node Circle */}
                  <div className="absolute -left-[35px] md:-left-[59px] top-1.5 w-10 h-10 rounded-full bg-royal text-white border-2 border-teal flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 group-hover:bg-teal group-hover:text-white transition-all">
                    {step.num}
                  </div>

                  {/* Content Box */}
                  <div className="p-8 rounded-3xl bg-ice border border-ice-border hover:border-teal/50 hover:bg-white hover:shadow-luxury transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-teal" />
                      <h3 className="text-2xl font-serif font-bold text-heading">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-body text-sm leading-relaxed max-w-3xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-md group"
            >
              <span>Schedule Your Step 01 Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-ice border-t border-ice-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Frequently Addressed"
            title="Questions About the Process."
            subtitle="Insights regarding documentation, site visits, and construction milestone tracking."
            centered={true}
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <FinalEnquiryCTA />
    </div>
  );
}
