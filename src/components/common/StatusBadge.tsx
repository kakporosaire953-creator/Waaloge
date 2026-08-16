import React from 'react';
import { BookingStatus } from '../../types';
import { Clock, CheckCircle2, XCircle, CheckCheck, Ban } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDescription = false
}) => {
  const { t } = useLanguage();

  const configs: Record<
    BookingStatus,
    {
      label: string;
      descKey: 'status_pending_desc' | 'status_confirmed_desc' | 'status_rejected_desc';
      bg: string;
      text: string;
      border: string;
      icon: React.ReactNode;
    }
  > = {
    pending: {
      label: t('status_pending'),
      descKey: 'status_pending_desc',
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
    },
    confirmed: {
      label: t('status_confirmed'),
      descKey: 'status_confirmed_desc',
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
    },
    rejected: {
      label: t('status_rejected'),
      descKey: 'status_rejected_desc',
      bg: 'bg-rose-50',
      text: 'text-rose-900',
      border: 'border-rose-200',
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />
    },
    completed: {
      label: t('status_completed'),
      descKey: 'status_confirmed_desc',
      bg: 'bg-slate-100',
      text: 'text-slate-800',
      border: 'border-slate-200',
      icon: <CheckCheck className="w-3.5 h-3.5 text-slate-600" />
    },
    cancelled: {
      label: t('status_cancelled'),
      descKey: 'status_rejected_desc',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
      icon: <Ban className="w-3.5 h-3.5 text-slate-400" />
    }
  };

  const config = configs[status] || configs.pending;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex items-center rounded-lg border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} w-fit`}
      >
        {config.icon}
        <span>{config.label}</span>
      </span>
      {showDescription && (
        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
          {t(config.descKey)}
        </p>
      )}
    </div>
  );
};
