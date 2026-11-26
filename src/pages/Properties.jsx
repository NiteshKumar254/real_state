// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import {
//   Search,
//   SlidersHorizontal,
//   RotateCcw,
//   Home,
//   LayoutGrid,
//   List,
//   ChevronDown,
//   ArrowUpDown,
//   MapPin,
//   X,
//   Building2,
//   Sparkles,
//   ArrowRight,
//   ArrowUpRight,
//   BedDouble,
//   Bath,
//   Maximize2,
// } from "lucide-react";

// import PageHero from "../components/common/PageHero";
// import PropertyCard from "../components/common/PropertyCard";
// import { handleImageError } from "../utils/imageHelpers";

// import properties, {
//   propertyTypes,
//   propertyStatuses,
// } from "../data/properties";

// const ALL_TYPES = "All Types";
// const ALL_STATUSES = "All Statuses";

// const quickCategories = [
//   {
//     label: "All Properties",
//     value: ALL_TYPES,
//     icon: LayoutGrid,
//   },
//   {
//     label: "Villas",
//     value: "Premium Villa",
//     icon: Home,
//   },
//   {
//     label: "Apartments",
//     value: "Luxury Apartment",
//     icon: Building2,
//   },
//   {
//     label: "Penthouses",
//     value: "Penthouse",
//     icon: Sparkles,
//   },
//   {
//     label: "Commercial",
//     value: "Commercial Space",
//     icon: Building2,
//   },
//   {
//     label: "Plots",
//     value: "Residential Plot",
//     icon: MapPin,
//   },
// ];

// export default function Properties() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const urlType = searchParams.get("type");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedType, setSelectedType] = useState(urlType || ALL_TYPES);
//   const [selectedStatus, setSelectedStatus] = useState(ALL_STATUSES);
//   const [selectedBedrooms, setSelectedBedrooms] = useState("All");
//   const [sortBy, setSortBy] = useState("featured");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   useEffect(() => {
//     if (urlType) {
//       setSelectedType(urlType);
//     }
//   }, [urlType]);

//   const changeType = (type) => {
//     setSelectedType(type);
//     const nextParams = new URLSearchParams(searchParams);
//     if (type === ALL_TYPES) {
//       nextParams.delete("type");
//     } else {
//       nextParams.set("type", type);
//     }
//     setSearchParams(nextParams, { replace: true });
//   };

//   const filteredProperties = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();

//     return properties
//       .filter((item) => {
//         if (query) {
//           const searchableText = [
//             item.name,
//             item.location,
//             item.type,
//             item.status,
//             item.summary,
//           ]
//             .filter(Boolean)
//             .join(" ")
//             .toLowerCase();

//           if (!searchableText.includes(query)) {
//             return false;
//           }
//         }

//         if (selectedType !== ALL_TYPES) {
//           const itemType = (item.type || "").toLowerCase();
//           const targetType = selectedType.toLowerCase();
//           const matches =
//             itemType === targetType ||
//             itemType.includes(targetType) ||
//             (targetType.includes("villa") && itemType.includes("villa")) ||
//             (targetType.includes("apartment") && itemType.includes("apartment")) ||
//             (targetType.includes("plot") && itemType.includes("plot"));

//           if (!matches) {
//             return false;
//           }
//         }

//         if (
//           selectedStatus !== ALL_STATUSES &&
//           item.status !== selectedStatus
//         ) {
//           return false;
//         }

//         if (selectedBedrooms !== "All") {
//           const bedrooms = Number(item.bedrooms) || 0;
//           if (selectedBedrooms === "4+") {
//             if (bedrooms < 4) return false;
//           } else if (bedrooms !== Number(selectedBedrooms)) {
//             return false;
//           }
//         }

//         return true;
//       })
//       .sort((a, b) => {
//         if (sortBy === "price-low") {
//           return (Number(a.rawPrice) || 0) - (Number(b.rawPrice) || 0);
//         }
//         if (sortBy === "price-high") {
//           return (Number(b.rawPrice) || 0) - (Number(a.rawPrice) || 0);
//         }
//         if (sortBy === "featured") {
//           return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
//         }
//         return 0;
//       });
//   }, [
//     searchTerm,
//     selectedType,
//     selectedStatus,
//     selectedBedrooms,
//     sortBy,
//   ]);

