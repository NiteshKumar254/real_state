import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Bed, Bath, Maximize2, MapPin, CheckCircle2, 
  MessageCircle, Phone, ArrowUpRight, ShieldCheck, 
  Share2, ChevronRight, Sparkles 
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PropertyCard from '../components/common/PropertyCard';
import EnquiryForm from '../components/common/EnquiryForm';
import { handleImageError } from '../utils/imageHelpers';
import { buildQuickPropertyWhatsAppUrl } from '../utils/whatsapp';
import properties from '../data/properties';
import siteConfig from '../data/siteConfig';

export default function PropertyDetails() {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);

  // Active gallery image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center pt-32">
        <h2 className="text-3xl font-serif font-bold text-primary-dark mb-3">
          Property Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The requested luxury residence could not be found or has been moved from our active listings.
        </p>
        <Link
          to="/properties"
          className="px-8 py-3.5 rounded-full bg-primary-dark text-white text-xs font-semibold hover:bg-luxury-gold hover:text-primary-dark transition-all"
        >
          Return to Properties
        </Link>
      </div>
    );
  }

  // Related properties (same type or other featured, excluding current)
  const relatedProperties = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['/assets/images/hero/house-after.jpg'];

  const quickWhatsAppUrl = buildQuickPropertyWhatsAppUrl(property.name, property.location);

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        eyebrow={property.type}
        title={property.name}
        subtitle={`${property.location} • ${property.price}`}
        breadcrumbItems={[
          { label: "Properties", to: "/properties" },
          { label: property.name }
        ]}
        image={property.images && property.images.length > 0 ? property.images[0] : "/assets/images/hero/house-after.jpg"}
      />

      {/* Main Details Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Area (8 cols) */}
            <div className="lg:col-span-8">
              
              {/* Interactive Image Gallery */}
              <div className="mb-10">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100 mb-4 border border-gray-100">
                  <img
                    src={images[selectedImageIndex] || images[0]}
                    alt={`${property.name} view ${selectedImageIndex + 1}`}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-royal-deep/80 backdrop-blur-md text-white text-xs font-semibold">
                      {property.status}
                    </span>
                    {property.badge && (
                      <span className="px-3.5 py-1.5 rounded-full bg-teal backdrop-blur-md text-white text-xs font-semibold">
                        {property.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImageIndex === idx ? 'border-teal scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Metric Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-ice border border-ice-border mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal shadow-sm">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted block">Bedrooms</span>
                    <span className="text-base font-bold text-heading">{property.bedrooms || 'Custom'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal shadow-sm">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted block">Bathrooms</span>
                    <span className="text-base font-bold text-heading">{property.bathrooms || 'Custom'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal shadow-sm">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted block">Total Area</span>
                    <span className="text-base font-bold text-heading">{property.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted block">Status</span>
                    <span className="text-base font-bold text-heading">{property.status}</span>
                  </div>
                </div>
              </div>

              {/* Architectural Description */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-heading mb-4">
                  Architectural Narrative
                </h3>
                <p className="text-body text-base leading-relaxed mb-6 font-light">
                  {property.description}
                </p>
                <p className="text-body text-sm leading-relaxed">
                  {property.summary}
                </p>
              </div>

              {/* Amenities & Curated Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-heading mb-6">
                  Signature Amenities & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-ice border border-ice-border">
                      <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-heading">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              {property.specifications && (
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-bold text-heading mb-6">
                    Technical Specifications
                  </h3>
                  <div className="rounded-2xl border border-ice-border overflow-hidden text-sm divide-y divide-ice-border">
                    <div className="grid grid-cols-3 p-4 bg-ice">
                      <span className="font-semibold text-heading">Flooring &amp; Stone</span>
                      <span className="col-span-2 text-body">{property.specifications.flooring}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 bg-white">
                      <span className="font-semibold text-heading">Sanitaryware &amp; Brass</span>
                      <span className="col-span-2 text-body">{property.specifications.fittings}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 bg-ice">
                      <span className="font-semibold text-heading">Superstructure</span>
                      <span className="col-span-2 text-body">{property.specifications.structure}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 bg-white">
                      <span className="font-semibold text-heading">Power Backup</span>
                      <span className="col-span-2 text-body">{property.specifications.powerBackup}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Location Context */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-heading mb-4">
                  Location &amp; Neighborhood
                </h3>
                <div className="flex items-center gap-2 text-sm text-body mb-6">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>{property.location}</span>
                </div>
                <div className="p-6 rounded-2xl bg-ice border border-ice-border">
                  <p className="text-xs text-muted leading-relaxed">
                    Positioned in a premier residential enclave with rapid connectivity to commercial epicenters, international schooling, and upscale lifestyle hubs. Private chauffeured site visits available on request.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Sidebar: Quick Actions & Enquiry Form (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                
                {/* Investment Card */}
                <div className="p-8 rounded-3xl bg-royal text-white border border-white/10 shadow-2xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-2">
                    Investment Opportunity
                  </span>
                  <div className="text-3xl font-serif font-bold text-white mb-4">
                    {property.price}
                  </div>

                  <div className="space-y-3 mb-6">
                    <a
                      href={quickWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-teal text-white font-semibold text-xs tracking-wider uppercase hover:bg-teal-hover transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Property Desk</span>
                    </a>

                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 text-white font-medium text-xs tracking-wider uppercase hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Phone className="w-4 h-4 text-teal" />
                      <span>Call Concierge</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal" />
                      RERA Verified
                    </span>
                    <span>100% Freehold Title</span>
                  </div>
                </div>

                {/* Direct Property Enquiry Form */}
                <div>
                  <h4 className="text-lg font-serif font-bold text-heading mb-4">
                    Request Comprehensive Dossier
                  </h4>
                  <EnquiryForm prefilledProperty={property.name} />
                </div>

              </div>
            </div>

          </div>

          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <div className="mt-24 pt-16 border-t border-ice-border">
              <h3 className="text-3xl font-serif font-bold text-heading mb-8">
                Similar Signature Residences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProperties.map((rel) => (
                  <PropertyCard key={rel.id} property={rel} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
