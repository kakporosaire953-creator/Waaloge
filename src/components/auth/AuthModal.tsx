import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Building2, User as UserIcon, Mail, Lock, Phone, GraduationCap, AlertCircle, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isRegister = authModalMode === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim() || !email.trim() || !phone.trim()) {
          setError('Merci de renseigner votre nom, email et téléphone WhatsApp.');
          setIsLoading(false);
          return;
        }
        await register(name, email, phone, university);
      } else {
        if (!email.trim()) {
          setError('Merci de saisir votre adresse email.');
          setIsLoading(false);
          return;
        }
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Échec de l’authentification. Vérifiez vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
      title={isRegister ? "Créer un compte étudiant" : "Connexion à Waaloge"}
      subtitle={isRegister ? "Accède à la réservation de visites et au suivi de ton dossier." : "Retrouve tes visites programmées et tes logements favoris."}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {isRegister && (
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
                placeholder="Ex: Mamadou Diallo"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Adresse email *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="etudiant@domaine.com"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {isRegister && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Numéro de téléphone (WhatsApp) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+221 77 452 89 10"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Université ou École supérieure
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Ex: UCAD Dakar, ESP, BEM..."
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Mot de passe {isRegister ? '*' : '(Optionnel en démo)'}
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            {isRegister ? "Créer mon compte étudiant" : "Se connecter"}
          </Button>
        </div>

        {/* Mode Switcher */}
        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
          {isRegister ? (
            <span>
              Déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-amber-700 font-bold hover:underline"
              >
                Se connecter
              </button>
            </span>
          ) : (
            <span>
              Nouveau sur Waaloge ?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="text-amber-700 font-bold hover:underline"
              >
                Créer un compte
              </button>
            </span>
          )}
        </div>

        {/* Sanctum note */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Authentification sécurisée avec token d'accès Sanctum.</span>
        </div>
      </form>
    </Modal>
  );
};
