import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CityId } from '../types';
import { 
  Building2, 
  User as UserIcon, 
  Mail, 
  Lock, 
  Phone, 
  GraduationCap, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Eye,
  EyeOff,
  Compass,
  Zap,
  HelpCircle,
  Home,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { BrandLogo } from '../components/common/BrandLogo';
import authStudentsImg from '../assets/images/auth_students.jpg';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  redirectTab?: string;
  redirectPropertyId?: string;
  onNavigate: (tab: string, propertyId?: string) => void;
  onAuthSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  redirectTab,
  redirectPropertyId,
  onNavigate,
  onAuthSuccess
}) => {
  const { login, register, loginDemo, isLoading } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Form State - Defaulted to Benin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'landlord'>('student');
  const [phone, setPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityId>('benin');
  const [university, setUniversity] = useState('UAC (Abomey-Calavi)');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        if (!email || !password) {
          setError('Veuillez remplir tous les champs.');
          return;
        }
        await login(email, password);
      } else {
        if (!name || !email || !password || !phone) {
          setError('Veuillez remplir tous les champs obligatoires.');
          return;
        }
        await register({
          name,
          email,
          role,
          phone,
          city: selectedCity,
          university: role === 'student' ? university : undefined
        }, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l’authentification.');
    }
  };

  const handleQuickDemo = async (type: 'student_ucad' | 'student_ugb' | 'landlord') => {
    setError('');
    try {
      await loginDemo(type);
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion démo.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl sm:rounded-[32px] border border-stone-200/80 shadow-2xl overflow-hidden">
        
        {/* LEFT PROMOTIONAL / PRESTIGE PANEL (Desktop & Tablet) */}
        <div className="lg:col-span-5 bg-[#0B132B] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Pure background image with subtle entrance animation */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <img
              src={authStudentsImg}
              alt="Étudiants Waaloge"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
            {/* Subtle dark gradient scrim to keep text legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
          </motion.div>

          {/* Top Brand Header */}
          <div className="space-y-6 relative z-10">
            {/* Logo wrapped in a clean, legible container */}
            <div className="inline-block bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md border border-white/20">
              <BrandLogo
                variant="full"
                theme="light"
                size="md"
                showCountryBadge={true}
                onClick={() => onNavigate('home')}
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/15 border border-[#D97706]/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>Accès Sécurisé Membres</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                Trouvez votre cocon étudiant au Bénin en toute sérénité.
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Connectez-vous pour débloquer l'accès à 100% des logements vérifiés sur place (UAC Calavi, Cotonou, Parakou), planifier des visites gratuites et contacter les bailleurs certifiés.
              </p>
            </div>

            {/* Prestige Features List */}
            <div className="space-y-3.5 pt-4">
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-white font-semibold">0 Arnaque garantie :</strong> Chaque annonce fait l'objet d'un audit physique de nos inspecteurs à Abomey-Calavi et Cotonou.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-white font-semibold">Visites sans avance :</strong> Ne versez jamais d'argent pour visiter. Vos rendez-vous sont 100% gratuits.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-white font-semibold">Transparence charges :</strong> Compteur SBEE personnel, eau de forage 24h/24 et wifi certifiés.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 relative z-10">
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Tester immédiatement (Comptes Démo)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student_ucad')}
                disabled={isLoading}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800/90 border border-slate-700/80 text-left transition-all group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#D97706] text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  R
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                    Rodrigue (UAC)
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">Étudiant Bénin 🇧🇯</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('landlord')}
                disabled={isLoading}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800/90 border border-slate-700/80 text-left transition-all group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  H
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                    M. Hounnou
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">Bailleur Calavi 🇧🇯</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT FORM CONTAINER */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Top Notice if user tried to access a restricted page */}
          {redirectTab && redirectTab !== 'home' && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                <Lock className="w-4 h-4 text-amber-800" />
              </div>
              <div className="text-xs leading-snug">
                <span className="font-bold block text-slate-900 mb-0.5">
                  Authentification requise
                </span>
                Connectez-vous ou créez votre compte pour accéder au catalogue complet et bloquer votre visite.
              </div>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-stone-100 rounded-2xl mb-6 border border-stone-200">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-stone-600 hover:text-slate-900'
              }`}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-stone-600 hover:text-slate-900'
              }`}
            >
              Créer mon compte
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B132B] tracking-tight">
              {mode === 'login' ? 'Bon retour sur Waaloge' : 'Rejoindre la communauté'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {mode === 'login'
                ? 'Saisissez vos identifiants pour accéder à vos favoris et vos visites planifiées.'
                : 'Créez votre profil étudiant en 30 secondes pour réserver votre logement.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <>
                {/* Role Switcher */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Je suis :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === 'student'
                          ? 'bg-amber-50 text-amber-950 border-amber-300 ring-1 ring-amber-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Étudiant / Stagiaire
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('landlord')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === 'landlord'
                          ? 'bg-amber-50 text-amber-950 border-amber-300 ring-1 ring-amber-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      Propriétaire / Bailleur
                    </button>
                  </div>
                </div>

                {/* Nom complet */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nom et Prénom *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Rodrigue Dossou"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
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
                  placeholder="etudiant@uac.bj ou email personnel"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                {/* WhatsApp & Téléphone */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Numéro WhatsApp / Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+229 97 00 00 00"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Utilisé pour vous transmettre la confirmation de visite et le contact direct du bailleur.
                  </span>
                </div>

                {/* Université / Ville */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Campus / Établissement
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Université d’Abomey-Calavi (UAC)">UAC Abomey-Calavi 🇧🇯</option>
                      <option value="ENEAM Gbégamey">ENEAM Gbégamey 🇧🇯</option>
                      <option value="EPAC Polytechnique">EPAC Calavi 🇧🇯</option>
                      <option value="ISM Adonaï Cotonou">ISM Adonaï Cotonou 🇧🇯</option>
                      <option value="Pigier Bénin">Pigier Bénin 🇧🇯</option>
                      <option value="Université de Parakou (UP)">Université de Parakou 🇧🇯</option>
                      <option value="UCAD Dakar">UCAD Dakar 🇸🇳</option>
                      <option value="UFHB Cocody">UFHB Abidjan 🇨🇮</option>
                      <option value="Autre établissement">Autre établissement</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Ville principale
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as CityId)}
                      className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="cotonou">Cotonou & Abomey-Calavi 🇧🇯</option>
                      <option value="dakar">Dakar 🇸🇳</option>
                      <option value="abidjan">Abidjan 🇨🇮</option>
                      <option value="lome">Lomé 🇹🇬</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Mot de passe {mode === 'register' ? '*' : ''}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('rodrigue.dossou@etudiant.uac.bj');
                      setPassword('demo1234');
                    }}
                    className="text-[11px] text-amber-800 hover:underline font-bold cursor-pointer"
                  >
                    Remplir compte démo Bénin 🇧🇯
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter for registration */}
              {mode === 'register' && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full rounded-full transition-all ${passwordStrength >= 1 ? 'bg-amber-400 w-1/4' : 'bg-slate-200 w-1/4'}`} />
                    <div className={`h-full rounded-full transition-all ${passwordStrength >= 2 ? 'bg-amber-500 w-1/4' : 'bg-slate-200 w-1/4'}`} />
                    <div className={`h-full rounded-full transition-all ${passwordStrength >= 3 ? 'bg-emerald-500 w-1/4' : 'bg-slate-200 w-1/4'}`} />
                    <div className={`h-full rounded-full transition-all ${passwordStrength >= 4 ? 'bg-emerald-600 w-1/4' : 'bg-slate-200 w-1/4'}`} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    {passwordStrength <= 1 && 'Mot de passe faible'}
                    {passwordStrength === 2 && 'Sécurité moyenne'}
                    {passwordStrength >= 3 && 'Mot de passe solide'}
                  </span>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {mode === 'login' ? 'Se connecter et continuer' : 'Créer mon compte étudiant'}
              </Button>
            </div>
          </form>

          {/* Quick return to home button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs text-stone-500 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Retourner à la page d'accueil</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