//   const resetFilters = () => {
//     setSearchTerm("");
//     setSelectedType(ALL_TYPES);
//     setSelectedStatus(ALL_STATUSES);
//     setSelectedBedrooms("All");
//     setSortBy("featured");
//     setSearchParams({}, { replace: true });
//   };

//   const activeFilters = [
//     ...(searchTerm.trim()
//       ? [
//           {
//             label: `Search: "${searchTerm.trim()}"`,
//             clear: () => setSearchTerm(""),
//           },
//         ]
//       : []),
//     ...(selectedType !== ALL_TYPES
//       ? [
//           {
//             label: selectedType,
//             clear: () => changeType(ALL_TYPES),
//           },
//         ]
//       : []),
//     ...(selectedStatus !== ALL_STATUSES
//       ? [
//           {
//             label: selectedStatus,
//             clear: () => setSelectedStatus(ALL_STATUSES),
//           },
//         ]
//       : []),
//     ...(selectedBedrooms !== "All"
//       ? [
//           {
//             label: `${selectedBedrooms} Bedrooms`,
//             clear: () => setSelectedBedrooms("All"),
//           },
//         ]
//       : []),
//   ];

//   const selectClass = `
//     w-full appearance-none rounded-2xl border border-[#D6E3EC]
//     bg-[#F7FAFD] py-3.5 pl-4 pr-11 text-xs sm:text-sm font-semibold
//     text-[#123B68] outline-none transition-all duration-300
//     hover:border-[#00A6A0]/60 focus:border-[#00A6A0] focus:bg-white
//     focus:ring-4 focus:ring-[#00A6A0]/10 cursor-pointer
//   `;

//   return (
//     <div className="min-h-screen bg-[#F3F8FC]">
//       {/* 1. COMPACT PAGE HERO */}
//       <PageHero
//         eyebrow="Curated Portfolio"
//         title="Signature Properties & Residences."
//         subtitle="Explore our exclusive collection of luxury penthouses, custom-built villas, and prime plots in Bengaluru."
//         breadcrumbItems={[{ label: "Properties" }]}
//         image="/assets/images/hero/properties-hero.jpg"
//       />

//       {/* 2. REFINED FILTERING & LISTINGS SECTION */}
//       <section className="relative overflow-hidden bg-[#F3F8FC] pt-8 pb-16 sm:pt-10 sm:pb-20">
//         {/* Soft background ambient light */}
//         <div className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#00A6A0]/[0.04] blur-3xl" />

//         <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
//           {/* Section Header */}
//           <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
//             <div>
//               <div className="mb-2 flex items-center gap-2.5">
//                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#008B86]">
//                   Exclusive Portfolio
//                 </span>
//                 <span className="h-px w-10 bg-[#00A6A0]" />
//               </div>

//               <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#123B68]">
//                 Find Your Signature Sanctuary.
//               </h2>
//               <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-[#526579]">
//                 Handcrafted estates, sky residences, and prime parcels engineered to perfection.
//               </p>
//             </div>

//             <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#D6E3EC] bg-white px-4 py-2 shadow-sm">
//               <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF8F6] text-[#008B86]">
//                 <Sparkles size={14} />
//               </span>
//               <div>
//                 <span className="block text-xs font-bold text-[#123B68]">
//                   {properties.length} Verified Properties
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* MAIN SEARCH & FILTER PANEL */}
//           <div className="relative mb-6 overflow-hidden rounded-[24px] border border-[#D6E3EC] bg-white shadow-[0_10px_35px_rgba(18,59,104,0.05)]">
//             {/* Header bar */}
//             <div className="flex flex-wrap items-center justify-between gap-3 bg-[#123B68] px-6 py-3.5 text-white sm:px-8">
//               <div className="flex items-center gap-2.5">
//                 <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
//                   <SlidersHorizontal size={16} />
//                 </span>
//                 <div>
//                   <h3 className="text-xs sm:text-sm font-bold tracking-wide">
//                     Refine Your Collection
//                   </h3>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowMobileFilters((prev) => !prev)}
//                 className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-white/10 lg:hidden"
//               >
//                 <SlidersHorizontal size={14} />
//                 {showMobileFilters ? "Hide Filters" : "Show Filters"}
//               </button>
//             </div>

