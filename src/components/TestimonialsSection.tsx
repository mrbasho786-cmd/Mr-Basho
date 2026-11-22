import {useState, useEffect, type FormEvent} from 'react';
import {Quote, Plus, Loader2} from 'lucide-react';
import {
  PLACEHOLDER_TESTIMONIALS,
  DESTINATIONS,
  type TestimonialItem,
} from '../data/travelData';
import {supabase} from '../lib/supabase';

interface SupabaseTestimonialRow {
  id: string;
  author: string;
  trip_route: string;
  quote: string;
  created_at: string;
}

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<TestimonialItem[]>(
    PLACEHOLDER_TESTIMONIALS
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [tripRoute, setTripRoute] = useState(DESTINATIONS[0].name);
  const [quote, setQuote] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadTestimonials() {
      const {data, error} = await supabase
        .from('testimonials')
        .select('id, author, trip_route, quote, created_at')
        .order('created_at', {ascending: false});

      if (!active || error || !data || data.length === 0) return;

      const mapped: TestimonialItem[] = (
        data as SupabaseTestimonialRow[]
      ).map((row) => ({
        id: row.id,
        author: row.author,
        tripRoute: row.trip_route,
        dateLabel: new Date(row.created_at).toLocaleDateString('en-PK', {
          month: 'short',
          year: 'numeric',
        }),
        quote: row.quote,
        isPlaceholder: false,
      }));

      setReviews(mapped);
    }

    loadTestimonials();
    return () => {
      active = false;
    };
  }, []);

  const handleAddReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      setFormError('Please provide both your name and your travel experience.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const {error} = await supabase.from('testimonials').insert([
        {
          author: author.trim(),
          trip_route: tripRoute,
          quote: quote.trim(),
        },
      ]);

      if (error) {
        if (
          error.code === 'PGRST205' ||
          error.message.includes('schema cache')
        ) {
          setFormError(
            "Database table 'public.testimonials' is not created yet in Supabase. Please run supabase/schema.sql in your Supabase SQL Editor."
          );
        } else {
          setFormError(`Could not save review: ${error.message}`);
        }
        return;
      }

      const newItem: TestimonialItem = {
        id: `user-review-${Date.now()}`,
        author: author.trim(),
        tripRoute,
        dateLabel: new Date().toLocaleDateString('en-PK', {
          month: 'short',
          year: 'numeric',
        }),
        quote: quote.trim(),
        isPlaceholder: false,
      };

      setReviews((prev) => [
        newItem,
        ...prev.filter((item) => !item.isPlaceholder),
      ]);
      setAuthor('');
      setQuote('');
      setShowAddForm(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? `Network error while saving review: ${err.message}`
          : 'Unexpected error while saving review.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-white py-20 text-[#071324] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#8e6b13] uppercase">
              Traveler Stories
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#071324] text-balance sm:text-4xl lg:text-5xl">
              Customer Testimonials
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Placeholder review slots are shown until verified guest feedback is submitted and stored in our database.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-sm border border-[#071324] px-4 py-2 text-xs font-semibold text-[#071324] transition-colors hover:bg-[#071324] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{showAddForm ? 'Close Review Form' : 'Share Your Experience'}</span>
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddReview}
            className="mt-8 rounded-sm border border-slate-200 bg-[#F7F8FA] p-6"
          >
            <h3 className="font-display text-2xl font-bold text-[#071324]">
              Submit Your Trip Feedback
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="review-author"
                  className="mb-1.5 block text-xs font-semibold text-[#071324]"
                >
                  Your Name *
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#071324] focus:border-[#071324]"
                />
              </div>
              <div>
                <label
                  htmlFor="review-route"
                  className="mb-1.5 block text-xs font-semibold text-[#071324]"
                >
                  Destination Visited
                </label>
                <select
                  id="review-route"
                  value={tripRoute}
                  onChange={(e) => setTripRoute(e.target.value)}
                  className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#071324] focus:border-[#071324]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="review-quote"
                className="mb-1.5 block text-xs font-semibold text-[#071324]"
              >
                Your Experience *
              </label>
              <textarea
                id="review-quote"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Share your thoughts on your tour with TRAVEL WITH JALAL..."
                className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#071324] focus:border-[#071324]"
              />
            </div>
            {formError && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                {formError}
              </p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-2 text-xs font-semibold text-[#071324] hover:bg-[#e0bf4c] disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                )}
                <span>{isSubmitting ? 'Saving...' : 'Publish Feedback'}</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-sm border border-slate-200 bg-[#F7F8FA] p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <Quote
                    className="h-5 w-5 text-[#8e6b13]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-slate-500">
                    {item.dateLabel}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {item.quote}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-sm font-semibold text-[#071324]">
                  {item.author}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{item.tripRoute}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
