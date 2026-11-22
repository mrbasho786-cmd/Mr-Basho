import {useState} from 'react';
import {Mountain} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#071324] via-[#0d1f3a] to-[#162e52] p-6 text-center ${className}`}
      >
        <Mountain className="h-9 w-9 text-[#D4AF37]/80" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium text-white/90">
          {fallbackLabel || alt}
        </p>
        <span className="mt-1 text-xs text-white/60">
          Gilgit-Baltistan, Pakistan
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
