import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, CalendarCheck, X } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

/**
 * FloatingEnquiry
 * Refined, Compact Floating Control:
 * - Sleek pill shape with small footprint
 * - Preserves instant WhatsApp, phone call, and consultation triggers
 * - Non-intrusive positioning (bottom-5 right-5, with mobile 16px + safe-area insets)
 * - Auto-hides on mobile when a form input is focused
 * - Clear contrast and smooth animations
 */
export default function FloatingEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target?.tagName)) {
        setIsInputFocused(true);
      }
    };
    const handleFocusOut = (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target?.tagName)) {
        setIsInputFocused(false);
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Aurelia Estates Concierge, I would like to enquire about your luxury properties and developments.')}`;

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 max-md:bottom-[calc(16px+env(safe-area-inset-bottom,0px))] max-md:right-4 z-40 flex flex-col items-end transition-opacity duration-200 ${
        isInputFocused ? 'max-md:hidden' : ''
      }`}
    >
      {/* Submenu popover */}
      {isOpen && (
        <div className="mb-2.5 flex flex-col gap-2 items-end animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Call action */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2 px-3.5 py-2 max-md:min-h-[44px] rounded-full bg-white text-royal font-medium text-xs max-md:text-sm shadow-md hover:bg-[#F3F8FC] border border-[#D6E3EC] transition-all hover:scale-105"
            aria-label="Call Aurelia Concierge"
          >
            <span>Call Concierge</span>
            <div className="w-6 h-6 rounded-full bg-[#123B68] text-white flex items-center justify-center">
              <Phone className="w-3 h-3" />
            </div>
          </a>

          {/* WhatsApp action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 max-md:min-h-[44px] rounded-full bg-white text-[#142D46] font-medium text-xs max-md:text-sm shadow-md hover:bg-[#F3F8FC] border border-[#D6E3EC] transition-all hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <span>WhatsApp Private Desk</span>
            <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle className="w-3 h-3" />
            </div>
          </a>

          {/* Enquire Form link */}
          <Link
            to="/enquire"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3.5 py-2 max-md:min-h-[44px] rounded-full bg-[#00A6A0] text-white font-semibold text-xs max-md:text-sm shadow-md hover:bg-[#008B86] transition-all hover:scale-105"
            aria-label="Open Dedicated Consultation"
          >
            <span>Dedicated Consultation</span>
            <div className="w-6 h-6 rounded-full bg-[#123B68] text-white flex items-center justify-center">
              <CalendarCheck className="w-3 h-3" />
            </div>
          </Link>
        </div>
      )}

      {/* Main trigger pill (Compact & Elegant, >= 44px on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 max-md:min-h-[44px] max-md:h-11 rounded-full bg-[#123B68] text-white text-xs max-md:text-sm font-semibold tracking-wide border border-white/20 shadow-xl hover:bg-[#00A6A0] transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6A0]"
        aria-label="Toggle contact menu"
        aria-expanded={isOpen}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A6A0] group-hover:bg-white animate-pulse" />
        <span>{isOpen ? 'Close' : 'Enquire'}</span>
        {isOpen && <X className="w-3.5 h-3.5 ml-0.5 text-white" />}
      </button>
    </div>
  );
}