//             {/* Search Input */}
//             <div className="px-5 pt-5 sm:px-8">
//               <label htmlFor="property-search" className="mb-1.5 block text-xs font-bold text-[#344F69]">
//                 Search Listings
//               </label>
//               <div className="relative">
//                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00A6A0]" />
//                 <input
//                   id="property-search"
//                   type="search"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by property title, neighborhood (Indiranagar, Koramangala...), or architectural type..."
//                   className="w-full rounded-xl border border-[#D6E3EC] bg-[#F7FAFD] py-3.5 pl-11 pr-5 text-xs sm:text-sm text-[#123B68] outline-none transition-all duration-300 placeholder:text-[#91A1B1] hover:border-[#00A6A0]/60 focus:border-[#00A6A0] focus:bg-white focus:ring-4 focus:ring-[#00A6A0]/10"
//                 />
//               </div>
//             </div>

//             {/* Filter Dropdowns */}
//             <div className={`grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 ${showMobileFilters ? "grid" : "hidden lg:grid"}`}>
//               {/* Type */}
//               <div>
//                 <label htmlFor="property-type" className="mb-1.5 block text-xs font-bold text-[#344F69]">
//                   Property Category
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="property-type"
//                     value={selectedType}
//                     onChange={(e) => changeType(e.target.value)}
//                     className={selectClass}
//                   >
//                     {propertyTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#008B86]" />
//                 </div>
//               </div>

//               {/* Status */}
//               <div>
//                 <label htmlFor="property-status" className="mb-1.5 block text-xs font-bold text-[#344F69]">
//                   Delivery Status
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="property-status"
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     className={selectClass}
//                   >
//                     {propertyStatuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#008B86]" />
//                 </div>
//               </div>

//               {/* Bedrooms */}
//               <div>
//                 <label htmlFor="property-bedrooms" className="mb-1.5 block text-xs font-bold text-[#344F69]">
//                   Bedrooms
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="property-bedrooms"
//                     value={selectedBedrooms}
//                     onChange={(e) => setSelectedBedrooms(e.target.value)}
//                     className={selectClass}
//                   >
//                     <option value="All">All Configurations</option>
//                     <option value="3">3 Bedrooms</option>
//                     <option value="4">4 Bedrooms</option>
//                     <option value="4+">4+ Bedrooms / Penthouses</option>
//                   </select>
//                   <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#008B86]" />
//                 </div>
//               </div>
//             </div>

//             {/* Reset Bar */}
//             <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EDF3] bg-[#FBFDFE] px-5 py-3 sm:px-8">
//               <p className="text-xs font-medium text-[#657B91]">
//                 <span className="font-bold text-[#123B68]">{filteredProperties.length}</span> luxury properties match your criteria
//               </p>

//               <button
//                 type="button"
//                 onClick={resetFilters}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526579] transition-colors hover:text-[#008B86]"
//               >
//                 <RotateCcw size={14} />
//                 Reset Filters
//               </button>
//             </div>
//           </div>

//           {/* QUICK CATEGORY PILLS */}
//           <div className="mb-6 flex flex-wrap items-center gap-2">
//             {quickCategories.map((category) => {
//               const Icon = category.icon;
//               const isActive = selectedType === category.value;

//               return (
//                 <button
//                   key={category.label}
//                   type="button"
//                   onClick={() => changeType(category.value)}
//                   aria-pressed={isActive}
//                   className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
//                     isActive
//                       ? "border-[#123B68] bg-[#123B68] text-white shadow-sm"
//                       : "border-[#D6E3EC] bg-white text-[#123B68] hover:border-[#00A6A0] hover:text-[#008B86]"
//                   }`}
//                 >
//                   <Icon size={14} />
//                   {category.label}
//                 </button>
//               );
//             })}
//           </div>

