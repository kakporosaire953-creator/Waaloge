import React from 'react';
import { Booking } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MessageSquare,
  Navigation,
  FileCheck2
} from 'lucide-react';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onViewProperty: (propertyId: string) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  isOpen,
  onClose,
  onViewProperty
}) => {
  const { t } = useLanguage();

  if (!booking) return null;

  const formattedDate = new Date(booking.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails de la réservation de visite"
      subtitle={`Référence : ${booking.id}`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Status card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Statut de la demande
            </span>
            <StatusBadge status={booking.status} size="lg" showDescription />
          </div>
        </div>

        {/* Property preview */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200">
          <img
            src={booking.propertyImage}
            alt={booking.propertyTitle}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{booking.propertyTitle}</h4>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{booking.neighborhood}, {booking.city.toUpperCase()}</span>
            </div>
            <div className="text-xs font-bold text-slate-900 mt-1">
              {new Intl.NumberFormat('fr-FR').format(booking.propertyPrice)} {booking.propertyCurrency}/mois
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onViewProperty(booking.propertyId);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold transition-colors"
          >
            Fiche
          </button>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block mb-1">Date convenue</span>
            <div className="font-bold text-slate-900 flex items-center gap-1.5 capitalize">
              <Calendar className="w-4 h-4 text-amber-600" />
              {formattedDate}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block mb-1">Heure de rendez-vous</span>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {booking.timeSlot}
            </div>
          </div>
        </div>

        {/* Meeting Point & Landlord contact */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Lieu de rencontre & Interlocuteur
          </h5>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Navigation className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Point de repère : </span>
                <span className="text-slate-700">{booking.meetingPoint}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <UserIcon className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="text-slate-700 font-medium">Propriétaire : </span>
                <strong className="text-slate-900">{booking.landlordName}</strong>
                {booking.landlordPhone && (
                  <span className="text-slate-500 ml-1">({booking.landlordPhone})</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Student Contact Reminder */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-800">Coordonnées transmises :</span>
          <div>{booking.studentName} • {booking.studentPhone} • {booking.studentEmail}</div>
          {booking.notes && <div className="italic text-slate-500 mt-1">« {booking.notes} »</div>}
        </div>

        {/* Zero Fee Guarantee */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Visite garantie gratuite sans commission préalable d'intermédiaire.</span>
        </div>

        <div className="pt-3 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            {t('common_close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
