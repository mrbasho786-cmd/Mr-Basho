import {useState} from 'react';
import {ArrowUpRight, MapPin, X} from 'lucide-react';
import {DESTINATIONS, type Destination} from '../data/travelData';
import {ResilientImage} from './ResilientImage';

interface DestinationsSectionProps {
  onPlanDestination: (destinationName: string) => void;
  showAllByDefault?: boolean;
  onViewAllPage?: () => void;
}

type RegionFilter =
  | 'All'
  | 'Hunza & Upper Gojal'
  | 'Skardu & Baltistan'
  | 'Nanga Parbat & Gilgit';

const REGIONS: RegionFilter[] = [
  'All',
  'Hunza & Upper Gojal',
  'Skardu & Baltistan',
  'Nanga Parbat & Gilgit',
];

export function DestinationsSection({
  onPlanDestination,
  showAllByDefault = true,
  onViewAllPage,
}: DestinationsSectionProps) {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    null
  );

  const filtered =
    activeRegion === 'All'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === activeRegion);

  const displayed = showAllByDefault ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="destinations"
      className="bg-white py-20 text-[#071324] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
              Northern Pakistan Regions
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#071324] text-balance sm:text-4xl lg:text-5xl">
              Signature Destinations of Gilgit-Baltistan
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter destinations by region"
            className="flex flex-wrap gap-1.5 rounded-sm bg-slate-100 p-1"
          >
            {REGIONS.map((region) => {
              const isSelected = activeRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#071324] text-white'
                      : 'text-slate-600 hover:text-[#071324]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((dest, index) => {
            const isFeatured = activeRegion === 'All' && index === 0;
            return (
              <article
                key={dest.id}
                className={`group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-colors duration-200 hover:border-[#D4AF37] ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#071324] ${
                    isFeatured ? 'aspect-[16/9] lg:aspect-[21/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={dest.image}
                    alt={`${dest.name} in Gilgit-Baltistan, Pakistan`}
                    fallbackLabel={dest.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/75 via-[#071324]/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#D4AF37]">
                        {dest.region} <span aria-hidden="true">·</span>{' '}
                        <span className="tabular-nums">{dest.altitude}</span>
                      </p>
                      <h3 className="font-display mt-0.5 text-2xl font-bold text-white sm:text-3xl">
                        {dest.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Best Season: {dest.bestSeason}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {dest.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedDestination(dest)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#071324] transition-colors hover:text-[#8e6b13] whitespace-nowrap cursor-pointer"
                    >
                      <span>View Highlights</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onPlanDestination(dest.name)}
                      className="rounded-sm bg-[#071324] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#D4AF37] hover:text-[#071324] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Plan Trip
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!showAllByDefault && onViewAllPage && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onViewAllPage}
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-[#071324] px-7 py-3 text-xs font-semibold tracking-wider text-[#071324] transition-colors hover:bg-[#071324] hover:text-white cursor-pointer"
            >
              VIEW ALL 10 DESTINATIONS
            </button>
          </div>
        )}
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="destination-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d1a]/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#D4AF37]/30 bg-white text-[#071324] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-[#071324]">
              <ResilientImage
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                aria-label="Close destination details"
                onClick={() => setSelectedDestination(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-[#071324]/85 text-white transition-colors hover:bg-[#D4AF37] hover:text-[#071324] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8e6b13]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{selectedDestination.region}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{selectedDestination.altitude}</span>
                <span aria-hidden="true">·</span>
                <span>Best: {selectedDestination.bestSeason}</span>
              </div>

              <h3
                id="destination-modal-title"
                className="font-display mt-2 text-3xl font-bold text-[#071324]"
              >
                {selectedDestination.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {selectedDestination.summary}
              </p>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h4 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Key Highlights
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-[#071324]">
                  {selectedDestination.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDestination(null)}
                  className="min-h-[42px] rounded-sm border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700 hover:border-[#071324] hover:text-[#071324] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedDestination.name;
                    setSelectedDestination(null);
                    onPlanDestination(name);
                  }}
                  className="min-h-[42px] rounded-sm bg-[#D4AF37] px-6 py-2 text-xs font-semibold text-[#071324] hover:bg-[#e0bf4c] cursor-pointer"
                >
                  Book Trip to {selectedDestination.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
