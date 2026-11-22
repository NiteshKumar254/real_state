import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { handleImageError } from '../../utils/imageHelpers';

/**
 * ProjectCard
 * Redesigned Compact Horizontal Architecture Card:
 * - Controlled desktop height (~340-370px) preventing oversized stretched images
 * - Image 42% width, Content 58% width on desktop
 * - Alternating layout support (Image Left vs Content Left)
 * - Compact metadata and amenities chips
 * - Bottom-aligned Enquiry CTA button
 */
export default function ProjectCard({ project, index = 0 }) {
  const {
    name,
    location,
    category,
    status,
    completionYear,
    units,
    image,
    description,
    highlights
  } = project;

  const isReversed = index % 2 === 1;

  const getStatusBadgeStyle = (currentStatus) => {
    switch (currentStatus) {
      case 'Completed':
        return 'bg-[#008B86]/95 text-white';
      case 'Ongoing':
        return 'bg-[#123B68]/95 text-white';
      case 'Upcoming':
      default:
        return 'bg-[#0B2540]/90 text-teal-light border border-teal/30';
    }
  };

  return (
    <article
      className={`group relative isolate flex flex-col ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } rounded-[24px] border border-[#D6E3EC] bg-white shadow-[0_4px_20px_rgba(18,59,104,0.05)] hover:shadow-[0_18px_45px_rgba(18,59,104,0.12)] hover:border-[#00A6A0]/60 transition-all duration-500 overflow-hidden hover:-translate-y-1 lg:h-[360px]`}
    >
      {/* 1. IMAGE CONTAINER (42% on desktop, height-constrained) */}
      <div className="relative w-full lg:w-[42%] h-60 sm:h-72 lg:h-full shrink-0 overflow-hidden bg-[#DDEBF3]">
        <img
          src={image || '/assets/images/hero/house-after.jpg'}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle gradient overlay to protect status badge */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2540]/50 via-transparent to-[#0B2540]/25" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm backdrop-blur-md ${getStatusBadgeStyle(status)}`}>
            {status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/40 text-white/90 backdrop-blur-md border border-white/10">
            Landmark Development
          </span>
        </div>
      </div>

      {/* 2. CONTENT CONTAINER (58% on desktop) */}
      <div className="w-full lg:w-[58%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between h-full bg-white">
        <div>
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-[#008B86] uppercase tracking-[0.18em]">
              {category}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#00A6A0]" />
            <span className="text-[11px] text-[#718396] font-medium">South India</span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#142D46] group-hover:text-[#123B68] transition-colors duration-300 mb-2.5">
            {name}
          </h3>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#526579] font-medium mb-3.5 pb-3 border-b border-[#D6E3EC]/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-[#00A6A0] shrink-0" />
              <span>{location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-[#00A6A0] shrink-0" />
              <span>Target: {completionYear}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={14} className="text-[#00A6A0] shrink-0" />
              <span>{units}</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#526579] leading-relaxed line-clamp-3 mb-4 font-light">
            {description}
          </p>

          {/* Highlights Chips */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {highlights.slice(0, 4).map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F3F8FC] border border-[#D6E3EC] text-[11px] font-medium text-[#123B68]"
                >
                  <CheckCircle2 size={11} className="text-[#00A6A0]" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. BOTTOM CTA ACTION */}
        <div className="pt-3.5 border-t border-[#D6E3EC]/70 flex items-center justify-between mt-auto">
          <span className="text-xs text-[#718396] font-medium hidden sm:inline">
            Direct Private Client Advisory
          </span>

          <Link
            to={`/enquire?project=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B68] text-white text-xs font-semibold shadow-sm hover:bg-[#00A6A0] hover:shadow-[0_4px_16px_rgba(0,166,160,0.25)] transition-all duration-300 group/btn"
          >
            <span>Enquire for Project</span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
