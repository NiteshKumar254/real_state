import React from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import { buildWhatsAppUrl, buildMailtoUrl } from '../utils/whatsapp';
import siteConfig from '../data/siteConfig';

export default function Contact() {
  const [submitted, setSubmitted] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data) => {
    const details = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      propertyInterest: data.subject,
      message: data.message
    };

    const waUrl = buildWhatsAppUrl(details);
    const mailUrl = buildMailtoUrl(details);

    setSubmitted({ waUrl, mailUrl });
    window.open(waUrl, '_blank');
  };

  const whatsappDirectUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Aurelia Estates Concierge, I would like to enquire about your luxury properties and services.')}`;

  return (
    <div>
      <PageHero
        eyebrow="Private Client Advisory"
        title="Contact Aurelia Estates."
        subtitle="Speak directly with our senior partners or visit our central office to explore prime South Indian luxury real estate."
        breadcrumbItems={[{ label: "Contact Us" }]}
        image="/assets/images/hero/contact-hero.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Direct Contact Details & Hours */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold text-teal uppercase tracking-[0.2em] block mb-3">
                Concierge Desk
              </span>
              <h2 className="text-3xl font-serif font-bold text-heading mb-6">
                We Welcome Your Conversation.
              </h2>
              <p className="text-body text-sm leading-relaxed mb-8">
                Whether inquiring about an off-market sky penthouse, looking to schedule a chauffeured site tour, or reviewing architectural blueprints, our private team is at your disposal.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-blue text-teal border border-ice-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading mb-1">Office Address</h4>
                    <p className="text-xs text-body leading-relaxed">{siteConfig.contact.address.display}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-blue text-teal border border-ice-border flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading mb-1">Telephone Concierge</h4>
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-xs text-body hover:text-teal transition-colors block">
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-blue text-teal border border-ice-border flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading mb-1">Direct Email</h4>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-body hover:text-teal transition-colors block">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-blue text-teal border border-ice-border flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading mb-1">Advisory Hours</h4>
                    <p className="text-xs text-body leading-relaxed">{siteConfig.contact.hours}</p>
                  </div>
                </div>
              </div>

              {/* Direct Instant WhatsApp Box */}
              <div className="p-6 rounded-2xl bg-ice border border-ice-border">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-semibold text-heading">Instant WhatsApp Response</h4>
                </div>
                <p className="text-xs text-body leading-relaxed mb-4">
                  Connect immediately with our dedicated client director without waiting for email turnaround.
                </p>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start Live Chat</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ice-border shadow-luxury">
                <h3 className="text-2xl font-serif font-bold text-heading mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-gray-500 text-xs mb-8">
                  Fill in your details below and we will redirect you to WhatsApp to dispatch your inquiry.
                </p>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h4 className="text-xl font-serif font-bold text-primary-dark mb-2">
                      Inquiry Ready to Dispatch
                    </h4>
                    <p className="text-xs text-gray-600 max-w-md mx-auto mb-6">
                      Your message has been formatted. If WhatsApp did not open automatically, click below:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={submitted.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all"
                      >
                        Send via WhatsApp
                      </a>
                      <a
                        href={submitted.mailUrl}
                        className="px-6 py-3 rounded-full bg-royal text-white text-xs font-semibold hover:bg-teal transition-all"
                      >
                        Send via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#142D46] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Devraj Roy"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-4 py-3 rounded-xl border border-[#D6E3EC] focus:border-teal focus:ring-2 focus:ring-teal/15 text-sm focus:outline-none transition-all"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#142D46] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="client@domain.com"
                          {...register('email', { required: 'Email is required' })}
                          className="w-full px-4 py-3 rounded-xl border border-[#D6E3EC] focus:border-teal focus:ring-2 focus:ring-teal/15 text-sm focus:outline-none transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#142D46] mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full px-4 py-3 rounded-xl border border-[#D6E3EC] focus:border-teal focus:ring-2 focus:ring-teal/15 text-sm focus:outline-none transition-all"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#142D46] mb-2">
                          Subject / Inquiry Type
                        </label>
                        <input
                          type="text"
                          placeholder="Penthouse Viewing / Villa Build"
                          {...register('subject')}
                          className="w-full px-4 py-3 rounded-xl border border-[#D6E3EC] focus:border-teal focus:ring-2 focus:ring-teal/15 text-sm focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#142D46] mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please describe your interest, preferred timelines, or any questions..."
                        {...register('message', { required: 'Message is required' })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D6E3EC] focus:border-teal focus:ring-2 focus:ring-teal/15 text-sm focus:outline-none transition-all"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-royal text-white font-semibold text-xs tracking-wider uppercase hover:bg-teal transition-all duration-300 shadow-md group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>Dispatch Message via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Interactive Map Embed Section */}
          <div className="mt-20 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="p-4 bg-primary-dark text-white flex items-center justify-between text-xs px-6">
              <span className="font-semibold uppercase tracking-wider text-luxury-gold">
                Bengaluru Central Headquarters Location
              </span>
              <a
                href={siteConfig.contact.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline underline-offset-4"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="w-full h-80 bg-gray-100">
              <iframe
                title="Aurelia Estates Central Location"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
