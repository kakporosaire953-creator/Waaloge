import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/common/Button';
import { apiClient } from '../api/client';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  GraduationCap, 
  ShieldCheck, 
  Languages, 
  Server, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Save,
  Key
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, openAuthModal, logout, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [university, setUniversity] = useState(user?.university || '');
  const [customApiConfig, setCustomApiConfig] = useState(() => apiClient.getCustomApiConfig());
  const [customApiUrl, setCustomApiUrl] = useState(customApiConfig.baseUrl || 'https://api.waaloge.com/api');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setUniversity(user.university || '');
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ name, phone, university });
      showToast('Profil étudiant mis à jour avec succès', 'success');
    } catch (err) {
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveApiUrl = () => {
    apiClient.setCustomApiConfig(customApiUrl, true);
    setCustomApiConfig({ baseUrl: customApiUrl, useCustomApi: true });
    showToast(`Configuration API Laravel enregistrée : ${customApiUrl}`, 'info');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-5 animate-in fade-in duration-200">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Connexion requise</h2>
        <p className="text-xs text-slate-600">
          Connecte-toi pour gérer ton profil étudiant, tes coordonnées et tes préférences.
        </p>
        <Button variant="primary" fullWidth onClick={() => openAuthModal('login')}>
          Se connecter
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-24 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('nav_profile')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gère tes informations personnelles et tes préférences d'utilisation.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
          className="text-rose-700 hover:bg-rose-50 border-rose-200"
        >
          {t('nav_logout')}
        </Button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-black text-lg flex items-center justify-center">
            {user?.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{user?.name}</h3>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Étudiant vérifié Waaloge
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nom complet *
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={user?.email}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Téléphone WhatsApp *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Université / École
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>

      {/* Language & Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Languages className="w-4 h-4 text-amber-600" />
          <span>{t('profile_language')}</span>
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLanguage('fr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              language === 'fr'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Français (Par défaut)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Backend Integration Settings (Laravel Sanctum) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Intégration API Laravel & Sanctum
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Sanctum Ready
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Ce frontend communique avec l'API REST Laravel de Waaloge via Sanctum Bearer Token. Par défaut, un mode démo local réactif est actif si aucun serveur externe n'est branché.
        </p>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            URL de base API Laravel :
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customApiUrl}
              onChange={(e) => setCustomApiUrl(e.target.value)}
              placeholder="https://api.waaloge.com/api"
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <Button variant="outline" size="sm" onClick={handleSaveApiUrl}>
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