//           {/* ACTIVE FILTER CHIPS */}
//           {activeFilters.length > 0 && (
//             <div className="mb-6 flex flex-wrap items-center gap-2">
//               <span className="mr-1 text-xs font-semibold text-[#526579]">
//                 Active Filters:
//               </span>
//               {activeFilters.map((filter, index) => (
//                 <button
//                   key={`${filter.label}-${index}`}
//                   type="button"
//                   onClick={filter.clear}
//                   className="inline-flex items-center gap-1.5 rounded-full border border-[#BCE7E3] bg-[#EAF8F6] px-3 py-1 text-[11px] font-semibold text-[#008B86] transition-colors hover:bg-[#D7F1ED]"
//                 >
//                   {filter.label}
//                   <X size={12} />
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* RESULTS TOOLBAR (Sort & Grid/List View) */}
//           <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D6E3EC]/70 pb-4">
//             <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#123B68]">
//               Available Residences ({filteredProperties.length})
//             </h3>

//             <div className="flex items-center gap-3">
//               {/* Sorting */}
//               <div className="flex items-center gap-2 rounded-xl border border-[#D6E3EC] bg-white px-3 py-2 text-xs font-medium text-[#526579]">
//                 <ArrowUpDown size={14} className="text-[#008B86]" />
//                 <span className="hidden sm:inline">Sort:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="bg-transparent text-xs font-bold text-[#123B68] outline-none cursor-pointer"
//                 >
//                   <option value="featured">Featured First</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                 </select>
//               </div>

//               {/* View Toggle */}
//               <div className="flex items-center gap-1 rounded-xl border border-[#D6E3EC] bg-white p-1">
//                 <button
//                   type="button"
//                   onClick={() => setViewMode("grid")}
//                   aria-label="Grid view"
//                   aria-pressed={viewMode === "grid"}
//                   className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
//                     viewMode === "grid"
//                       ? "bg-[#123B68] text-white"
//                       : "text-[#526579] hover:bg-[#F3F8FC]"
//                   }`}
//                 >
//                   <LayoutGrid size={15} />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setViewMode("list")}
//                   aria-label="List view"
//                   aria-pressed={viewMode === "list"}
//                   className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
//                     viewMode === "list"
//                       ? "bg-[#123B68] text-white"
//                       : "text-[#526579] hover:bg-[#F3F8FC]"
//                   }`}
//                 >
//                   <List size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* LISTINGS DISPLAY */}
//           {filteredProperties.length > 0 ? (
//             viewMode === "grid" ? (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {filteredProperties.map((property) => (
//                   <div key={property.id} className="h-full">
//                     <PropertyCard property={property} />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               /* DEDICATED ARCHITECTURAL HORIZONTAL LIST VIEW */
//               <div className="flex flex-col gap-5">
//                 {filteredProperties.map((property) => {
//                   const displayImage =
//                     property.images && property.images.length > 0
//                       ? property.images[0]
//                       : "/assets/images/hero/house-after.jpg";
//                   const detailsLink = `/properties/${property.slug}`;
//                   const isReady = property.status === "Ready to Move";

//                   return (
//                     <article
//                       key={property.id}
//                       className="group relative isolate flex flex-col md:flex-row rounded-[24px] border border-[#D6E3EC] bg-white shadow-[0_4px_20px_rgba(18,59,104,0.05)] hover:shadow-[0_16px_40px_rgba(18,59,104,0.12)] hover:border-[#00A6A0]/60 transition-all duration-300 overflow-hidden hover:-translate-y-1"
//                     >
//                       {/* Left Thumbnail */}
//                       <div className="relative md:w-5/12 lg:w-4/12 h-60 md:h-auto min-h-[220px] shrink-0 overflow-hidden bg-[#DDEBF3]">
//                         <img
//                           src={displayImage}
//                           alt={property.name}
//                           loading="lazy"
//                           onError={handleImageError}
//                           className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
//                         />
//                         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2540]/40 via-transparent to-transparent" />

