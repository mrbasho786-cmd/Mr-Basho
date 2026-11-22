import {useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {Navbar, type PageView} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {AboutSection} from './components/AboutSection';
import {ServicesSection} from './components/ServicesSection';
import {DestinationsSection} from './components/DestinationsSection';
import {PackagesSection} from './components/PackagesSection';
import {GallerySection} from './components/GallerySection';
import {TestimonialsSection} from './components/TestimonialsSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {WhatsAppFloat} from './components/WhatsAppFloat';
import {BookingModal} from './components/BookingModal';
import type {BookingPrefill} from './components/BookingForm';
import type {TourPackage} from './data/travelData';

function SubpageHeader({
  title,
  subtitle,
  onBackHome,
}: {
  title: string;
  subtitle: string;
  onBackHome: () => void;
}) {
  return (
    <div className="border-b border-white/10 bg-[#071324] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] transition-colors hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </button>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | null>(
    null
  );

  const navigateTo = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const openBookingWithPrefill = (prefill?: BookingPrefill) => {
    setBookingPrefill(prefill ?? null);
    setBookingModalOpen(true);
  };

  const handleSelectPackage = (pkg: TourPackage) => {
    openBookingWithPrefill({
      packageTitle: pkg.title,
      destinationName: pkg.destinations[0],
      serviceTitle: 'Customized Tour Packages',
    });
  };

  const handlePlanDestination = (destinationName: string) => {
    openBookingWithPrefill({
      destinationName,
      packageTitle: 'Customized Tour Package',
    });
  };

  const handleSelectService = (serviceTitle: string) => {
    openBookingWithPrefill({
      serviceTitle,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071324] text-slate-900">
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenBooking={() => openBookingWithPrefill()}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection
              onExploreDestinations={() => navigateTo('destinations')}
              onBookTrip={() => openBookingWithPrefill()}
            />
            <AboutSection onBookCustomTrip={() => openBookingWithPrefill()} />
            <ServicesSection onSelectService={handleSelectService} />
            <DestinationsSection
              onPlanDestination={handlePlanDestination}
              showAllByDefault={true}
            />
            <PackagesSection onSelectPackage={handleSelectPackage} />
            <GallerySection />
            <TestimonialsSection />
            <ContactSection prefill={bookingPrefill} />
          </>
        )}

        {activePage === 'destinations' && (
          <>
            <SubpageHeader
              title="Destinations in Gilgit-Baltistan"
              subtitle="Explore all 10 iconic valleys, glacial lakes, alpine plateaus, and mountain passes curated by TRAVEL WITH JALAL."
              onBackHome={() => navigateTo('home')}
            />
            <DestinationsSection
              onPlanDestination={handlePlanDestination}
              showAllByDefault={true}
            />
            <ContactSection prefill={bookingPrefill} />
          </>
        )}

        {activePage === 'packages' && (
          <>
            <SubpageHeader
              title="Tour Packages (PKR)"
              subtitle="Choose from luxury, adventure, family, and honeymoon itineraries across Northern Pakistan, or customize your own route."
              onBackHome={() => navigateTo('home')}
            />
            <PackagesSection onSelectPackage={handleSelectPackage} />
            <ServicesSection onSelectService={handleSelectService} />
          </>
        )}

        {activePage === 'gallery' && (
          <>
            <SubpageHeader
              title="Travel Photo Gallery"
              subtitle="Visual glimpses from Hunza Valley, Attabad Lake, Passu Cones, Skardu, Fairy Meadows, Deosai National Park, Naltar Valley, and Khaplu."
              onBackHome={() => navigateTo('home')}
            />
            <GallerySection />
            <TestimonialsSection />
          </>
        )}

        {activePage === 'contact' && (
          <>
            <SubpageHeader
              title="Contact Us & Trip Booking"
              subtitle="Reach TRAVEL WITH JALAL directly in Gilgit-Baltistan by phone, WhatsApp, email, or submit your custom booking inquiry below."
              onBackHome={() => navigateTo('home')}
            />
            <ContactSection prefill={bookingPrefill} />
          </>
        )}
      </main>

      <Footer
        onNavigate={navigateTo}
        onPlanDestination={handlePlanDestination}
      />

      <WhatsAppFloat />

      <BookingModal
        isOpen={bookingModalOpen}
        prefill={bookingPrefill}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
