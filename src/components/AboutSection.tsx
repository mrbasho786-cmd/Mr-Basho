import {COMPANY_INFO} from '../data/travelData';
import {ResilientImage} from './ResilientImage';

interface AboutSectionProps {
  onBookCustomTrip: () => void;
}

export function AboutSection({onBookCustomTrip}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="bg-[#F7F8FA] py-20 text-[#071324] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Editorial Photograph */}
          <div className="lg:col-span-6">
            <div className="h-full overflow-hidden rounded-sm border border-slate-200 bg-[#071324]">
              <ResilientImage
                src="/src/assets/images/khaplu_shigar_heritage_1795298205631.jpg"
                alt="Historic Balti timber and stone heritage palace nestled in Gilgit-Baltistan"
                fallbackLabel="Gilgit-Baltistan Heritage"
                className="h-72 w-full object-cover sm:h-96 lg:h-full"
              />
            </div>
          </div>

          {/* Narrative Content */}
          <div className="flex flex-col justify-between lg:col-span-6 lg:py-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
                About Our Agency
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#071324] text-balance sm:text-4xl lg:text-5xl">
                {COMPANY_INFO.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-[#8e6b13]">
                {COMPANY_INFO.tagline} <span aria-hidden="true">·</span> {COMPANY_INFO.location}
              </p>

              <p className="mt-6 text-base leading-relaxed text-slate-700">
                {COMPANY_INFO.about}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Led personally by <span className="font-semibold text-[#071324]">{COMPANY_INFO.owner}</span> in Gilgit-Baltistan, we connect domestic families, international explorers, honeymooners, and trekking groups with trusted local hospitality, vetted mountain transport, and authentic regional insight across the Karakoram, Himalaya, and Hindu Kush ranges.
              </p>
            </div>

            <div>
              {/* Clean Hairline Key Highlights Row */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-slate-200 py-5">
                <div>
                  <p className="font-display text-2xl font-bold text-[#071324] tabular-nums sm:text-3xl">
                    10
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    Signature Valleys & Passes
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#071324] tabular-nums sm:text-3xl">
                    8
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    Dedicated Travel Services
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#071324] sm:text-3xl">
                    Local
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    Gilgit-Baltistan Expertise
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onBookCustomTrip}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-[#071324] px-6 py-2.5 text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#D4AF37] hover:text-[#071324] cursor-pointer"
                >
                  PLAN A CUSTOM TOUR
                </button>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="text-xs font-semibold text-[#071324] underline decoration-[#D4AF37] underline-offset-4 hover:text-[#8e6b13]"
                >
                  Speak with {COMPANY_INFO.owner}: <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
