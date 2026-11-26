import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  Building2,
  Send,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import { buildWhatsAppUrl, buildMailtoUrl } from '../../utils/whatsapp';

/**
 * HeroEnquiryForm
 * Floating Glassmorphic Lead Generation Form for Aurelia Estates Hero
 * - Card styling: frosted white (bg-white/80), backdrop-blur-xl, border-white/40, rounded-3xl
 * - Nested Framer Motion: entrance fade-in (outer) + gentle vertical float (inner)
 * - Auto-pauses float on hover or focus-within; respects prefers-reduced-motion
 * - Reuses existing WhatsApp & Mailto concierge dispatch architecture
 */
export default function HeroEnquiryForm() {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  // Responsive check for mobile to disable floating motion
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Float pause state for hover or focus-within
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);

  // Form field states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedIn: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return null;
      case 'phone': {
        if (!value.trim()) return 'Mobile number is required';
        // Match Indian 10-digit mobile number, with optional +91 or 0 prefix
        const cleanPhone = value.replace(/[\s-]/g, '');
        const phoneRegex = /^(?:(?:\+|0{0,2})91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(cleanPhone)) {
          return 'Enter a valid 10-digit mobile number (starts with 6-9)';
        }
        return null;
      }
      case 'email':
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            return 'Please enter a valid email address';
          }
        }
        return null;
      case 'interestedIn':
        if (!value) return 'Please select a property category';
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field on change if valid
    if (errors[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (!errorMsg) delete next[name];
        else next[name] = errorMsg;
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const nameErr = validateField('fullName', formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const interestErr = validateField('interestedIn', formData.interestedIn);
    if (interestErr) newErrors.interestedIn = interestErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first errored field without scroll jump
      const firstErrorField = Object.keys(newErrors)[0];
      const elem = document.querySelector(`[name="${firstErrorField}"]`);
      if (elem && typeof elem.focus === 'function') {
        elem.focus({ preventScroll: true });
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Build dispatch details matching existing enquiry architecture
      const details = {
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        propertyInterest: formData.interestedIn,
        message: formData.requirements.trim()
      };

      const waUrl = buildWhatsAppUrl(details);
      const mailUrl = buildMailtoUrl(details);

      // Open WhatsApp concierge automatically
      window.open(waUrl, '_blank');

      // Set confirmed success state with direct channel actions
      setSubmissionResult({
        details,
        waUrl,
        mailUrl
      });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      interestedIn: '',
      requirements: ''
    });
    setErrors({});
    setSubmissionResult(null);
  };

  // Determine if float animation should be active
  const canFloat = !shouldReduceMotion && !isMobile && !isHoveredOrFocused;

  return (
    /* OUTER WRAPPER: Entrance animation (fade & slide up) */
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay: shouldReduceMotion ? 0 : 0.3
      }}
      className="w-full max-w-[420px] mx-auto lg:mx-0"
    >
      {/* INNER WRAPPER: Subtle float animation (y: 0 -> -5px -> 0) */}
      <motion.div
        ref={cardRef}
        animate={canFloat ? { y: [0, -5, 0] } : { y: 0 }}
        transition={
          canFloat
            ? {
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            : {
                duration: 0.3,
                ease: 'easeOut'
              }
        }
        onMouseEnter={() => setIsHoveredOrFocused(true)}
        onMouseLeave={() => {
          if (!cardRef.current?.contains(document.activeElement)) {
            setIsHoveredOrFocused(false);
          }
        }}
        onFocus={() => setIsHoveredOrFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsHoveredOrFocused(false);
          }
        }}
        className="
          relative isolate overflow-hidden
          w-full rounded-3xl
          bg-white/80 backdrop-blur-xl
          border border-white/40
          p-5 sm:p-6
          shadow-[0_20px_50px_rgba(11,37,64,0.22)]
          text-darkheading
          transition-colors duration-300
        "
      >
        {submissionResult ? (
          /* ================= SUCCESS CONFIRMATION STATE ================= */
          <div className="text-center py-4 sm:py-6 animate-in fade-in duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal/15 text-teal flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-teal" />
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-darkheading mb-1.5 leading-snug">
              Enquiry Formatted & Ready
            </h3>

            <p className="text-bodytext text-xs sm:text-[13px] leading-relaxed mb-5 max-w-xs mx-auto">
              Your details have been pre-filled for our private client desk. You can send directly via WhatsApp or Email:
            </p>

            <div className="flex flex-col gap-2.5 mb-5">
              <a
                href={submissionResult.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>

              <a
                href={submissionResult.mailUrl}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-royal hover:bg-royal-dark text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                <Mail className="w-4 h-4" />
                <span>Send via Email</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-mutedtext hover:text-teal transition-colors underline underline-offset-4"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Enquiry</span>
            </button>
          </div>
        ) : (
          /* ================= ACTIVE ENQUIRY FORM ================= */
          <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
            {/* Header */}
            <div className="mb-1 sm:mb-2 text-left">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-royal-deep tracking-tight leading-tight">
                Find Your Dream Property
              </h3>
              <p className="text-bodytext text-xs leading-relaxed mt-1">
                Share your requirements. Our property experts will get in touch with you.
              </p>
            </div>

            {/* General form error if any */}
            {errors.form && (
              <div
                role="alert"
                aria-live="polite"
                className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs"
              >
                {errors.form}
              </div>
            )}

            {/* Field 1: Full Name */}
            <div>
              <label htmlFor="hero-fullName" className="sr-only">
                Full Name (Required)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-royal/60">
                  <User className="w-4 h-4" aria-hidden="true" />
                </span>
                <input
                  id="hero-fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'hero-fullName-error' : undefined}
                  className={`
                    w-full h-11 pl-10 pr-3.5 rounded-xl text-base sm:text-sm text-darkheading font-medium
                    bg-white/60 placeholder:text-slate-500
                    border ${errors.fullName ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-ice-border hover:border-teal/50 focus:border-teal focus:ring-teal/20'}
                    focus:outline-none focus:ring-2 focus:bg-white transition-all
                  `}
                />
              </div>
              {errors.fullName && (
                <p id="hero-fullName-error" role="alert" className="text-rose-600 text-[11px] mt-1 pl-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label htmlFor="hero-phone" className="sr-only">
                Mobile Number (Required)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-royal/60">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </span>
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="Mobile Number (10 Digits) *"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'hero-phone-error' : undefined}
                  className={`
                    w-full h-11 pl-10 pr-3.5 rounded-xl text-base sm:text-sm text-darkheading font-medium
                    bg-white/60 placeholder:text-slate-500
                    border ${errors.phone ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-ice-border hover:border-teal/50 focus:border-teal focus:ring-teal/20'}
                    focus:outline-none focus:ring-2 focus:bg-white transition-all
                  `}
                />
              </div>
              {errors.phone && (
                <p id="hero-phone-error" role="alert" className="text-rose-600 text-[11px] mt-1 pl-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Field 3: Email Address */}
            <div>
              <label htmlFor="hero-email" className="sr-only">
                Email Address (Optional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-royal/60">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </span>
                <input
                  id="hero-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'hero-email-error' : undefined}
                  className={`
                    w-full h-11 pl-10 pr-3.5 rounded-xl text-base sm:text-sm text-darkheading font-medium
                    bg-white/60 placeholder:text-slate-500
                    border ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-ice-border hover:border-teal/50 focus:border-teal focus:ring-teal/20'}
                    focus:outline-none focus:ring-2 focus:bg-white transition-all
                  `}
                />
              </div>
              {errors.email && (
                <p id="hero-email-error" role="alert" className="text-rose-600 text-[11px] mt-1 pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Field 4: Interested In (Select) */}
            <div>
              <label htmlFor="hero-interestedIn" className="sr-only">
                Interested In (Required)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-royal/60">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                </span>
                <select
                  id="hero-interestedIn"
                  name="interestedIn"
                  required
                  value={formData.interestedIn}
                  onChange={handleChange}
                  aria-invalid={!!errors.interestedIn}
                  aria-describedby={errors.interestedIn ? 'hero-interestedIn-error' : undefined}
                  className={`
                    w-full h-11 pl-10 pr-8 rounded-xl text-base sm:text-sm text-darkheading font-medium
                    bg-white/60 appearance-none cursor-pointer
                    border ${errors.interestedIn ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-ice-border hover:border-teal/50 focus:border-teal focus:ring-teal/20'}
                    focus:outline-none focus:ring-2 focus:bg-white transition-all
                  `}
                >
                  <option value="" disabled className="text-slate-400">
                    Interested In *
                  </option>
                  <option value="Residential Property">Residential Property</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Land / Plot">Land / Plot</option>
                  <option value="Other">Other</option>
                </select>
                {/* Custom dropdown chevron */}
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-royal/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.interestedIn && (
                <p id="hero-interestedIn-error" role="alert" className="text-rose-600 text-[11px] mt-1 pl-1">
                  {errors.interestedIn}
                </p>
              )}
            </div>

            {/* Field 5: Your Requirements (Textarea, max 2 rows, non-resizable) */}
            <div>
              <label htmlFor="hero-requirements" className="sr-only">
                Your Requirements (Optional)
              </label>
              <textarea
                id="hero-requirements"
                name="requirements"
                rows={2}
                placeholder="Your Requirements (e.g. 4 BHK, Hebbal, Budget)"
                value={formData.requirements}
                onChange={handleChange}
                className="
                  w-full px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-darkheading font-medium
                  bg-white/60 placeholder:text-slate-500 resize-none
                  border border-ice-border hover:border-teal/50
                  focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none focus:bg-white
                  transition-all
                "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full h-11 sm:h-11 mt-1
                inline-flex items-center justify-center gap-2
                rounded-xl bg-teal hover:bg-teal-hover active:bg-teal-dark
                text-white font-semibold text-xs sm:text-sm tracking-wide
                shadow-md shadow-teal/25 hover:shadow-lg hover:shadow-teal/30
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2
                transition-all duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            {/* Security Assurance */}
            <div className="flex items-center justify-center gap-1.5 pt-1 text-mutedtext text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0" />
              <span>Your information is safe and secure.</span>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
