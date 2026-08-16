import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'info' | 'purple' | 'amber';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  const variantStyles = {
    default: 'bg-slate-900 text-white font-medium',
    neutral: 'bg-slate-100 text-slate-700 font-medium border border-slate-200/80',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200/80 font-medium',
    info: 'bg-sky-50 text-sky-800 border border-sky-200/80 font-medium',
    purple: 'bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-medium',
    amber: 'bg-amber-100 text-amber-950 border border-amber-300 font-semibold'
  };

  return (
    <span className={`inline-flex items-center rounded-lg whitespace-nowrap leading-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
