import {useState, useEffect} from 'react';
import {ChevronLeft, ChevronRight, X, Maximize2} from 'lucide-react';
import {GALLERY_PHOTOS, type GalleryPhoto} from '../data/travelData';
import {ResilientImage} from './ResilientImage';

type GalleryCategory =
  | 'All'
  | 'Hunza & Gojal'
  | 'Skardu & Baltistan'
  | 'Alpine Peaks';

const GALLERY_FILTERS: GalleryCategory[] = [
  'All',
  'Hunza & Gojal',
  'Skardu & Baltistan',
  'Alpine Peaks',
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos: GalleryPhoto[] =
    activeFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, visiblePhotos.length]);

  const activePhoto =
    lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="bg-[#071324] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Travel Photo Gallery
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Landscapes of Gilgit-Baltistan
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter photo gallery"
            className="flex flex-wrap gap-1.5 rounded-sm bg-[#0d1f3a] p-1"
          >
            {GALLERY_FILTERS.map((cat) => {
              const isSelected = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveFilter(cat);
                    setLightboxIndex(null);
                  }}
                  className={`rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#071324]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-[#0d1f3a] text-left transition-colors hover:border-[#D4AF37] cursor-pointer"
            >
              <ResilientImage
                src={photo.image}
                alt={`${photo.title} — ${photo.location}`}
                fallbackLabel={photo.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/85 via-[#071324]/20 to-transparent" />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-sm bg-[#071324]/75 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <Maximize2 className="h-4 w-4 text-[#D4AF37]" />
              </span>
              <div className="absolute bottom-3.5 left-4 right-4">
                <p className="text-[11px] font-medium text-[#D4AF37]">
                  {photo.location}
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-white">
                  {photo.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d1a]/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-white/15 bg-[#071324]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <ResilientImage
                src={activePhoto.image}
                alt={activePhoto.title}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                aria-label="Close photo preview"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-sm bg-[#071324]/85 text-white hover:bg-[#D4AF37] hover:text-[#071324] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex! - 1 + visiblePhotos.length) %
                          visiblePhotos.length
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-[#071324]/80 text-white hover:bg-[#D4AF37] hover:text-[#071324] cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex! + 1) % visiblePhotos.length)
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-[#071324]/80 text-white hover:bg-[#D4AF37] hover:text-[#071324] cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-white/10 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-medium text-[#D4AF37]">
                  {activePhoto.location}
                </p>
                <h3 className="font-display mt-0.5 text-2xl font-bold text-white">
                  {activePhoto.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{activePhoto.caption}</p>
              </div>
              <p className="text-xs font-medium text-slate-400 tabular-nums shrink-0">
                {(lightboxIndex ?? 0) + 1} / {visiblePhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
