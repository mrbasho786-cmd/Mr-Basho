import {COMPANY_INFO, DESTINATIONS, SOCIAL_LINKS} from '../data/travelData';
import type {PageView} from './Navbar';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onPlanDestination: (destinationName: string) => void;
}

export function Footer({onNavigate, onPlanDestination}: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#050d1a] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <p className="font-display text-2xl font-bold tracking-wider text-white">
              {COMPANY_INFO.name}
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wide text-[#D4AF37]">
              {COMPANY_INFO.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Travel & Tourism Agency based in {COMPANY_INFO.location}. Led by {COMPANY_INFO.owner}.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(
                [
                  {id: 'home', label: 'Home'},
                  {id: 'destinations', label: 'Destinations'},
                  {id: 'packages', label: 'Tour Packages'},
                  {id: 'gallery', label: 'Photo Gallery'},
                  {id: 'contact', label: 'Contact & Booking'},
                ] as {id: PageView; label: string}[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-400 transition-colors hover:text-[#D4AF37] cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white uppercase">
              Top Destinations
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {DESTINATIONS.map((dest) => (
                <li key={dest.id}>
                  <button
                    type="button"
                    onClick={() => onPlanDestination(dest.name)}
                    className="text-left text-slate-400 transition-colors hover:text-[#D4AF37] cursor-pointer"
                  >
                    {dest.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Socials */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white uppercase">
              Direct Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400">Owner: </span>
                <span className="text-white">{COMPANY_INFO.owner}</span>
              </li>
              <li>
                <span className="text-slate-400">Phone: </span>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="text-white tabular-nums transition-colors hover:text-[#D4AF37]"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="text-slate-400">Email: </span>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="text-white transition-colors hover:text-[#D4AF37]"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="text-slate-400">{COMPANY_INFO.location}</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.handle}
                  className="text-xs font-medium text-slate-300 transition-colors hover:text-[#D4AF37]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p>
            {COMPANY_INFO.tagline} · {COMPANY_INFO.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
