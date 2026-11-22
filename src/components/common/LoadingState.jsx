import React from 'react';

export default function LoadingState({ message = "Curating Luxury Residences..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-luxury-gold border-t-transparent animate-spin mb-4" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
        {message}
      </span>
    </div>
  );
}
