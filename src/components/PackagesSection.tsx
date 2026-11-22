import {useState} from 'react';
import {Check} from 'lucide-react';
import {TOUR_PACKAGES, formatPkr, type TourPackage} from '../data/travelData';
import {ResilientImage} from './ResilientImage';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
}

type PackageCategory = 'All' | 'Luxury' | 'Adventure' | 'Family' | 'Honeymoon';

const CATEGORIES: PackageCategory[] = [
  'All',
  'Luxury',
  'Adventure',
  'Family',
  'Honeymoon',
];

export function PackagesSection({onSelectPackage}: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('All');

  const filtered =
    activeCategory === 'All'
      ? TOUR_PACKAGES
      : TOUR_PACKAGES.filter((pkg) => pkg.category === activeCategory);

  return (
    <section
      id="packages"
      className="bg-[#F7F8FA] py-20 text-[#071324] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
              Curated Journeys in PKR
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#071324] text-balance sm:text-4xl lg:text-5xl">
              Tour Packages Across Northern Pakistan
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Transparent pricing in Pakistani Rupees. Every itinerary can be customized for private families, couples, or group expeditions.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter tour packages by category"
            className="flex flex-wrap gap-1.5 rounded-sm bg-slate-200/75 p-1"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#071324] text-white'
                      : 'text-slate-700 hover:text-[#071324]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => (
            <article
              key={pkg.id}
              className="group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-colors duration-200 hover:border-[#D4AF37]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#071324]">
                <ResilientImage
                  src={pkg.image}
                  alt={pkg.title}
                  fallbackLabel={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-5 right-5 flex items-center justify-between text-xs font-medium text-white">
                  <span>{pkg.category}</span>
                  <span className="tabular-nums text-[#D4AF37]">{pkg.duration}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-2xl font-bold leading-snug text-[#071324]">
                    {pkg.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {pkg.destinations.join(' · ')}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-700">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#8e6b13]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Starting From · {pkg.priceUnit}
                    </p>
                    <p className="mt-0.5 text-xl font-bold tracking-tight text-[#071324] tabular-nums">
                      {formatPkr(pkg.pricePkr)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="min-h-[42px] rounded-sm bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#071324] transition-colors hover:bg-[#e0bf4c] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book Package
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
