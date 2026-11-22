import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Award, Target, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import RevealOnScroll from '../components/common/RevealOnScroll';
import FinalEnquiryCTA from '../components/home/FinalEnquiryCTA';

const values = [
  {
    icon: Compass,
    title: "Architectural Integrity",
    desc: "Every design honors proportional purity, structural honesty, and functional grace without ostentatious shortcuts."
  },
  {
    icon: ShieldCheck,
    title: "Fiduciary Transparency",
    desc: "Uncompromising legal clarity, RERA compliance, and absolute transparency in pricing, schedules, and materials."
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    desc: "Partnering with world-renowned structural engineers and master stonemasons to erect heirloom-grade spaces."
  },
  {
    icon: Target,
    title: "Client-Centric Discretion",
    desc: "Providing discreet, personalized stewardship tailored to the private lifestyle requirements of high-net-worth families."
  }
];

const milestones = [
  { year: "2014", title: "Inception in Bengaluru", desc: "Founded with a singular vision: bringing timeless European architectural discipline to South India's booming silicon corridor." },
  { year: "2018", title: "First Landmark Handover", desc: "Delivered Aurelia Botanica ahead of schedule, winning the South Asian Luxury Architecture Citation." },
  { year: "2021", title: "Commercial Portfolio Expansion", desc: "Launched Aurelia Apex, setting a new benchmark for LEED Platinum sustainable corporate workspaces." },
  { year: "2024", title: "The 10-Year Milestone", desc: "Crossed 1,200 happy homeowners and over 25 completed and active landmark developments." }
];

const team = [
  { name: "Devraj Singhania", role: "Managing Principal & Architect", bio: "20+ years steering international masterplans from Milan to Bengaluru." },
  { name: "Suhani Mehta", role: "Director of Private Client Advisory", bio: "Specialist in bespoke luxury property curation and HNW wealth preservation." },
  { name: "Kunal Deshmukh", role: "Chief of Structural Engineering", bio: "Pioneering monolithic post-tensioned casting and earthquake-resilient structures." }
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="The Story of Aurelia"
        title="Building Spaces. Creating Futures."
        subtitle="For over a decade, we have sculpted land into iconic residences where generations flourish in uncompromised luxury."
        breadcrumbItems={[{ label: "About Us" }]}
        image="/assets/images/hero/about-hero.jpg"
      />

      {/* Story Narrative */}
      <section className="py-14 sm:py-18 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/images/properties/villa-serenity-1.jpg"
                    alt="Aurelia Craft"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-teal font-semibold block mb-1">
                      Our Philosophy
                    </span>
                    <h3 className="text-xl font-serif font-bold">
                      Crafting Living Sculptures
                    </h3>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-6">
              <RevealOnScroll delay={150}>
                <span className="text-xs font-semibold text-teal uppercase tracking-[0.2em] block mb-3">
                  Our Origins
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heading tracking-tight mb-6">
                  Where Passion for Pure Architecture Meets Fiduciary Responsibility.
                </h2>
                <p className="text-body text-base leading-relaxed mb-6">
                  Founded with the conviction that luxury is not merely superficial ornamentation, Aurelia Estates began as a boutique architectural collective. We observed that modern real estate often sacrificed structural endurance for rapid speculation.
                </p>
                <p className="text-body text-base leading-relaxed mb-8">
                  We reversed that paradigm. Every Aurelia residence begins with the deep geological integrity of the soil, moving methodically through seismic steel cages, post-tensioned slabs, and finally into the light-filled volumes of modern architecture.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-ice-border">
                  <div>
                    <span className="text-3xl font-serif font-bold text-teal block mb-1">100%</span>
                    <span className="text-xs text-muted font-medium uppercase tracking-wider">RERA Verified Titles</span>
                  </div>
                  <div>
                    <span className="text-3xl font-serif font-bold text-teal block mb-1">Zero</span>
                    <span className="text-xs text-muted font-medium uppercase tracking-wider">Delivery Compromises</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-16 md:py-18 bg-ice border-y border-ice-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealOnScroll>
              <div className="p-10 rounded-3xl bg-white border border-ice-border shadow-sm h-full">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
                  Our Mission
                </span>
                <h3 className="text-2xl font-serif font-bold text-heading mb-4">
                  Enduring Architecture Built for Well-Being
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  To conceive, engineer, and deliver residences that stand as generational heirlooms—integrating sustainable natural airflow, monolithic engineering, and refined materials that celebrate human living.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div className="p-10 rounded-3xl bg-white border border-ice-border shadow-sm h-full">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
                  Our Vision
                </span>
                <h3 className="text-2xl font-serif font-bold text-heading mb-4">
                  The Benchmark of South Asian Luxury
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  To be acknowledged across India as the most revered boutique developer, synonymous with uncompromising quality, customer transparency, and visionary design.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Our Guiding Principles"
            title="Core Values That Guide Every Build."
            subtitle="Principles that dictate our work from site excavation to the final key presentation."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <RevealOnScroll key={idx} delay={idx * 80}>
                  <div className="p-8 rounded-3xl bg-ice border border-ice-border hover:border-teal/50 hover:bg-white hover:shadow-luxury transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white text-teal border border-ice-border flex items-center justify-center mb-6 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-serif font-bold text-heading mb-2">
                        {val.title}
                      </h4>
                      <p className="text-xs text-body leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-14 sm:py-16 md:py-20 bg-royal text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="The Journey"
            title="A Decade of Milestones."
            subtitle="Key chapters in our evolution as South India's premier boutique luxury developer."
            light={true}
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100}>
                <div className="p-8 rounded-3xl bg-white/10 border border-white/15 hover:border-teal transition-all h-full">
                  <span className="text-4xl font-serif font-bold text-teal block mb-3">
                    {m.year}
                  </span>
                  <h4 className="text-lg font-serif font-semibold text-white mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Bespoke Leadership"
            title="The Custodians of Your Vision."
            subtitle="Meet the seasoned principals directing architecture, engineering, and client concierge."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100}>
                <div className="p-8 rounded-3xl bg-ice border border-ice-border text-center hover:shadow-luxury transition-all">
                  <div className="w-20 h-20 rounded-full bg-royal text-teal font-serif text-2xl font-bold flex items-center justify-center mx-auto mb-6 border-2 border-teal/40">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-heading mb-1">
                    {member.name}
                  </h4>
                  <span className="text-xs text-teal font-semibold uppercase tracking-wider block mb-3">
                    {member.role}
                  </span>
                  <p className="text-xs text-body leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalEnquiryCTA />
    </div>
  );
}
