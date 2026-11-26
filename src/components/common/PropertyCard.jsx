// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowUpRight,
//   Bath,
//   BedDouble,
//   MapPin,
//   Maximize2,
//   Sparkles,
// } from "lucide-react";
// import { handleImageError } from "../../utils/imageHelpers";

// /**
//  * PropertyCard
//  * Redesigned High-End Luxury Architectural Card:
//  * - Rounded corners (~24px)
//  * - Bright, crystal-clear property imagery with gentle zoom
//  * - Refined Royal Blue & Teal accents
//  * - Clean specifications & pricing layout
//  * - Restrained, premium hover interactions without layout shifts
//  */
// export default function PropertyCard({ property }) {
//   if (!property) return null;

//   const {
//     slug,
//     name,
//     location,
//     type,
//     price,
//     bedrooms,
//     bathrooms,
//     area,
//     status,
//     badge,
//     images,
//     summary,
//   } = property;

//   const displayImage =
//     Array.isArray(images) && images.length > 0
//       ? images[0]
//       : "/assets/images/hero/house-after.jpg";

//   const detailsLink = `/properties/${slug}`;
//   const isReady = status === "Ready to Move";

//   return (
//     <article
//       className="
//         group relative isolate
//         flex h-full flex-col
//         overflow-hidden
//         rounded-[24px]
//         border border-[#D6E3EC]
//         bg-white
//         shadow-[0_4px_20px_rgba(18,59,104,0.05)]
//         transition-all duration-500 ease-out
//         hover:-translate-y-1.5
//         hover:border-[#00A6A0]/60
//         hover:shadow-[0_20px_45px_rgba(18,59,104,0.12)]
//         focus-within:border-[#00A6A0]
//         focus-within:shadow-[0_16px_40px_rgba(18,59,104,0.1)]
//       "
//     >
//       {/* 1. CINEMATIC IMAGE AREA */}
//       <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#DDEBF3]">
//         <img
//           src={displayImage}
//           alt={name || "Luxury Property"}
//           loading="lazy"
//           onError={handleImageError}
//           className="
//             h-full w-full
//             object-cover object-center
//             transition-transform duration-700 ease-out
//             group-hover:scale-105
//           "
//         />

