import React, { useState } from 'react';
import { Property, Booking } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useBookings } from '../contexts/BookingsContext';
import { BookingCard } from '../components/booking/BookingCard';
import { BookingDetailModal } from '../components/booking/BookingDetailModal';
import { PropertyCard } from '../components/property/PropertyCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  CalendarCheck2, 
  Clock, 
  MapPin, 
  Heart, 
  User as UserIcon, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

interface DashboardPageProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onNavigate: (tab: string, propertyId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  properties,
  onSelectProperty,
  onNavigate
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { t } = useLanguage();
  const { bookings, favorites } = useBookings();
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);

  // Active / Upcoming visit
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const nextVisit = upcomingBookings[0] || null;

  // Past / cancelled visits
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  // Favorite properties
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Espace Étudiant Waaloge</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Connecte-toi ou crée un compte pour suivre l'état de tes demandes de visites et retrouver tes logements favoris.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="lg" onClick={() => openAuthModal('login')}>
            Se connecter
          </Button>
          <Button variant="outline" size="lg" onClick={() => openAuthModal('register')}>
            Créer un compte
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10 pb-20 animate-in fade-in duration-200">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Espace Étudiant
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#0B132B]">
            {t('dashboard_greeting')}, <span className="text-[#D97706]">{user?.name.split(' ')[0]}</span> 👋
          </h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <GraduationCap className="w-4 h-4 text-slate-400" />
            <span>{user?.university || 'Étudiant(e) vérifié(e)'}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Compte actif
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('explore')}
            leftIcon={<Search className="w-4 h-4" />}
          >
            Explorer d'autres logements
          </Button>
        </div>
      </div>

      {/* HIGHLIGHT: Prochaine Visite */}
      {nextVisit && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CalendarCheck2 className="w-5 h-5 text-amber-600" />
              <span>{t('dashboard_next_visit')}</span>
            </h2>
            <span className="text-xs font-semibold text-amber-700">
              Priorité rendez-vous
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-radial from-amber-500/10 via-slate-900 to-slate-950 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <img
                  src={nextVisit.propertyImage}
                  alt={nextVisit.propertyTitle}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {nextVisit.status === 'confirmed' ? 'Visite Confirmée' : 'Demande en attente de confirmation'}
                  </span>
                  <h3
                    onClick={() => onSelectProperty(nextVisit.propertyId)}
                    className="font-bold text-base sm:text-lg text-white hover:text-amber-400 cursor-pointer line-clamp-1 transition-colors"
                  >
                    {nextVisit.propertyTitle}
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {nextVisit.neighborhood}, {nextVisit.city.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-right">
                <span className="text-[10px] uppercase font-bold text-slate-300 block">Créneau</span>
                <div className="text-sm font-extrabold text-amber-400">
                  {nextVisit.date} à {nextVisit.timeSlot}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Contact sur place :</span>
                <span>{nextVisit.landlordName}</span>
                {nextVisit.landlordPhone && (
                  <span className="text-amber-400 font-mono">({nextVisit.landlordPhone})</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedBookingForDetails(nextVisit)}
                  className="font-bold text-slate-950"
                >
                  Voir les consignes d'accès
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL VISITS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {t('dashboard_all_bookings')} ({bookings.length})
          </h2>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            title="Aucune visite enregistrée"
            description="Tu n'as pas encore programmé de visite. Explore les logements pour fixer un rendez-vous gratuit."
            actionLabel="Trouver un logement à visiter"
            onAction={() => onNavigate('explore')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onViewProperty={onSelectProperty}
                onOpenDetails={setSelectedBookingForDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* FAVORITES PREVIEW SECTION */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t('dashboard_my_favorites')} ({favoriteProperties.length})
            </h2>
            <p className="text-xs text-slate-500">
              Tes coups de cœur sauvegardés pour comparer avant de réserver.
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('favorites')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Voir tout
            </Button>
          )}
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
            <Heart className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tu n'as pas encore ajouté de logement à tes favoris. Clique sur le cœur pour retrouver tes annonces facilement.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProperties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </section>

      {/* Booking Details Modal */}
      <BookingDetailModal
        booking={selectedBookingForDetails}
        isOpen={!!selectedBookingForDetails}
        onClose={() => setSelectedBookingForDetails(null)}
        onViewProperty={onSelectProperty}
      />
    </div>
  );
};
