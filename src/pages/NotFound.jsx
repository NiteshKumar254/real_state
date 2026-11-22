import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-royal text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-teal/40 flex items-center justify-center text-teal mb-6">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-[0.25em] text-teal font-semibold mb-2">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 tracking-tight">
        Sanctuary Not Found.
      </h1>

      <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        The architectural page you are seeking has been moved, archived, or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal text-white font-semibold text-xs tracking-wider uppercase hover:bg-teal-hover transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white font-medium text-xs tracking-wider uppercase hover:bg-white/20 transition-all border border-white/20"
        >
          <span>Explore Properties</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
