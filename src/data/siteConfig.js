/**
 * Centralized Site Configuration
 * Aurelia Estates — Luxury Real Estate & Architectural Property Development
 */

export const siteConfig = {
  name: "Aurelia Estates",
  tagline: "Building Spaces. Creating Futures.",
  description: "Premier real estate and architectural development studio crafting bespoke residential villas, luxury penthouses, and landmark commercial spaces.",
  logo: "/favicon.svg",
  
  contact: {
    phone: "+91 98765 43210", // Identified demo placeholder
    phoneDisplay: "+91 (0) 98765 43210",
    whatsapp: "+919876543210", // International format for wa.me link
    email: "concierge@aureliaestates.demo",
    address: {
      street: "Skyline Avenue, Suite 400",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
      display: "Aurelia Tower, 4th Floor, Skyline Avenue, Bengaluru, KA 560001"
    },
    hours: "Monday – Saturday: 9:30 AM – 7:00 PM (IST)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926955054176!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsLink: "https://maps.google.com/?q=Bengaluru+Karnataka+India"
  },

  socials: {
    instagram: "https://instagram.com/aureliaestates.demo",
    linkedin: "https://linkedin.com/company/aureliaestates-demo",
    facebook: "https://facebook.com/aureliaestates.demo",
    youtube: "https://youtube.com/@aureliaestates.demo"
  },

  stats: [
    { label: "Years of Excellence", value: 10, suffix: "+", description: "Pioneering architectural luxury" },
    { label: "Landmark Projects", value: 25, suffix: "+", description: "Iconic completed & curated developments" },
    { label: "Happy Families", value: 1200, suffix: "+", description: "Trusting Aurelia as their sanctuary" },
    { label: "Prime Locations", value: 15, suffix: "+", description: "Across high-growth metropolitan corridors" }
  ],

  badges: [
    "RERA Registered Developments",
    "IGBC Green Certified Architecture",
    "Bespoke Interior Customization",
    "Transparent Legal Due Diligence"
  ]
};

export default siteConfig;