//                         {/* Badges */}
//                         <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//                           {property.badge && (
//                             <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#123B68] shadow-sm backdrop-blur-md">
//                               <Sparkles size={11} className="text-[#00A6A0]" />
//                               {property.badge}
//                             </span>
//                           )}
//                           <span
//                             className={`rounded-full px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md ${
//                               isReady ? "bg-[#008B86]/95" : "bg-[#123B68]/90"
//                             }`}
//                           >
//                             {property.status}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Right Details */}
//                       <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
//                         <div>
//                           <div className="mb-2 flex items-center justify-between gap-2">
//                             <div className="flex items-center gap-1.5 text-xs font-medium text-[#526579]">
//                               <MapPin size={14} className="text-[#00A6A0] shrink-0" />
//                               <span>{property.location}</span>
//                             </div>
//                             <span className="text-[11px] font-semibold uppercase tracking-wider text-[#008B86] bg-[#EAF8F6] px-2.5 py-0.5 rounded-full">
//                               {property.type}
//                             </span>
//                           </div>

//                           <Link to={detailsLink} className="group/title block mb-2">
//                             <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142D46] transition-colors group-hover/title:text-[#123B68]">
//                               {property.name}
//                             </h3>
//                           </Link>

//                           {property.summary && (
//                             <p className="line-clamp-2 text-xs sm:text-sm text-[#526579] leading-relaxed mb-4 font-light">
//                               {property.summary}
//                             </p>
//                           )}

//                           {/* Specs */}
//                           <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#526579] mb-4">
//                             {Number(property.bedrooms) > 0 && (
//                               <div className="inline-flex items-center gap-1.5">
//                                 <BedDouble size={15} className="text-[#00A6A0]" />
//                                 <span>{property.bedrooms} Bedrooms</span>
//                               </div>
//                             )}
//                             {Number(property.bathrooms) > 0 && (
//                               <div className="inline-flex items-center gap-1.5">
//                                 <Bath size={15} className="text-[#00A6A0]" />
//                                 <span>{property.bathrooms} Bathrooms</span>
//                               </div>
//                             )}
//                             {property.area && (
//                               <div className="inline-flex items-center gap-1.5">
//                                 <Maximize2 size={14} className="text-[#00A6A0]" />
//                                 <span>{property.area}</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Price & Action */}
//                         <div className="flex items-center justify-between pt-4 border-t border-[#D6E3EC]/70">
//                           <div>
//                             <span className="block text-[10px] font-bold uppercase tracking-wider text-[#718396]">
//                               Guide Price
//                             </span>
//                             <span className="font-serif text-2xl font-bold text-[#123B68]">
//                               {property.price}
//                             </span>
//                           </div>

//                           <Link
//                             to={detailsLink}
//                             className="inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#00A6A0]"
//                           >
//                             <span>Explore Residence</span>
//                             <ArrowUpRight size={15} />
//                           </Link>
//                         </div>
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             )
//           ) : (
//             /* EMPTY STATE */
//             <div className="mx-auto flex min-h-[360px] max-w-2xl flex-col items-center justify-center rounded-[24px] border border-[#D6E3EC] bg-white px-6 py-12 text-center shadow-sm">
//               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF8F6] text-[#008B86]">
//                 <Home size={30} strokeWidth={1.5} />
//               </div>

//               <h3 className="font-serif text-2xl font-bold text-[#123B68]">
//                 No Properties Found
//               </h3>

//               <p className="mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[#526579]">
//                 We couldn't find residences matching your current criteria. Try adjusting your property category, bedrooms, or location search.
//               </p>

//               <button
//                 type="button"
//                 onClick={resetFilters}
//                 className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#123B68] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#00A6A0]"
//               >
//                 <RotateCcw size={14} />
//                 Clear All Filters
//                 <ArrowRight size={14} />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }




import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Home,
  LayoutGrid,
  List,
  ChevronDown,
  ArrowUpDown,
  MapPin,
  X,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import PageHero from "../components/common/PageHero";
import PropertyCard from "../components/common/PropertyCard";

import properties, {
  propertyTypes,
  propertyStatuses,
} from "../data/properties";

const ALL_TYPES = "All Types";
const ALL_STATUSES = "All Statuses";

