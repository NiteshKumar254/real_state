import React from 'react';
import { Phone } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

export default function CallButton({ 
  text = "Call Concierge", 
  className = "",
  variant = "primary" // primary | outline
}) {
  const telUrl = `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`;

  const styles = {
    primary: "bg-royal text-white hover:bg-royal-dark",
    teal: "bg-teal text-white hover:bg-teal-hover",
    outline: "border border-royal text-royal hover:bg-royal hover:text-white"
  }[variant] || "bg-royal text-white";

  return (
    <a
      href={telUrl}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md ${styles} ${className}`}
      aria-label={`Call Aurelia Estates at ${siteConfig.contact.phoneDisplay}`}
    >
      <Phone className="w-4 h-4 text-teal" />
      <span>{text}</span>
    </a>
  );
}
