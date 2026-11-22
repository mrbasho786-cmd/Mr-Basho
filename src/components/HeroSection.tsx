import {motion} from 'motion/react';
import {Phone, Mail, MapPin, ArrowDown} from 'lucide-react';
import {COMPANY_INFO} from '../data/travelData';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onExploreDestinations: () => void;
  onBookTrip: () => void;
}

export function HeroSection({
  onExploreDestinations,
  onBookTrip,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden bg-[#071324] text-white">
      {/* Full-Bleed Background Image & Measured Contrast Scrim */}
      <div className="absolute inset-0">
        <ResilientImage
          src={COMPANY_INFO.heroImage}
          alt="Hunza Valley and Rakaposhi peaks at golden hour in Gilgit-Baltistan, Pakistan"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#071324]/75 via-[#071324]/45 to-[#071324]/92"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase sm:text-sm">
            {COMPANY_INFO.name} <span aria-hidden="true">·</span> {COMPANY_INFO.tagline}
          </p>

          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            EXPLORE THE BEAUTY OF NORTHERN PAKISTAN
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
            Discover breathtaking destinations, unforgettable adventures and extraordinary journeys with TRAVEL WITH JALAL.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreDestinations}
              className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-[#D4AF37] px-7 py-3 text-xs font-bold tracking-wider text-[#071324] transition-colors duration-200 hover:bg-[#e0bf4c] whitespace-nowrap shrink-0 cursor-pointer"
            >
              EXPLORE DESTINATIONS
            </button>

            <button
              type="button"
              onClick={onBookTrip}
              className="inline-flex min-h-[48px] items-center justify-center rounded-sm border border-white/60 bg-[#071324]/45 px-7 py-3 text-xs font-bold tracking-wider text-white backdrop-blur-sm transition-colors duration-200 hover:border-[#D4AF37] hover:bg-[#071324]/80 hover:text-[#D4AF37] whitespace-nowrap shrink-0 cursor-pointer"
            >
              BOOK YOUR TRIP
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Direct Info Strip (Non-Sticky, Integrated in Hero) */}
      <div className="relative z-10 border-t border-white/15 bg-[#071324]/75 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-4 text-xs text-slate-200 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{COMPANY_INFO.location}</span>
            </span>
            <a
              href={COMPANY_INFO.phoneHref}
              className="inline-flex items-center gap-2 tabular-nums transition-colors hover:text-[#D4AF37]"
            >
              <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
            <a
              href={COMPANY_INFO.emailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#D4AF37]"
            >
              <Mail className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          <a
            href="#about"
            className="hidden items-center gap-1.5 font-medium text-[#D4AF37] transition-colors hover:text-white md:inline-flex"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
