import React, { useState } from 'react';
import { Booking } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  Phone, 
  ArrowUpRight, 
  Ban, 
  ExternalLink,
  Info
} from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onViewProperty: (propertyId: string) => void;
  onOpenDetails: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewProperty,
  onOpenDetails
}) => {
  const { t } = useLanguage();
  const { cancelBooking } = useBookings();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Es-tu sûr de vouloir annuler cette demande de visite ?')) {
      setIsCancelling(true);
      await cancelBooking(booking.id, 'Annulation demandée par l’étudiant');
      setIsCancelling(false);
    }
  };

  const formattedDate = new Date(booking.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div
      id={`booking-card-${booking.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
    >
      {/* Top Bar: Property Thumbnail & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={booking.propertyImage}
            alt={booking.propertyTitle}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Réf : {booking.id}
            </span>
            <h4
              onClick={() => onViewProperty(booking.propertyId)}
              className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 hover:text-amber-700 cursor-pointer transition-colors"
            >
              {booking.propertyTitle}
            </h4>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{booking.neighborhood}, {booking.city.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <StatusBadge status={booking.status} size="md" />
        </div>
      </div>

      {/* Date & Landlord Info Grid */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 capitalize">{formattedDate}</div>
            <div className="text-slate-500 flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3 text-slate-400" /> à {booking.timeSlot}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
            <UserIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900">{booking.landlordName}</div>
            <div className="text-slate-500">{booking.landlordPhone || 'Contact par WhatsApp'}</div>
          </div>
        </div>
      </div>

      {/* Meeting Point instructions if confirmed */}
      {booking.status === 'confirmed' && (
        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Consigne du rendez-vous : </span>
            <span>{booking.meetingPoint}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-500 font-medium">
          Loyer : <strong className="text-slate-900">{new Intl.NumberFormat('fr-FR').format(booking.propertyPrice)} {booking.propertyCurrency}</strong>/mois
        </div>

        <div className="flex items-center gap-2">
          {booking.status === 'pending' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              isLoading={isCancelling}
              className="text-rose-600 hover:bg-rose-50"
            >
              Annuler
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDetails(booking)}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Instructions & Détails
          </Button>
        </div>
      </div>
    </div>
  );
};
