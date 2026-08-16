import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { Building2, Compass, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-200">
      <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-xs font-black text-2xl">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Cette adresse nous a échappé
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Le logement ou la page que tu cherches n'est plus accessible ou a changé de quartier.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <Button
          variant="primary"
          onClick={() => onNavigate('home')}
          leftIcon={<Building2 className="w-4 h-4" />}
        >
          Retour à l'accueil
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate('explore')}
          leftIcon={<Compass className="w-4 h-4" />}
        >
          Explorer les logements
        </Button>
      </div>
    </div>
  );
};
