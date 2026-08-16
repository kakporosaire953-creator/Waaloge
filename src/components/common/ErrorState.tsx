import React from 'react';
import { Button } from './Button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  onRetry,
  className = ''
}) => {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-rose-100 shadow-xs max-w-lg mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
        <AlertCircle className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        {title || t('common_error_title')}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-sm">
        {description || t('common_error_desc')}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          {t('common_retry')}
        </Button>
      )}
    </div>
  );
};
