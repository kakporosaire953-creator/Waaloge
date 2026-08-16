import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiClient } from '../api/client';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, phone: string, university?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const { showSuccess, showInfo } = useToast();

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await apiClient.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to load current user', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const { user: loggedInUser } = await apiClient.login(email, password);
      setUser(loggedInUser);
      closeAuthModal();
      showSuccess(`Ravi de te revoir, ${loggedInUser.name.split(' ')[0]} !`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, university?: string) => {
    setIsLoading(true);
    try {
      const { user: registeredUser } = await apiClient.register(name, email, phone, university);
      setUser(registeredUser);
      closeAuthModal();
      showSuccess(`Bienvenue sur Waaloge, ${registeredUser.name.split(' ')[0]} !`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await apiClient.logout();
    setUser(null);
    showInfo('Vous êtes déconnecté.');
  };

  const updateProfile = async (data: Partial<User>) => {
    const updated = await apiClient.updateUser(data);
    setUser(updated);
    showSuccess('Profil mis à jour avec succès.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAuthModalOpen: false,
      authModalMode: 'login' as const,
      openAuthModal: () => {},
      closeAuthModal: () => {},
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      updateProfile: async () => {}
    };
  }
  return context;
};
