import siteConfig from '../data/siteConfig';

/**
 * Builds a URL-encoded WhatsApp link with a formatted message
 * @param {Object} details 
 * @param {string} details.name
 * @param {string} details.phone
 * @param {string} details.email
 * @param {string} details.propertyInterest
 * @param {string} details.budget
 * @param {string} details.location
 * @param {string} details.preferredContactMethod
 * @param {string} details.message
 * @returns {string} wa.me URL
 */
export function buildWhatsAppUrl(details = {}) {
  const number = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  
  const lines = [
    `*🏛️ New Luxury Real Estate Enquiry — Aurelia Estates*`,
    `----------------------------------------`,
    details.name ? `*Full Name:* ${details.name}` : null,
    details.phone ? `*Mobile Number:* ${details.phone}` : null,
    details.email ? `*Email:* ${details.email}` : null,
    details.propertyInterest ? `*Property/Interest:* ${details.propertyInterest}` : null,
    details.budget ? `*Budget Range:* ${details.budget}` : null,
    details.location ? `*Preferred Location:* ${details.location}` : null,
    details.preferredContactMethod ? `*Preferred Contact:* ${details.preferredContactMethod}` : null,
    details.message ? `*Client Message:*\n"${details.message}"` : null,
    `----------------------------------------`,
    `_Sent via Aurelia Estates Concierge Portal_`
  ].filter(Boolean);

  const formattedText = lines.join('\n');
  const encodedText = encodeURIComponent(formattedText);

  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Quick property enquiry WhatsApp URL
 */
export function buildQuickPropertyWhatsAppUrl(propertyName, propertyLocation) {
  const number = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  const message = `Hello Aurelia Estates Concierge, I am interested in scheduling a private viewing and receiving pricing/floorplans for *${propertyName}* (${propertyLocation}). Please assist me.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a mailto: link for fallback email submission
 */
export function buildMailtoUrl(details = {}) {
  const recipient = siteConfig.contact.email;
  const subject = encodeURIComponent(`Property Enquiry: ${details.propertyInterest || 'General Consultation'} - ${details.name || 'Client'}`);
  
  const body = encodeURIComponent(
    `Full Name: ${details.name || 'N/A'}\n` +
    `Mobile Phone: ${details.phone || 'N/A'}\n` +
    `Email: ${details.email || 'N/A'}\n` +
    `Property of Interest: ${details.propertyInterest || 'N/A'}\n` +
    `Budget: ${details.budget || 'N/A'}\n` +
    `Preferred Location: ${details.location || 'N/A'}\n` +
    `Message:\n${details.message || 'N/A'}\n`
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
