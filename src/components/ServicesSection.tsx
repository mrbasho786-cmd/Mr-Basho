import {ArrowRight} from 'lucide-react';
import {SERVICES} from '../data/travelData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({onSelectService}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="bg-[#071324] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Comprehensive Travel Support
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Our Services in Gilgit-Baltistan
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            From airport pickup to high-mountain expeditions, every detail is managed locally for comfort, safety, and authenticity.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group flex flex-col justify-between rounded-sm border border-white/12 bg-[#0d1f3a] p-6 transition-colors duration-200 hover:border-[#D4AF37]"
            >
              <div>
                <p className="font-mono text-xs font-semibold text-[#D4AF37] tabular-nums">
                  {service.number}.
                </p>
                <h3 className="font-display mt-3 text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {service.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(service.title)}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] transition-colors hover:text-white cursor-pointer"
              >
                <span>Inquire Now</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
