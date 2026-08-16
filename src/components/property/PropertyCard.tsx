import React from 'react';
import { Property } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { Badge } from '../common/Badge';
import { 
  Heart, 
  MapPin, 
  Footprints, 
  Star, 
  ShieldCheck, 
  Zap, 
  Droplet,
  ArrowRight
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (id: string) => void;
  onBookNow?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onBookNow
}) => {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useBookings();
  const favorite = isFavorite(property.id);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val);
  };

  const typeLabels: Record<string, string> = {
    chambre: 'Chambre individuelle',
    studio: 'Studio indépendant',
    colocation: 'Chambre en colocation',
    appartement: 'Appartement'
  };

  return (
    <div
      id={`property-card-${property.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col cursor-pointer"
      onClick={() => onSelect(property.id)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 shadow-sm transition-all z-10"
          aria-label="Ajouter aux favoris"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="default" size="sm" className="bg-slate-900/90 backdrop-blur-xs font-semibold">
            {typeLabels[property.type] || property.type}
          </Badge>
          {property.landlord.verified && (
            <Badge variant="success" size="sm" className="bg-emerald-950/85 text-emerald-300 border-none font-semibold">
              <ShieldCheck className="w-3 h-3 mr-0.5 inline" />
              {t('common_verified')}
            </Badge>
          )}
        </div>

        {/* Proximity Pill Bottom Left of Image */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          <span>{property.distanceToCampus}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
            <span className="flex items-center gap-1 font-medium text-slate-700 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              {property.neighborhood}
            </span>
            {property.rating > 0 && (
              <span className="flex items-center gap-1 font-bold text-slate-800 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {property.rating.toFixed(1)}
                <span className="text-slate-400 font-normal">({property.reviewsCount})</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-amber-700 transition-colors">
            {property.title}
          </h3>

          {/* Quick utility icons */}
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Droplet className="w-3 h-3 text-sky-500" />
              {property.waterSupply === '24h/24' ? 'Eau 24/7' : 'Eau réserve'}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              {property.electricityType === 'compteur_individuel' ? 'Woyofal direct' : 'Élec. partagée'}
            </span>
            <span>• {property.surface} m²</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
              {formatPrice(property.price)} <span className="text-xs font-semibold text-slate-600">{property.currency}</span>
            </div>
            <span className="text-[10px] text-slate-400">
              {property.chargesIncluded ? t('property_charges_included') : t('property_charges_extra')}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(property.id);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold transition-all flex items-center gap-1 group/btn"
          >
            <span>Détails</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
