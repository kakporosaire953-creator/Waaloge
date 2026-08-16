import React from 'react';
import { Review } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Star, GraduationCap, Quote } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, rating }) => {
  const { t } = useLanguage();

  if (reviews.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-500">
        {t('property_no_reviews')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-slate-900">
          {t('property_reviews_title')}
        </h4>
        <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400 font-medium">({reviews.length} avis d’étudiants)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{rev.authorName}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3 h-3 text-slate-400" />
                    <span>{rev.authorUniversity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(rev.rating) ? 'fill-amber-400 text-amber-500' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mt-2 italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
              <span>{rev.stayDuration}</span>
              <span>{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