//         {/* Subtle cinematic gradient: protects badges without muddying the photograph */}
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2540]/45 via-transparent to-[#0B2540]/25" />

//         {/* Top Badges */}
//         <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-2">
//           <div className="flex flex-wrap items-center gap-2">
//             {badge && (
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wide text-[#123B68] shadow-sm backdrop-blur-md">
//                 <Sparkles size={11} className="text-[#00A6A0]" />
//                 {badge}
//               </span>
//             )}

//             {status && (
//               <span
//                 className={`inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md ${
//                   isReady ? "bg-[#008B86]/95" : "bg-[#123B68]/90"
//                 }`}
//               >
//                 <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
//                 {status}
//               </span>
//             )}
//           </div>

//           {/* Property Type Badge */}
//           {type && (
//             <span className="inline-flex items-center rounded-full border border-white/30 bg-royal/85 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
//               {type}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* 2. CARD CONTENT AREA */}
//       <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
//         <div>
//           {/* Location with Teal Pin */}
//           <div className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-[#526579]">
//             <MapPin size={14} className="shrink-0 text-[#00A6A0]" />
//             <span className="truncate">{location}</span>
//           </div>

//           {/* Property Title (max 2 lines) */}
//           <Link
//             to={detailsLink}
//             className="group/title block mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6A0] rounded"
//           >
//             <h3 className="line-clamp-2 min-h-[54px] font-serif text-[20px] sm:text-[21px] font-bold leading-[1.3] text-[#142D46] transition-colors duration-300 group-hover/title:text-[#123B68]">
//               {name}
//             </h3>
//           </Link>

//           {/* Short Summary (if exists) */}
//           {summary && (
//             <p className="line-clamp-2 text-xs text-[#526579] leading-relaxed mb-4 font-light">
//               {summary}
//             </p>
//           )}

//           {/* Specifications Box */}
//           <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[#D6E3EC] bg-[#F8FBFE] px-3.5 py-2.5 text-[12px] font-medium text-[#526579]">
//             {Number(bedrooms) > 0 && (
//               <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
//                 <BedDouble size={15} className="text-[#00A6A0]" />
//                 <span>{bedrooms} Beds</span>
//               </div>
//             )}

//             {Number(bathrooms) > 0 && (
//               <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
//                 <Bath size={15} className="text-[#00A6A0]" />
//                 <span>{bathrooms} Baths</span>
//               </div>
//             )}

//             {area && (
//               <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
//                 <Maximize2 size={14} className="text-[#00A6A0]" />
//                 <span>{area}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 3. PRICE & CTA SECTION */}
//         <div className="mt-auto border-t border-[#D6E3EC]/70 pt-4">
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#718396]">
//                 Guide Price
//               </span>
//               <span className="font-serif text-[22px] sm:text-[23px] font-bold tracking-tight text-[#123B68]">
//                 {price}
//               </span>
//             </div>

//             <Link
//               to={detailsLink}
//               aria-label={`View details for ${name}`}
//               className="
//                 inline-flex items-center justify-center gap-1.5
//                 rounded-xl bg-[#123B68] px-4 py-2.5
//                 text-[12px] font-semibold text-white
//                 shadow-[0_4px_12px_rgba(18,59,104,0.15)]
//                 transition-all duration-300
//                 hover:bg-[#00A6A0] hover:shadow-[0_6px_18px_rgba(0,166,160,0.3)]
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6A0]
//               "
//             >
//               <span>View Details</span>
//               <ArrowUpRight
//                 size={15}
//                 className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Subtle bottom accent line on hover */}
//       <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#00A6A0] to-[#123B68] transition-all duration-500 group-hover:w-full" />
//     </article>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  MapPin,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { handleImageError } from "../../utils/imageHelpers";

/**
 * Premium Horizontal Property Card
 *
 * Desktop:
 * - Image left
 * - Property details right
 *
 * Mobile:
 * - Image top
 * - Details below
 *
 * Existing property data and routes preserved.
 */

export default function PropertyCard({ property }) {
  if (!property) return null;

  const {
    slug,
    name,
    location,
    type,
    price,
    bedrooms,
    bathrooms,
    area,
    status,
    badge,
    images,
  } = property;

  const displayImage =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "/assets/images/hero/house-after.jpg";

  const detailsLink = `/properties/${slug}`;
  const isReady = status === "Ready to Move";

  return (
    <article
      className="
        group relative isolate
        flex h-full min-w-0 flex-col
        overflow-hidden
        rounded-[24px] max-md:rounded-[18px]
        border border-[#D6E3EC]
        bg-white
        shadow-[0_5px_22px_rgba(18,59,104,0.06)]
        transition-[transform,box-shadow,border-color]
        duration-500 ease-out

        hover:-translate-y-1.5
        hover:border-[#00A6A0]/50
        hover:shadow-[0_20px_45px_rgba(18,59,104,0.13)]

        focus-within:border-[#00A6A0]

        md:flex-row
      "
    >
      {/* LEFT: PROPERTY IMAGE */}
      <div
        className="
          relative w-full shrink-0
          overflow-hidden
          bg-[#DDEBF3]
          aspect-[16/10]

          md:aspect-auto
          md:w-[47%]
          md:self-stretch
        "
      >
        <img
          src={displayImage}
          alt={name || "Property"}
          loading="lazy"
          onError={handleImageError}
          className="
            absolute inset-0
            h-full w-full
            object-cover object-center
            transition-transform
            duration-700 ease-out

            group-hover:scale-[1.055]
            motion-reduce:transition-none
            motion-reduce:transform-none
          "
        />

        {/* Subtle gradient for badge readability */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-b
            from-[#071F39]/20
            via-transparent
            to-[#071F39]/20
          "
        />

        {/* TOP BADGES */}
        <div
          className="
            absolute left-4 right-4 top-4
            flex flex-wrap items-start gap-2
          "
        >
          {badge && (
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full
                bg-white/95
                px-3 py-1.5
                text-[10px] font-bold
                text-[#123B68]
                shadow-sm
                backdrop-blur-sm
              "
            >
              <Sparkles
                size={12}
                className="text-[#00A6A0]"
              />
              {badge}
            </span>
          )}

          {status && (
            <span
              className={`
                inline-flex items-center gap-1.5
                rounded-full
                px-3 py-1.5
                text-[10px] font-semibold
                text-white shadow-sm

                ${isReady
                  ? "bg-[#00A6A0]/95"
                  : "bg-[#123B68]/95"
                }
              `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {status}
            </span>
          )}
        </div>

        {/* PROPERTY TYPE */}
        {type && (
          <span
            className="
              absolute bottom-4 left-4
              max-w-[85%]
              truncate
              rounded-full
              bg-[#123B68]/90
              px-3 py-1.5
              text-[10px] font-semibold
              text-white
              backdrop-blur-sm
            "
          >
            {type}
          </span>
        )}
      </div>

      {/* RIGHT: PROPERTY DETAILS */}
      <div
        className="
          flex min-w-0 flex-1
          flex-col justify-between
          p-5 sm:p-6 max-md:p-4
          md:min-h-[300px]
        "
      >
        <div className="min-w-0">
          {/* LOCATION */}
          <div
            className="
              mb-2 flex items-start gap-2
              text-[12px] font-medium
              text-[#526579]
            "
          >
            <MapPin
              size={15}
              className="
                mt-0.5 shrink-0
                text-[#00A6A0]
              "
            />
            <span className="line-clamp-2">
              {location}
            </span>
          </div>

          {/* PROPERTY NAME */}
          <Link
            to={detailsLink}
            className="
              block rounded
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#00A6A0]
            "
          >
            <h3
              className="
                line-clamp-2
                font-serif
                text-[21px] font-bold max-md:text-[18px]
                leading-[1.25]
                tracking-tight
                text-[#142D46]
                transition-colors duration-300

                group-hover:text-[#123B68]
                lg:text-[23px]
              "
            >
              {name}
            </h3>
          </Link>

          {/* TEAL ACCENT LINE */}
          <div
            className="
              mt-3 h-[2px] w-12
              rounded-full
              bg-[#00A6A0]
            "
          />

          {/* PROPERTY SPECIFICATIONS */}
          <div
            className="
              mt-5 max-md:mt-3 flex flex-wrap
              items-center
              gap-x-4 gap-y-3 max-md:gap-x-3 max-md:gap-y-2
              text-[12px] font-medium
              text-[#344F69]
            "
          >
            {Number(bedrooms) > 0 && (
              <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <BedDouble
                  size={16}
                  className="text-[#00A6A0]"
                />
                <span>{bedrooms} Beds</span>
              </div>
            )}

            {Number(bathrooms) > 0 && (
              <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Bath
                  size={16}
                  className="text-[#00A6A0]"
                />
                <span>{bathrooms} Baths</span>
              </div>
            )}

            {area && (
              <div className="inline-flex min-w-0 items-center gap-1.5">
                <Maximize2
                  size={16}
                  className="shrink-0 text-[#00A6A0]"
                />
                <span className="break-words">
                  {area}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PRICE + CTA */}
        <div
          className="
            mt-5 max-md:mt-3 flex flex-wrap
            items-end justify-between
            gap-3
            border-t border-[#D6E3EC]
            pt-4 max-md:pt-3
          "
        >
          <div className="min-w-0">
            <span
              className="
                mb-1 block
                text-[10px] font-bold
                uppercase tracking-[0.14em]
                text-[#718396]
              "
            >
              Guide Price
            </span>

            <span
              className="
                font-serif
                text-[23px] max-md:text-[20px] font-bold
                leading-none
                text-[#123B68]
              "
            >
              {price}
            </span>
          </div>

          <Link
            to={detailsLink}
            aria-label={`View details for ${name}`}
            className="
              inline-flex shrink-0
              items-center justify-center
              gap-1.5
              rounded-xl
              bg-[#123B68]
              px-4 py-3 max-md:h-11 max-md:min-h-[44px] max-md:px-5
              text-[12px] font-semibold
              text-white
              shadow-[0_4px_12px_rgba(18,59,104,0.14)]
              transition-all duration-300

              hover:bg-[#00A6A0]
              hover:shadow-[0_7px_18px_rgba(0,166,160,0.23)]

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#00A6A0]
            "
          >
            View Details

            <ArrowUpRight
              size={16}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>

      {/* HOVER ACCENT */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 left-0
          h-[3px] w-0
          bg-[#00A6A0]
          transition-all duration-500
          group-hover:w-full
        "
      />
    </article>
  );
}
