import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Phone, Mail, MapPin, Clock, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

/**
 * Footer
 * Compact, Professional Luxury Real Estate Footer:
 * - 4-column balanced corporate structure on desktop
 * - 2-column on mobile >= 360px, 1-column below 360px
 * - Reduced vertical height and tight, intentional padding
 * - Royal Blue Deep surface with Teal accents
 * - Clean bottom legal bar with safe-area spacing
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2540] text-white border-t border-white/10 pt-10 pb-7 sm:pt-12 sm:pb-8 max-md:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 max-md:px-4">
        <div className="grid grid-cols-1 max-[359px]:grid-cols-1 max-md:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-white/10">
          
          {/* Column 1: Brand & Tagline */}
          <div className="max-md:col-span-2 max-[359px]:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-teal/20 border border-teal flex items-center justify-center text-teal group-hover:scale-105 transition-all">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl max-md:text-lg font-serif font-bold text-white tracking-wider uppercase">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-blue-100/70 text-xs max-md:text-sm leading-relaxed mb-4 font-light max-w-xs">
              {siteConfig.tagline} {siteConfig.description}
            </p>

            {/* Social Icons (min 44px touch targets on mobile) */}
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
                { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
                { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 max-md:w-11 max-md:h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-blue-100/80 hover:text-teal hover:border-teal transition-all"
                    aria-label={s.label}
                  >
                    <Icon className="w-3.5 h-3.5 max-md:w-4 max-md:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[11px] max-md:text-xs font-bold uppercase tracking-[0.18em] text-[#00A6A0] mb-3.5">
              Explore
            </h4>
            <ul className="space-y-2 max-md:space-y-1 text-xs max-md:text-sm text-blue-100/75">
              <li>
                <Link to="/" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">About Us</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Properties Portfolio</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Landmark Developments</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Architectural Services</Link>
              </li>
              <li>
                <Link to="/how-we-work" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Acquisition Process</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">Contact Advisory</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Properties & Categories */}
          <div>
            <h4 className="text-[11px] max-md:text-xs font-bold uppercase tracking-[0.18em] text-[#00A6A0] mb-3.5">
              Portfolio
            </h4>
            <ul className="space-y-2 max-md:space-y-1 text-xs max-md:text-sm text-blue-100/75">
              <li>
                <Link to="/properties?type=Penthouse" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Premium+Villa" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  Signature Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Luxury+Apartment" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  Garden Residences
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Commercial+Space" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  Corporate Suites
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Residential+Plot" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  Plotted Sanctuaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Concierge */}
          <div className="max-md:col-span-2 max-[359px]:col-span-1">
            <h4 className="text-[11px] max-md:text-xs font-bold uppercase tracking-[0.18em] text-[#00A6A0] mb-3.5">
              Private Concierge
            </h4>
            <ul className="space-y-2.5 max-md:space-y-2 text-xs max-md:text-sm text-blue-100/75">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed break-words">{siteConfig.contact.address.display}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors break-words max-md:min-h-[44px] max-md:flex max-md:items-center">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Compact Legal Bottom Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] max-md:text-xs text-blue-100/60 text-center sm:text-left">
          <p>
            &copy; {currentYear} {siteConfig.name}. All Rights Reserved. RERA Compliant Architecture.
          </p>
          <div className="flex items-center space-x-5">
            <Link to="/privacy-policy" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/terms-and-conditions" className="hover:text-teal transition-colors max-md:min-h-[44px] max-md:flex max-md:items-center">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
