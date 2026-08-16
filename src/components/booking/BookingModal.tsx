import React, { useState } from 'react';
import { Property, Booking } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Phone, 
  Mail, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Building2,
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { t } = useLanguage();
  const { createBooking } = useBookings();

  // Multi-step: 1 = Date, 2 = Slot, 3 = Student info, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(property?.availableTimeSlots[0] || '10:00');
  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentPhone, setStudentPhone] = useState(user?.phone || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [studentUniversity, setStudentUniversity] = useState(user?.university || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update with user info when user changes
  React.useEffect(() => {
    if (user) {
      if (!studentName) setStudentName(user.name);
      if (!studentPhone) setStudentPhone(user.phone || '');
      if (!studentEmail) setStudentEmail(user.email);
      if (!studentUniversity) setStudentUniversity(user.university || '');
    }
  }, [user]);

  if (!property) return null;

  // Next 7 available days calculation
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('fr-FR', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      dates.push({ iso, weekday, dayNum });
    }
    return dates;
  };

  const handleSubmit = async () => {
    if (!studentName.trim() || !studentPhone.trim() || !studentEmail.trim()) {
      setErrorMessage('Merci de renseigner votre nom, téléphone WhatsApp et email.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const newBooking = await createBooking({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyType: property.type,
        propertyImage: property.images[0],
        propertyPrice: property.price,
        propertyCurrency: property.currency,
        neighborhood: property.neighborhood,
        city: property.city,
        landlordName: property.landlord.name,
        landlordPhone: property.landlord.phoneContact,
        date: selectedDate,
        timeSlot: selectedSlot,
        studentName,
        studentPhone,
        studentEmail,
        studentUniversity,
        notes,
        meetingPoint: `Rendez-vous à ${property.neighborhood} avec ${property.landlord.name}. Adresse exacte transmise par WhatsApp.`
      });

      onSuccess(newBooking);
    } catch (err: any) {
      setErrorMessage('Une erreur est survenue lors de l’enregistrement. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('booking_modal_title')}
      subtitle={property.title}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-1.5 pb-2">
          {[
            { num: 1, label: t('booking_step_1') },
            { num: 2, label: t('booking_step_2') },
            { num: 3, label: t('booking_step_3') },
            { num: 4, label: t('booking_step_4') }
          ].map((s) => (
            <div
              key={s.num}
              className={`text-center pb-2 border-b-2 transition-all ${
                step === s.num
                  ? 'border-slate-900 text-slate-950 font-bold'
                  : step > s.num
                  ? 'border-emerald-500 text-emerald-700 font-semibold'
                  : 'border-slate-200 text-slate-400'
              }`}
            >
              <div className="text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Date */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                {t('booking_select_date')}
              </h4>
              <p className="text-xs text-slate-500">
                Choisis parmi les 7 prochains jours disponibles pour ce logement.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {getAvailableDates().map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setSelectedDate(d.iso)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                    selectedDate === d.iso
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[11px] uppercase font-bold tracking-wider opacity-80">
                    {d.weekday}
                  </span>
                  <span className="text-sm font-black">{d.dayNum}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continuer vers l’horaire
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Time Slot */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                {t('booking_select_slot')}
              </h4>
              <p className="text-xs text-slate-500">
                Créneaux validés avec le propriétaire ({property.landlord.name}).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                    selectedSlot === slot
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Retour date
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continuer vers mes infos
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Student Info */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-amber-600" />
                {t('booking_student_info')}
              </h4>
              <p className="text-xs text-slate-500">
                Ces informations permettent au propriétaire de préparer votre accueil.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('booking_full_name')} *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ex: Mamadou Diallo"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('booking_phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('booking_email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="etudiant@universite.sn"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('booking_university')}
                </label>
                <input
                  type="text"
                  value={studentUniversity}
                  onChange={(e) => setStudentUniversity(e.target.value)}
                  placeholder="Ex: UCAD Dakar, BEM, UFHB Cocody..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('booking_notes')}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Je viendrai avec un camarade, question sur les charges..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Retour horaire
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (!studentName.trim() || !studentPhone.trim() || !studentEmail.trim()) {
                    setErrorMessage('Merci de remplir les champs obligatoires (*)');
                    return;
                  }
                  setErrorMessage('');
                  setStep(4);
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Vérifier et confirmer
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Summary & Confirm */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Logement à visiter
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {property.title}
                  </h4>
                  <span className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {property.neighborhood}, {property.city.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-900">
                    {new Intl.NumberFormat('fr-FR').format(property.price)} {property.currency}
                  </div>
                  <span className="text-[10px] text-slate-400">par mois</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Date : <strong className="text-slate-900">{selectedDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Heure : <strong className="text-slate-900">{selectedSlot}</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                <div>Visiteur : <strong className="text-slate-900">{studentName}</strong> ({studentPhone})</div>
                {studentUniversity && <div>Établissement : {studentUniversity}</div>}
              </div>
            </div>

            {/* Zero fee guarantee badge */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('booking_free_guarantee')}</span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(3)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                disabled={isSubmitting}
              >
                Modifier mes infos
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                {t('booking_submit')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
