import {useState} from 'react';
import {Menu, X, Phone} from 'lucide-react';
import {COMPANY_INFO} from '../data/travelData';

export type PageView = 'home' | 'destinations' | 'packages' | 'gallery' | 'contact';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

const NAV_ITEMS: {id: PageView; label: string}[] = [
  {id: 'home', label: 'Home'},
  {id: 'destinations', label: 'Destinations'},
  {id: 'packages', label: 'Packages'},
  {id: 'gallery', label: 'Gallery'},
  {id: 'contact', label: 'Contact'},
];

export function Navbar({activePage, onNavigate, onOpenBooking}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (page: PageView) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071324]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:h-16 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-lg font-bold tracking-wider text-white transition-colors hover:text-[#D4AF37] sm:text-xl whitespace-nowrap shrink-0 cursor-pointer"
        >
          {COMPANY_INFO.name}
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#D4AF37]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-[#D4AF37] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA button + Mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-wide text-[#071324] transition-colors duration-200 hover:bg-[#e0bf4c] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Your Trip
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#071324] px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-sm px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-[#D4AF37]'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href={COMPANY_INFO.phoneHref}
              className="flex min-h-[44px] items-center gap-2.5 px-3 text-sm text-slate-200 hover:text-[#D4AF37]"
            >
              <Phone className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex min-h-[44px] w-full items-center justify-center rounded-sm bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-[#071324] transition-colors hover:bg-[#e0bf4c] cursor-pointer"
            >
              Book Your Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
