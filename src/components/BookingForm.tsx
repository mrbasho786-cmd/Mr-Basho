import {useState, useEffect, type FormEvent} from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Mail,
  Calendar,
  Users,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  COMPANY_INFO,
  DESTINATIONS,
  SERVICES,
  TOUR_PACKAGES,
  formatPkr,
} from '../data/travelData';
import {supabase} from '../lib/supabase';

export interface BookingPrefill {
  packageTitle?: string;
  destinationName?: string;
  serviceTitle?: string;
}

interface BookingFormProps {
  prefill?: BookingPrefill | null;
  variant?: 'light' | 'dark';
  onSuccess?: () => void;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  travelDate?: string;
}

export function BookingForm({
  prefill,
  variant = 'light',
  onSuccess,
}: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(
    prefill?.packageTitle || 'Customized Tour Package'
  );
  const [selectedDestination, setSelectedDestination] = useState(
    prefill?.destinationName || 'Hunza Valley'
  );
  const [selectedService, setSelectedService] = useState(
    prefill?.serviceTitle || 'Customized Tour Packages'
  );
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (prefill?.packageTitle) {
      setSelectedPackage(prefill.packageTitle);
    }
    if (prefill?.destinationName) {
      setSelectedDestination(prefill.destinationName);
    }
    if (prefill?.serviceTitle) {
      setSelectedService(prefill.serviceTitle);
    }
  }, [prefill]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || !/^\+?\d{10,15}$/.test(cleanPhone)) {
      nextErrors.phone =
        'Enter a valid phone or WhatsApp number (10–15 digits).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!travelDate) {
      nextErrors.travelDate = 'Please select your preferred departure date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const refCode = `TWJ-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSubmitting(true);

    try {
      const parsedTravelers = Math.min(
        40,
        Math.max(1, Number.parseInt(travelers, 10) || 1)
      );

      const {error} = await supabase.from('bookings').insert([
        {
          reference_code: refCode,
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          tour_package: selectedPackage,
          destination: selectedDestination,
          service: selectedService,
          travel_date: travelDate,
          travelers: parsedTravelers,
          notes: notes.trim() || null,
        },
      ]);

      if (error) {
        if (
          error.code === 'PGRST205' ||
          error.message.includes('schema cache')
        ) {
          setSubmitError(
            "Database table 'public.bookings' was not found in Supabase yet. Please run the SQL setup script in your Supabase SQL Editor first."
          );
        } else {
          setSubmitError(`Could not save booking: ${error.message}`);
        }
        return;
      }

      setSubmittedRef(refCode);
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? `Network error while saving booking: ${err.message}`
          : 'Unexpected error while saving booking.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildSummaryText = () => {
    return [
      `Booking Inquiry (${submittedRef || 'New'}) - ${COMPANY_INFO.name}`,
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Package: ${selectedPackage}`,
      `Destination: ${selectedDestination}`,
      `Service: ${selectedService}`,
      `Preferred Date: ${travelDate}`,
      `Travelers: ${travelers}`,
      notes.trim() ? `Notes: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const isDark = variant === 'dark';
  const labelClass = `block text-xs font-semibold tracking-wide mb-1.5 ${
    isDark ? 'text-slate-200' : 'text-[#071324]'
  }`;
  const inputClass = `w-full rounded-sm border px-3.5 py-2.5 text-sm transition-colors ${
    isDark
      ? 'border-white/15 bg-[#0d1f3a] text-white placeholder:text-slate-400 focus:border-[#D4AF37]'
      : 'border-slate-300 bg-white text-[#071324] placeholder:text-slate-400 focus:border-[#071324]'
  }`;

  const whatsappHref = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    buildSummaryText()
  )}`;
  const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Tour Booking Inquiry (${submittedRef || 'Direct'}) - ${fullName}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  if (submittedRef) {
    return (
      <div
        className={`rounded-sm border p-6 sm:p-8 ${
          isDark
            ? 'border-[#D4AF37]/40 bg-[#0d1f3a] text-white'
            : 'border-slate-200 bg-white text-[#071324]'
        }`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[#D4AF37]"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8e6b13] dark:text-[#D4AF37]">
              Booking Saved · Ref <span className="tabular-nums">{submittedRef}</span>
            </p>
            <h3 className="font-display mt-1 text-2xl font-bold">
              Thank you, {fullName}
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Your booking inquiry for{' '}
              <span className="font-semibold">{selectedDestination}</span> (
              {selectedPackage}) for{' '}
              <span className="tabular-nums font-semibold">{travelers}</span>{' '}
              traveler(s) starting{' '}
              <span className="tabular-nums font-semibold">{travelDate}</span>{' '}
              has been stored in our reservation database. You can also message
              Jalal directly below for faster confirmation.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#071324] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Message on WhatsApp</span>
          </a>
          <a
            href={mailtoHref}
            className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-semibold transition-colors ${
              isDark
                ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#071324]'
                : 'border-[#071324] text-[#071324] hover:bg-[#071324] hover:text-white'
            }`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Send Copy via Email</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setSubmittedRef(null)}
          className={`mt-5 text-xs font-semibold underline underline-offset-4 cursor-pointer ${
            isDark
              ? 'text-slate-300 hover:text-white'
              : 'text-slate-600 hover:text-[#071324]'
          }`}
        >
          Submit another booking inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`booking-name-${variant}`} className={labelClass}>
            Full Name *
          </label>
          <input
            id={`booking-name-${variant}`}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className={inputClass}
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-xs font-medium text-rose-500">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`booking-phone-${variant}`} className={labelClass}>
            Phone / WhatsApp *
          </label>
          <input
            id={`booking-phone-${variant}`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03XX XXXXXXX"
            className={inputClass}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-medium text-rose-500">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`booking-email-${variant}`} className={labelClass}>
            Email Address *
          </label>
          <input
            id={`booking-email-${variant}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-rose-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`booking-package-${variant}`} className={labelClass}>
            Tour Package
          </label>
          <select
            id={`booking-package-${variant}`}
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className={inputClass}
          >
            <option value="Customized Tour Package">
              Customized Tour Package
            </option>
            {TOUR_PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.title}>
                {pkg.title} ({formatPkr(pkg.pricePkr)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`booking-destination-${variant}`}
            className={labelClass}
          >
            Primary Destination
          </label>
          <select
            id={`booking-destination-${variant}`}
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className={inputClass}
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.name}>
                {dest.name}
              </option>
            ))}
            <option value="Full Gilgit-Baltistan Circuit">
              Full Gilgit-Baltistan Circuit
            </option>
          </select>
        </div>

        <div>
          <label htmlFor={`booking-service-${variant}`} className={labelClass}>
            Service Required
          </label>
          <select
            id={`booking-service-${variant}`}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className={inputClass}
          >
            {SERVICES.map((srv) => (
              <option key={srv.number} value={srv.title}>
                {srv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`booking-date-${variant}`} className={labelClass}>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              Preferred Start Date *
            </span>
          </label>
          <input
            id={`booking-date-${variant}`}
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className={inputClass}
            required
          />
          {errors.travelDate && (
            <p className="mt-1 text-xs font-medium text-rose-500">
              {errors.travelDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`booking-travelers-${variant}`}
            className={labelClass}
          >
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              Number of Travelers
            </span>
          </label>
          <input
            id={`booking-travelers-${variant}`}
            type="number"
            min={1}
            max={40}
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className={`${inputClass} tabular-nums`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`booking-notes-${variant}`} className={labelClass}>
          Custom Preferences or Hotel / Transport Notes
        </label>
        <textarea
          id={`booking-notes-${variant}`}
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us about airport pickup, preferred hotel category, or destinations to combine..."
          className={inputClass}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-sm border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-800"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <div>
              <p className="font-semibold">{submitError}</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block font-semibold text-[#071324] underline underline-offset-2"
              >
                Send this inquiry directly on WhatsApp instead
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-3 text-sm font-semibold tracking-wide text-[#071324] transition-colors duration-200 hover:bg-[#e0bf4c] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        <span>
          {isSubmitting ? 'Saving Booking...' : 'Submit Trip Booking Request'}
        </span>
      </button>
    </form>
  );
}
