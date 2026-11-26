import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

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

    window.addEventListener('scroll', toggleVisible, { passive: true });
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 max-md:bottom-[calc(16px+env(safe-area-inset-bottom,0px))] max-md:left-4 z-40 w-11 h-11 max-md:min-w-[44px] max-md:min-h-[44px] rounded-full bg-primary-dark text-white shadow-luxury hover:bg-luxury-gold hover:text-primary-dark flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 ${
        isInputFocused ? 'max-md:hidden' : ''
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
