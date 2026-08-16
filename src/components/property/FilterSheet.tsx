import React from 'react';
import { SearchFilters, CityId, PropertyType } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { NEIGHBORHOODS } from '../../data/neighborhoods';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

interface FilterSheetProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: Partial<SearchFilters>) => void;
  onReset: () => void;
  totalResults: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  isOpenMobile,
  onCloseMobile
}) => {
  const { t } = useLanguage();

  const cityNeighborhoods = NEIGHBORHOODS.filter(n => n.cityId === filters.city);

  const types: { id: PropertyType | 'all'; label: string }[] = [
    { id: 'all', label: t('search_all_types') },
    { id: 'studio', label: 'Studio indépendant' },
    { id: 'chambre', label: 'Chambre individuelle' },
    { id: 'colocation', label: 'Colocation' },
    { id: 'appartement', label: 'Appartement' }
  ];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-800" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('filters_title')}</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          {t('filters_reset')}
        </button>
      </div>

      {/* Neighborhood Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          {t('search_neighborhood')}
        </label>
        <select
          value={filters.neighborhood}
          onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">{t('search_all_neighborhoods')}</option>
          {cityNeighborhoods.map((n) => (
            <option key={n.id} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      {/* Housing Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          {t('filter_property_type')}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {types.map((type) => {
            const isSelected = filters.type === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onFilterChange({ type: type.id })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Max */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {t('search_max_budget')}
          </label>
          <span className="text-xs font-bold text-slate-900">
            {filters.maxPrice > 0 ? `${new Intl.NumberFormat('fr-FR').format(filters.maxPrice)} FCFA` : 'Sans limite'}
          </span>
        </div>
        <input
          type="range"
          min="30000"
          max="250000"
          step="5000"
          value={filters.maxPrice || 250000}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>30 000 F</span>
          <span>120 000 F</span>
          <span>250 000 F+</span>
        </div>
      </div>

      {/* Distance to Campus */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          {t('filter_distance')}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { value: 10, label: '< 10 min' },
            { value: 20, label: '< 20 min' },
            { value: 0, label: 'Toutes' }
          ].map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onFilterChange({ maxDistanceMinutes: d.value })}
              className={`py-2 px-2 text-center rounded-xl text-xs font-medium transition-all ${
                filters.maxDistanceMinutes === d.value
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          {t('sort_by')}
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="relevance">{t('sort_relevance')}</option>
          <option value="price_asc">{t('sort_price_asc')}</option>
          <option value="price_desc">{t('sort_price_desc')}</option>
          <option value="distance">{t('sort_distance')}</option>
          <option value="rating">{t('sort_rating')}</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Sticky Container */}
      <aside className="hidden lg:block bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs h-fit sticky top-20">
        {content}
      </aside>

      {/* Mobile Drawer / Bottom Sheet */}
      {isOpenMobile && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={onCloseMobile}
        >
          <div
            className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
            <div className="flex-1 overflow-y-auto pb-4">
              {content}
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={onCloseMobile}
              >
                Afficher {totalResults} logement{totalResults > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
