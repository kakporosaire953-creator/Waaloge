import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  quoteKey: 'testimonial_1_quote' | 'testimonial_2_quote' | 'testimonial_3_quote';
  authorKey: 'testimonial_1_author' | 'testimonial_2_author' | 'testimonial_3_author';
  studyKey: 'testimonial_1_study' | 'testimonial_2_study' | 'testimonial_3_study';
  rating: number;
  avatar: string;
  city: string;
}

export const TestimonialCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quoteKey: 'testimonial_1_quote',
      authorKey: 'testimonial_1_author',
      studyKey: 'testimonial_1_study',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
      city: 'Ouagadougou'
    },
    {
      id: '2',
      quoteKey: 'testimonial_2_quote',
      authorKey: 'testimonial_2_author',
      studyKey: 'testimonial_2_study',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
      city: 'Abomey-Calavi'
    },
    {
      id: '3',
      quoteKey: 'testimonial_3_quote',
      authorKey: 'testimonial_3_author',
      studyKey: 'testimonial_3_study',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80',
      city: 'Cotonou'
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <div className="relative bg-amber-50/50 rounded-3xl p-6 sm:p-10 border border-amber-100/80 shadow-md overflow-hidden">
      
      {/* Decorative quotes background icon */}
      <Quote className="absolute -top-4 -right-4 w-32 h-32 text-amber-200/40 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        
        {/* Rating stars */}
        <div className="flex items-center justify-center gap-1">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>

        {/* Animated Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed">
              "{t(current.quoteKey)}"
            </p>

            {/* Author details */}
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
              <img
                src={current.avatar}
                alt={t(current.authorKey)}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F59E0B]/50 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
                  <span>{t(current.authorKey)}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </h4>
                <p className="text-xs text-slate-500">
                  {t(current.studyKey)} • {current.city}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={prev}
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === index ? 'w-6 h-2 bg-[#F59E0B]' : 'w-2 h-2 bg-stone-300'
                }`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
