import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, buildMailtoUrl } from '../../utils/whatsapp';
import properties from '../../data/properties';

export default function EnquiryForm({ prefilledProperty = "" }) {
  const [submissionReady, setSubmissionReady] = useState(null);
  const [activeTab, setActiveTab] = useState('whatsapp'); // whatsapp | email

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      propertyInterest: prefilledProperty,
      preferredLocation: '',
      budgetRange: '',
      preferredContactMethod: 'WhatsApp',
      message: ''
    }
  });

  const onSubmit = (data) => {
    const details = {
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      propertyInterest: data.propertyInterest,
      location: data.preferredLocation,
      budget: data.budgetRange,
      preferredContactMethod: data.preferredContactMethod,
      message: data.message
    };

    const waUrl = buildWhatsAppUrl(details);
    const mailUrl = buildMailtoUrl(details);

    setSubmissionReady({ details, waUrl, mailUrl });

    // Open WhatsApp automatically on submission
    if (data.preferredContactMethod === 'Email') {
      window.open(mailUrl, '_blank');
    } else {
      window.open(waUrl, '_blank');
    }
  };

  const handleReset = () => {
    setSubmissionReady(null);
    reset();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ice-border shadow-luxury">
      {submissionReady ? (
        /* Transparent Static Submission State */
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-serif font-bold text-heading mb-2">
            Your Enquiry is Formatted & Ready
          </h3>

          <p className="text-body text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Because this is a static direct-to-concierge portal, please send the pre-filled message using your preferred channel below. Our private client desk will respond within 2 business hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={submissionReady.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Pre-Filled WhatsApp</span>
            </a>

            <a
              href={submissionReady.mailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-royal text-white font-semibold text-sm hover:bg-royal-dark transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Open in Email App</span>
            </a>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-muted hover:text-teal underline underline-offset-4"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        /* Active Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Vikram Singhania"
                {...register('fullName', { required: 'Please enter your full name' })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-ice-border focus:border-teal'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5">{errors.fullName.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Mobile Number *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[+]?[0-9\s-]{10,15}$/,
                    message: 'Please enter a valid phone number (10-15 digits)'
                  }
                })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50/20' : 'border-ice-border focus:border-teal'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="client@domain.com"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50/20' : 'border-ice-border focus:border-teal'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* Property Interest */}
            <div>
              <label htmlFor="propertyInterest" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Property / Project Interest
              </label>
              <select
                id="propertyInterest"
                {...register('propertyInterest')}
                className="w-full px-4 py-3 rounded-xl border border-ice-border focus:border-teal text-sm focus:outline-none bg-white"
              >
                <option value="">General Luxury Consultation</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.price})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Preferred Location */}
            <div>
              <label htmlFor="preferredLocation" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Preferred Location
              </label>
              <select
                id="preferredLocation"
                {...register('preferredLocation')}
                className="w-full px-4 py-3 rounded-xl border border-ice-border focus:border-teal text-sm focus:outline-none bg-white"
              >
                <option value="Any Prime Bengaluru Corridor">Any Prime Bengaluru Corridor</option>
                <option value="Koramangala / Indiranagar">Koramangala / Indiranagar</option>
                <option value="Whitefield / Outer Ring Road">Whitefield / Outer Ring Road</option>
                <option value="Hebbal / North Bengaluru Airport Corridor">Hebbal / North Airport Corridor</option>
                <option value="Lavelle Road / CBD Central">Lavelle Road / CBD Central</option>
                <option value="Sarjapur Plotted Enclave">Sarjapur Plotted Enclave</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budgetRange" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
                Investment Budget
              </label>
              <select
                id="budgetRange"
                {...register('budgetRange')}
                className="w-full px-4 py-3 rounded-xl border border-ice-border focus:border-teal text-sm focus:outline-none bg-white"
              >
                <option value="₹ 3 Cr – ₹ 5 Cr">₹ 3 Cr – ₹ 5 Cr</option>
                <option value="₹ 5 Cr – ₹ 10 Cr">₹ 5 Cr – ₹ 10 Cr</option>
                <option value="₹ 10 Cr – ₹ 20 Cr">₹ 10 Cr – ₹ 20 Cr</option>
                <option value="₹ 20 Cr+ (Signature Penthouse/Estate)">₹ 20 Cr+ (Signature Penthouse/Estate)</option>
              </select>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
              Preferred Contact Channel
            </label>
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="WhatsApp"
                  {...register('preferredContactMethod')}
                  className="accent-teal"
                  defaultChecked
                />
                <span>WhatsApp (Recommended for instant brochures)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Phone Call"
                  {...register('preferredContactMethod')}
                  className="accent-teal"
                />
                <span>Phone Call</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Email"
                  {...register('preferredContactMethod')}
                  className="accent-teal"
                />
                <span>Email Dossier</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-heading mb-2">
              Specific Requirements / Questions
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your desired move-in timeline, architectural preferences, or specific inquiries..."
              {...register('message')}
              className="w-full px-4 py-3 rounded-xl border border-ice-border focus:border-teal text-sm focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>Proceed with Private Enquiry</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-center text-muted">
            Your details are kept strictly confidential. By clicking proceed, you will be redirected to WhatsApp to dispatch your pre-formatted enquiry.
          </p>
        </form>
      )}
    </div>
  );
}
