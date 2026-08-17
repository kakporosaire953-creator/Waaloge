import React from 'react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useBookings } from '../contexts/BookingsContext';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { AmenitiesList } from '../components/property/AmenitiesList';
import { NeighborhoodCard } from '../components/property/NeighborhoodCard';
import { LandlordCard } from '../components/property/LandlordCard';
import { ReviewsSection } from '../components/property/ReviewsSection';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Footprints, 
  ShieldCheck, 
  CalendarCheck2, 
  Zap, 
  Droplet, 
  Maximize, 
  Layers, 
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onOpenBooking: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onOpenBooking
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-28 md:pb-16 animate-in fade-in duration-200">
      {/* Top Bar: Back & Favorite */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('property_back')}</span>
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
            favorite
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>{favorite ? 'Dans mes favoris' : 'Sauvegarder'}</span>
        </button>
      </div>

      {/* Gallery Section */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Layout: Left Details + Right Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details, Amenities, Location, Landlord, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" size="sm">
                {typeLabels[property.type] || property.type}
              </Badge>
              {property.landlord.verified && (
                <Badge variant="success" size="sm">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 inline text-emerald-600" />
                  {t('property_verified_badge')}
                </Badge>
              )}
              <Badge variant="amber" size="sm">
                Disponible {property.availableDate.toLowerCase()}
              </Badge>
            </div>

            <h1 className="font-editorial text-2xl sm:text-4xl text-[#0B132B] leading-tight">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                {property.neighborhood}, {property.city.toUpperCase()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-900 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Footprints className="w-4 h-4 text-amber-600 shrink-0" />
                {property.distanceToCampus}
              </span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">{t('property_surface')}</span>
                <span className="text-sm font-bold text-slate-800">{property.surface} m²</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">{t('property_floor')}</span>
                <span className="text-sm font-bold text-slate-800">{property.floor ? `Étage ${property.floor}` : 'RDC'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">{t('property_deposit')}</span>
                <span className="text-sm font-bold text-slate-800">{property.depositMonths} {t('common_month')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Charges</span>
                <span className="text-sm font-bold text-emerald-700">
                  {property.chargesIncluded ? 'Incluses' : 'En sus'}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              {t('property_overview')}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Utilities */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              {t('property_amenities_title')}
            </h3>
            <AmenitiesList
              amenities={property.amenities}
              waterSupply={property.waterSupply}
              electricityType={property.electricityType}
            />
          </div>

          {/* Neighborhood & Campus Proximity */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              {t('property_location_title')}
            </h3>
            <NeighborhoodCard
              neighborhood={property.neighborhood}
              distanceToCampus={property.distanceToCampus}
              transportInfo={property.transportInfo}
              safetyNotes={property.safetyNotes}
              nearestUniversity={property.nearestUniversity}
            />
          </div>

          {/* Landlord Card */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              {t('property_landlord_title')}
            </h3>
            <LandlordCard
              landlord={property.landlord}
            />
          </div>

          {/* Student Reviews */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <ReviewsSection
              reviews={property.reviews}
              rating={property.rating}
            />
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 p-6 shadow-lg space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Loyer mensuel
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  {formatPrice(property.price)}
                </span>
                <span className="text-sm font-bold text-slate-600">{property.currency}</span>
                <span className="text-xs text-slate-400">/ mois</span>
              </div>
              <span className="text-xs text-slate-500 block mt-1">
                {property.chargesIncluded
                  ? `Charges comprises (eau & entretien commun)`
                  : `Charges estimées : ~${property.chargesAmount || 10000} FCFA`}
              </span>
            </div>

            {/* Quick Guarantees */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantie Visite Gratuite</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Aucune avance par transfert d’argent n’est exigée pour visiter ce logement.
              </p>
            </div>

            {/* Next available slot */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-400 block mb-1">Prochains créneaux de visite</span>
              <div className="flex flex-wrap gap-1.5">
                {property.availableTimeSlots.slice(0, 3).map((slot) => (
                  <span key={slot} className="px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-800">
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => onOpenBooking(property)}
              leftIcon={<CalendarCheck2 className="w-5 h-5" />}
              className="text-slate-950 font-black shadow-md hover:scale-102"
            >
              {t('property_cta_book')}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-slate-200 p-3 shadow-xl flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-black text-slate-900 leading-tight">
            {formatPrice(property.price)} <span className="text-xs font-semibold">{property.currency}</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {property.chargesIncluded ? 'Charges comprises' : 'Charges en sus'}
          </span>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => onOpenBooking(property)}
          leftIcon={<CalendarCheck2 className="w-4 h-4" />}
          className="font-bold text-slate-950 shrink-0 shadow-sm"
        >
          Réserver une visite
        </Button>
      </div>
    </div>
  );
};
