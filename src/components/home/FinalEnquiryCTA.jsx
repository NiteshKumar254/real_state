import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

/**
 * FinalEnquiryCTA
 * Section in Royal Blue (#123B68)
 */
export default function FinalEnquiryCTA() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Aurelia Estates Concierge, I would like to enquire about your luxury properties and developments.')}`;
  const telUrl = `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-royal-dark/95 backdrop-blur-md text-white border-t border-white/10 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal block mb-3">
          DIRECT CONCIERGE SERVICE
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
          Let's Find Your Perfect Space.
        </h2>

        <p className="text-blue-100/80 text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Connect directly with an Aurelia senior partner via your preferred channel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/enquire"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/20 hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Enquire Now</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BA5C] transition-all duration-300 shadow-md hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={telUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-teal" />
            <span>Call {siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