const quickCategories = [
  { label: "All Properties", value: ALL_TYPES, icon: LayoutGrid },
  { label: "Villas", value: "Premium Villa", icon: Home },
  { label: "Apartments", value: "Luxury Apartment", icon: Building2 },
  { label: "Penthouses", value: "Penthouse", icon: Sparkles },
  { label: "Commercial", value: "Commercial Space", icon: Building2 },
  { label: "Plots", value: "Residential Plot", icon: MapPin },
];

const selectClass = `
  w-full appearance-none rounded-xl
  border border-[#D6E3EC]
  bg-[#F7FAFD] px-4 py-3 pr-10
  text-sm font-medium text-[#123B68]
  outline-none transition-all duration-300
  hover:border-[#00A6A0]/60
  focus:border-[#00A6A0]
  focus:ring-4 focus:ring-[#00A6A0]/10
  cursor-pointer
`;

function FilterSelect({ id, label, value, onChange, children }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold text-[#344F69]"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
        >
          {children}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="
            pointer-events-none absolute right-3.5 top-1/2
            -translate-y-1/2 text-[#008B86]
          "
        />
      </div>
    </div>
  );
}

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Type is derived directly from URL, preventing stale state.
  const selectedType = searchParams.get("type") || ALL_TYPES;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(ALL_STATUSES);
  const [selectedBedrooms, setSelectedBedrooms] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const changeType = (type) => {
    const next = new URLSearchParams(searchParams);

    if (type === ALL_TYPES) {
      next.delete("type");
    } else {
      next.set("type", type);
    }

    setSearchParams(next, { replace: true });
  };

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return properties
      .filter((item) => {
        const searchableText = [
          item.name,
          item.location,
          item.type,
          item.status,
          item.summary,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (query && !searchableText.includes(query)) {
          return false;
        }

        if (selectedType !== ALL_TYPES) {
          const itemType = String(item.type || "").toLowerCase();
          const targetType = selectedType.toLowerCase();

          const matches =
            itemType === targetType ||
            itemType.includes(targetType) ||
            (targetType.includes("villa") && itemType.includes("villa")) ||
            (targetType.includes("apartment") && itemType.includes("apartment")) ||
            (targetType.includes("plot") && itemType.includes("plot"));

          if (!matches) return false;
        }

        if (
          selectedStatus !== ALL_STATUSES &&
          item.status !== selectedStatus
        ) {
          return false;
        }

        if (selectedBedrooms !== "All") {
          const bedrooms = Number(item.bedrooms) || 0;

          if (selectedBedrooms === "4+") {
            if (bedrooms < 4) return false;
          } else if (bedrooms !== Number(selectedBedrooms)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return (Number(a.rawPrice) || 0) - (Number(b.rawPrice) || 0);
        }

        if (sortBy === "price-high") {
          return (Number(b.rawPrice) || 0) - (Number(a.rawPrice) || 0);
        }

        return Number(Boolean(b.featured)) -
          Number(Boolean(a.featured));
      });
  }, [
    searchTerm,
    selectedType,
    selectedStatus,
    selectedBedrooms,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus(ALL_STATUSES);
    setSelectedBedrooms("All");
    setSortBy("featured");
    setSearchParams({}, { replace: true });
  };

  const activeFilters = [
    ...(searchTerm.trim()
      ? [{
        label: `Search: ${searchTerm.trim()}`,
        clear: () => setSearchTerm(""),
      }]
      : []),

    ...(selectedType !== ALL_TYPES
      ? [{
        label: selectedType,
        clear: () => changeType(ALL_TYPES),
      }]
      : []),

    ...(selectedStatus !== ALL_STATUSES
      ? [{
        label: selectedStatus,
        clear: () => setSelectedStatus(ALL_STATUSES),
      }]
      : []),

    ...(selectedBedrooms !== "All"
      ? [{
        label: `${selectedBedrooms} Bedrooms`,
        clear: () => setSelectedBedrooms("All"),
      }]
      : []),
  ];

  const availableQuickCategories = quickCategories.filter((category) => {
    if (category.value === ALL_TYPES) return true;

    return propertyTypes.some((type) => {
      const actual = String(type).toLowerCase();
      const expected = category.value.toLowerCase();

      return (
        actual === expected ||
        actual.includes(expected) ||
        expected.includes(actual)
      );
    });
  });

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      <PageHero
        eyebrow="Curated Portfolio"
        title="Signature Properties & Residences."
        subtitle="Explore our exclusive collection of luxury penthouses, custom-built villas, and prime plots in Bengaluru."
        image="/assets/images/hero/properties-hero.jpg"
      />

      <section className="bg-[#F3F8FC] pb-20 max-md:pb-12 pt-10 sm:pt-14 max-md:pt-6">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 max-md:px-4">

          {/* INTRO */}
          <div className="mb-8 max-md:mb-5 flex flex-wrap items-end justify-between gap-5 max-md:gap-3">
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008B86]">
                  Exclusive Portfolio
                </span>
                <span className="h-px w-10 bg-[#00A6A0]" />
              </div>

              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#123B68] sm:text-4xl max-md:text-[26px]">
                Find Your Signature Sanctuary.
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#526579] max-md:text-[14px]">
                Discover carefully selected residences, villas,
                commercial spaces and prime properties.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6E3EC] bg-white px-4 py-2.5 shadow-sm">
              <Sparkles size={16} className="text-[#008B86]" />
              <span className="text-xs font-semibold text-[#123B68]">
                {properties.length} Properties
              </span>
            </div>
          </div>

          {/* SEARCH & FILTER PANEL */}
          <div className="mb-7 max-md:mb-5 overflow-hidden rounded-[24px] max-md:rounded-[18px] border border-[#D6E3EC] bg-white shadow-[0_10px_35px_rgba(18,59,104,0.06)]">

            <div className="flex items-center justify-between gap-4 bg-[#123B68] px-5 py-4 text-white sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <SlidersHorizontal size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Find Your Ideal Property
                  </h3>
                  <p className="text-[11px] text-white/70">
                    Search and refine your collection
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowMobileFilters((value) => !value)}
                aria-expanded={showMobileFilters}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 max-md:h-11 max-md:min-h-[44px] text-xs font-semibold lg:hidden"
              >
                <SlidersHorizontal size={14} />
                {showMobileFilters ? "Hide Filters" : "Filters"}
              </button>
            </div>

            {/* SEARCH */}
            <div className="px-5 pt-5 sm:px-7">
              <label
                htmlFor="property-search"
                className="mb-2 block text-xs font-bold text-[#344F69]"
              >
                Search Listings
              </label>

              <div className="relative">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00A6A0]"
                />

                <input
                  id="property-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by property name, location or type..."
                  className="
                    w-full rounded-xl border border-[#D6E3EC]
                    bg-[#F7FAFD] py-3.5 max-md:py-3 max-md:h-12 max-md:min-h-[48px] pl-11 pr-4
                    text-sm max-md:text-[16px] text-[#123B68] outline-none
                    transition-all duration-300
                    placeholder:text-[#91A1B1]
                    focus:border-[#00A6A0]
                    focus:bg-white
                    focus:ring-4 focus:ring-[#00A6A0]/10
                  "
                />
              </div>
            </div>

            {/* DROPDOWNS */}
            <div
              className={`
                grid grid-cols-1 gap-4 px-5 py-5
                sm:grid-cols-2 sm:px-7 lg:grid-cols-3
                ${showMobileFilters ? "grid" : "hidden lg:grid"}
              `}
            >
              <FilterSelect
                id="property-type"
                label="Property Category"
                value={selectedType}
                onChange={changeType}
              >
                {[...new Set([ALL_TYPES, ...propertyTypes])].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
                {selectedType !== ALL_TYPES &&
                  !propertyTypes.includes(selectedType) && (
                    <option value={selectedType}>
                      {selectedType}
                    </option>
                  )}
              </FilterSelect>

              <FilterSelect
                id="property-status"
                label="Delivery Status"
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                {[...new Set([ALL_STATUSES, ...propertyStatuses])].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                id="property-bedrooms"
                label="Bedrooms"
                value={selectedBedrooms}
                onChange={setSelectedBedrooms}
              >
                <option value="All">All Configurations</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </FilterSelect>
            </div>

            {/* FILTER PANEL FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EDF3] bg-[#FBFDFE] px-5 py-3.5 sm:px-7">
              <p className="text-xs text-[#526579]" aria-live="polite">
                <span className="font-bold text-[#123B68]">
                  {filteredProperties.length}
                </span>{" "}
                matching properties
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#526579] transition-colors hover:text-[#008B86]"
              >
                <RotateCcw size={14} />
                Reset Filters
              </button>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div
            className="mb-6 max-md:mb-4 flex flex-nowrap max-md:overflow-x-auto max-md:snap-x max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:pb-2 flex-wrap gap-2"
            role="group"
            aria-label="Property categories"
          >
            {availableQuickCategories.map((item) => {
              const Icon = item.icon;
              const active = selectedType === item.value;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => changeType(item.value)}
                  aria-pressed={active}
                  className={`
                    inline-flex items-center gap-2 rounded-full max-md:shrink-0 max-md:snap-start max-md:min-h-[44px]
                    border px-4 py-2.5 text-xs font-semibold
                    transition-all duration-300
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-[#00A6A0]
                    ${active
                      ? "border-[#123B68] bg-[#123B68] text-white shadow-sm"
                      : "border-[#D6E3EC] bg-white text-[#123B68] hover:border-[#00A6A0] hover:text-[#008B86]"
                    }
                  `}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-[#526579]">
                Active Filters:
              </span>

              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={filter.clear}
                  aria-label={`Remove ${filter.label} filter`}
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-[#BCE7E3] bg-[#EAF8F6]
                    px-3 py-1.5 text-xs font-semibold
                    text-[#008B86] transition-colors
                    hover:bg-[#D7F1ED]
                  "
                >
                  {filter.label}
                  <X size={13} />
                </button>
              ))}
            </div>
          )}

          {/* RESULTS TOOLBAR */}
          <div className="mb-6 max-md:mb-4 flex flex-wrap items-center justify-between gap-4 max-md:gap-3 border-b border-[#D6E3EC] pb-5">
            <div>
              <h3 className="font-serif text-2xl max-md:text-[20px] font-bold text-[#123B68]">
                Available Properties
              </h3>
              <p className="mt-1 text-xs text-[#718396]">
                Showing {filteredProperties.length} of {properties.length}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* SORT */}
              <div className="flex items-center gap-2 rounded-xl border border-[#D6E3EC] bg-white px-3 py-2.5 max-md:min-h-[44px]">
                <ArrowUpDown size={15} className="text-[#008B86]" />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  aria-label="Sort properties"
                  className="max-w-[160px] cursor-pointer bg-transparent text-xs font-semibold text-[#123B68] outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* GRID / LIST TOGGLE */}
              <div className="flex items-center gap-1 rounded-xl border border-[#D6E3EC] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  title="Grid view"
                  className={`
                    flex h-9 w-9 max-md:h-10 max-md:w-10 items-center justify-center rounded-lg
                    transition-colors
                    ${viewMode === "grid"
                      ? "bg-[#123B68] text-white"
                      : "text-[#526579] hover:bg-[#F3F8FC]"
                    }
                  `}
                >
                  <LayoutGrid size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  title="List view"
                  className={`
                    flex h-9 w-9 max-md:h-10 max-md:w-10 items-center justify-center rounded-lg
                    transition-colors
                    ${viewMode === "list"
                      ? "bg-[#123B68] text-white"
                      : "text-[#526579] hover:bg-[#F3F8FC]"
                    }
                  `}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* BROAD HORIZONTAL PROPERTY CARDS */}
          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-7"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {filteredProperties.map((property) => (
                <div
                  key={property.id ?? property.slug}
                  className="min-w-0"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="mx-auto flex min-h-[340px] max-w-2xl flex-col items-center justify-center rounded-[24px] border border-[#D6E3EC] bg-white px-6 py-12 text-center shadow-sm">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF8F6] text-[#008B86]">
                <Home size={30} strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#123B68]">
                No Properties Found
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#526579]">
                We couldn't find properties matching your criteria.
                Try adjusting your search, category or availability filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-6 inline-flex items-center gap-2
                  rounded-xl bg-[#123B68] px-6 py-3
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:bg-[#00A6A0]
                "
              >
                <RotateCcw size={16} />
                Clear All Filters
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

