import {MessageCircle} from 'lucide-react';
import {COMPANY_INFO} from '../data/travelData';

export function WhatsAppFloat() {
  const defaultMessage = encodeURIComponent(
    `Hello ${COMPANY_INFO.name}, I would like to inquire about a tour package in Gilgit-Baltistan.`
  );
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Book or chat via WhatsApp on ${COMPANY_INFO.phoneDisplay}`}
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2.5 rounded-full border border-[#D4AF37]/60 bg-[#071324] px-4 text-xs font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:border-[#D4AF37] hover:bg-[#0d1f3a] sm:bottom-6 sm:right-6"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-[#071324]">
        <MessageCircle className="h-4 w-4 fill-current" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline whitespace-nowrap">
        WhatsApp · <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>
      </span>
    </a>
  );
}
