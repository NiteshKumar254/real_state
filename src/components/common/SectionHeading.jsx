import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className = ""
}) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
          light ? 'text-teal' : 'text-teal'
        }`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-[1.15] mb-4 ${
          light ? 'text-white' : 'text-heading'
        }`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          light ? 'text-gray-300' : 'text-body'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
