import React from 'react';
import { MessageCircle } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

export default function WhatsAppButton({ 
  text = "Chat on WhatsApp", 
  message, 
  className = "",
  variant = "gold" // gold | green | outline
}) {
  const number = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  const defaultMsg = 'Hello Aurelia Estates Concierge, I would like to enquire about your luxury properties and developments.';
  const encodedText = encodeURIComponent(message || defaultMsg);
  const waUrl = `https://wa.me/${number}?text=${encodedText}`;

  const styles = {
    gold: "bg-teal text-white hover:bg-teal-hover",
    teal: "bg-teal text-white hover:bg-teal-hover",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-teal text-teal hover:bg-teal hover:text-white"
  }[variant] || "bg-teal text-white";

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md ${styles} ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-4 h-4" />
      <span>{text}</span>
    </a>
  );
}
