import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id || index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen ? 'border-teal/50 bg-white shadow-sm' : 'border-ice-border bg-white/80 hover:border-ice-border'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif text-lg font-semibold text-heading transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                isOpen ? 'bg-teal text-white rotate-180' : 'bg-soft-blue text-royal'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 text-sm text-body leading-relaxed animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
