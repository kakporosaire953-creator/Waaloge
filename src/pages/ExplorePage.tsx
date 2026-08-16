import React, { useState } from 'react';
import { Property, SearchFilters, CityId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { FilterSheet } from '../components/property/FilterSheet';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  RotateCcw, 
  Sparkles,
  Building2,
  HelpCircle
} from 'lucide-react';

interface ExplorePageProps {
  properties: Property[];
  filters: SearchFilters;
  onFilterChange: (newFilters: Partial<SearchFilters>) => void;
  onResetFilters: () => void;
  onSelectProperty: (id: string) => void;
  onOpenBooking: (property: Property) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectProperty,
  onOpenBooking
}) => {
  const { t } = useLanguage();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters
  const filteredProperties = properties.filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.nearestUniversity.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.neighborhood && filters.neighborhood !== 'all') {
      if (p.neighborhood.toLowerCase() !== filters.neighborhood.toLowerCase()) return false;
    }
    if (filters.type && filters.type !== 'all') {
      if (p.type !== filters.type) return false;
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
      if (p.price > filters.maxPrice) return false;
    }
    if (filters.minPrice && filters.minPrice > 0) {
      if (p.price < filters.minPrice) return false;
    }
    if (filters.maxDistanceMinutes && filters.maxDistanceMinutes > 0) {
      if (p.campusMinutesWalk > filters.maxDistanceMinutes) return false;
    }
    return true;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'distance') return a.campusMinutesWalk - b.campusMinutesWalk;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0; // relevance / default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20">
      {/* Top Search Bar & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange({ query: e.target.value })}
            placeholder={t('hero_search_placeholder')}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => onFilterChange({ query: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            onClick={() => setIsMobileFilterOpen(true)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            className="flex-1 justify-center"
          >
            {t('filters_title')}
          </Button>

          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
          >
            <option value="relevance">Pertinence</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="distance">Proximité campus</option>
          </select>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar (Desktop) & Drawer (Mobile) */}
        <div className="lg:col-span-1">
          <FilterSheet
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
            totalResults={sortedProperties.length}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results header & count */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pb-2 border-b border-slate-200/80">
            <div>
              <strong className="text-slate-900 font-bold">{sortedProperties.length}</strong> logement{sortedProperties.length > 1 ? 's' : ''} disponible{sortedProperties.length > 1 ? 's' : ''}
              {filters.neighborhood && filters.neighborhood !== 'all' && (
                <span> à <strong className="text-slate-800">{filters.neighborhood}</strong></span>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <span className="text-slate-400">{t('sort_by')} :</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer text-xs"
              >
                <option value="relevance">{t('sort_relevance')}</option>
                <option value="price_asc">{t('sort_price_asc')}</option>
                <option value="price_desc">{t('sort_price_desc')}</option>
                <option value="distance">{t('sort_distance')}</option>
                <option value="rating">{t('sort_rating')}</option>
              </select>
            </div>
          </div>

          {/* Listings list */}
          {sortedProperties.length === 0 ? (
            <EmptyState
              title={t('common_no_results')}
              description={t('common_no_results_desc')}
              actionLabel="Réinitialiser les filtres"
              onAction={onResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {sortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  onBookNow={onOpenBooking}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
