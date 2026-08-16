import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBookings } from '../contexts/BookingsContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  CalendarCheck2, 
  Info, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NotificationsPageProps {
  onNavigate: (tab: string, propertyId?: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useBookings();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return <CalendarCheck2 className="w-5 h-5 text-emerald-600" />;
      case 'booking_reminder':
        return <CalendarCheck2 className="w-5 h-5 text-amber-600" />;
      case 'booking_cancelled':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default:
        return <Info className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <span>{t('notifications_title')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivi en temps réel de tes demandes de visites et alertes de logements.
          </p>
        </div>

        {notifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllNotificationsAsRead}
            leftIcon={<CheckCheck className="w-4 h-4" />}
          >
            {t('notifications_mark_all_read')}
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title={t('notifications_empty')}
          description="Tu recevras ici les confirmations de tes visites et les actualités de tes logements enregistrés."
          actionLabel="Explorer les logements"
          onAction={() => onNavigate('explore')}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (!notif.read) markNotificationAsRead(notif.id);
                if (notif.link) {
                  onNavigate(notif.link.replace('/', ''));
                }
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                notif.read
                  ? 'bg-white border-slate-200/90 text-slate-700'
                  : 'bg-amber-50/50 border-amber-200/90 text-slate-950 font-medium shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 shadow-2xs mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">{notif.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
