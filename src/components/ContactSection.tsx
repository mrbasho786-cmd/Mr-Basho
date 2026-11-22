import {Phone, Mail, MapPin, User, MessageCircle} from 'lucide-react';
import {COMPANY_INFO, SOCIAL_LINKS} from '../data/travelData';
import {BookingForm, type BookingPrefill} from './BookingForm';

interface ContactSectionProps {
  prefill?: BookingPrefill | null;
}

export function ContactSection({prefill}: ContactSectionProps) {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${COMPANY_INFO.name}, I would like to plan a trip to Gilgit-Baltistan.`
  )}`;

  return (
    <section
      id="contact"
      className="bg-[#071324] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Business Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Direct Concierge & Reservations
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Plan Your Journey With {COMPANY_INFO.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Speak directly with our local team in Gilgit-Baltistan to customize routes, reserve scenic hotels, or arrange private transport and airport transfers.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/30 bg-[#0d1f3a] text-[#D4AF37]">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Agency & Owner
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {COMPANY_INFO.name} · Owner: {COMPANY_INFO.owner}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/30 bg-[#0d1f3a] text-[#D4AF37]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Clickable Phone & WhatsApp
                  </p>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="mt-0.5 inline-block text-base font-semibold text-white tabular-nums transition-colors hover:text-[#D4AF37]"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/30 bg-[#0d1f3a] text-[#D4AF37]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Direct Email
                  </p>
                  <a
                    href={COMPANY_INFO.emailHref}
                    className="mt-0.5 inline-block text-sm font-semibold text-white transition-colors hover:text-[#D4AF37]"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/30 bg-[#0d1f3a] text-[#D4AF37]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Location
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {COMPANY_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-[#071324] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#D4AF37] px-5 py-2.5 text-xs font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#071324]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call Now</span>
              </a>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Follow Us
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.handle}
                    className="text-xs font-semibold text-slate-200 underline decoration-[#D4AF37]/50 underline-offset-4 transition-colors hover:text-[#D4AF37]"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Functional Booking Form */}
          <div className="rounded-sm border border-white/12 bg-white p-6 text-[#071324] shadow-xl sm:p-8 lg:col-span-7">
            <div className="border-b border-slate-200 pb-5">
              <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
                Reservation & Custom Quote
              </p>
              <h3 className="font-display mt-1 text-2xl font-bold text-[#071324] sm:text-3xl">
                Book Your Northern Pakistan Trip
              </h3>
            </div>
            <div className="mt-6">
              <BookingForm prefill={prefill} variant="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
