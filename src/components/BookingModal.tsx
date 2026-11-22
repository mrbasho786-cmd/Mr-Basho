import {useEffect} from 'react';
import {X} from 'lucide-react';
import {COMPANY_INFO} from '../data/travelData';
import {BookingForm, type BookingPrefill} from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  prefill: BookingPrefill | null;
  onClose: () => void;
}

export function BookingModal({isOpen, prefill, onClose}: BookingModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d1a]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#D4AF37]/40 bg-white p-6 text-[#071324] shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
              {COMPANY_INFO.name}
            </p>
            <h2
              id="booking-modal-heading"
              className="font-display mt-1 text-2xl font-bold text-[#071324] sm:text-3xl"
            >
              Book Your Trip to Northern Pakistan
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close booking form"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-slate-200 text-slate-600 transition-colors hover:border-[#071324] hover:text-[#071324] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <BookingForm prefill={prefill} variant="light" />
        </div>
      </div>
    </div>
  );
}
