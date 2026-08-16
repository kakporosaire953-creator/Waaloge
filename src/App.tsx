/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Property, CityId, SearchFilters, Booking } from './types';
import { apiClient } from './api/client';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingsProvider, useBookings } from './contexts/BookingsContext';
import { ToastProvider, useToast } from './contexts/ToastContext';

// Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileNav } from './components/common/MobileNav';
import { AuthModal } from './components/auth/AuthModal';
import { BookingModal } from './components/booking/BookingModal';
import { AssistantDrawer } from './components/assistant/AssistantDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { ExplorePage } from './pages/ExplorePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainApp: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  
  // Stored target destination when redirecting unauthenticated users to auth
  const [redirectTarget, setRedirectTarget] = useState<{ tab: string; propertyId?: string } | null>(null);

  // City & Search Filter State
  const [selectedCity, setSelectedCity] = useState<CityId>('cotonou');
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'cotonou',
    query: '',
    neighborhood: 'all',
    type: 'all',
    minPrice: 0,
    maxPrice: 0,
    maxDistanceMinutes: 0,
    availability: 'all',
    amenities: [],
    sortBy: 'relevance'
  });

  // Data State
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);

  // Modal / Drawer States
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Fetch properties on mount
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoadingProperties(true);
        const data = await apiClient.getProperties();
        setProperties(data);
      } catch (err) {
        showToast('Impossible de charger les logements', 'error');
      } finally {
        setIsLoadingProperties(false);
      }
    };
    loadProperties();
  }, []);

  // Update filter city when global city changes
  const handleCityChange = (cityId: CityId) => {
    setSelectedCity(cityId);
    setFilters(prev => ({ ...prev, city: cityId, neighborhood: 'all' }));
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      city: selectedCity,
      query: '',
      neighborhood: 'all',
      type: 'all',
      minPrice: 0,
      maxPrice: 0,
      maxDistanceMinutes: 0,
      availability: 'all',
      amenities: [],
      sortBy: 'relevance'
    });
  };

  // Protected pages that require login
  const PROTECTED_TABS = ['explore', 'property-detail', 'dashboard', 'favorites', 'notifications', 'profile'];

  const handleNavigate = (tab: string, propertyId?: string) => {
    // If user clicks explicit auth
    if (tab === 'auth') {
      if (propertyId) {
        setRedirectTarget({ tab: 'property-detail', propertyId });
      }
      setCurrentTab('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Direct access to property-detail requires auth
    if (tab === 'property-detail' && propertyId) {
      if (!isAuthenticated) {
        setRedirectTarget({ tab: 'property-detail', propertyId });
        showToast('Connectez-vous pour consulter la fiche complète et réserver une visite.', 'info');
        setCurrentTab('auth');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setSelectedPropertyId(propertyId);
      setCurrentTab('property-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check if tab requires authentication
    if (PROTECTED_TABS.includes(tab) && !isAuthenticated) {
      setRedirectTarget({ tab, propertyId });
      showToast('Veuillez vous connecter pour accéder à cet espace.', 'info');
      setCurrentTab('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Public pages: home, how-it-works, about, etc.
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    if (redirectTarget) {
      const { tab, propertyId } = redirectTarget;
      setRedirectTarget(null);
      if (tab === 'property-detail' && propertyId) {
        setSelectedPropertyId(propertyId);
        setCurrentTab('property-detail');
      } else {
        setCurrentTab(tab);
      }
    } else {
      // Default to explore if coming from general login
      setCurrentTab('explore');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (id: string) => {
    handleNavigate('property-detail', id);
  };

  const handleOpenBooking = (property: Property) => {
    if (!isAuthenticated) {
      setRedirectTarget({ tab: 'property-detail', propertyId: property.id });
      setCurrentTab('auth');
      return;
    }
    setBookingProperty(property);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookingProperty(null);
    showToast(`Visite enregistrée avec succès pour le ${newBooking.date} !`, 'success');
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve selected property
  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Universal Header (Exact match with photo) */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        selectedCity={selectedCity}
        onSelectCity={handleCityChange}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            properties={properties}
            selectedCity={selectedCity}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
            onOpenBooking={(property) => setBookingProperty(property)}
            onSearch={(params) => {
              handleFilterChange(params);
            }}
          />
        )}

        {currentTab === 'auth' && (
          <AuthPage
            redirectTab={redirectTarget?.tab}
            redirectPropertyId={redirectTarget?.propertyId}
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            properties={properties}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onSelectProperty={handleSelectProperty}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentTab === 'property-detail' && (
          selectedProperty ? (
            <PropertyDetailPage
              property={selectedProperty}
              onBack={() => setCurrentTab('explore')}
              onOpenBooking={handleOpenBooking}
            />
          ) : (
            <NotFoundPage onNavigate={handleNavigate} />
          )
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'favorites' && (
          <FavoritesPage
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'profile' && (
          <ProfilePage onNavigate={handleNavigate} />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {![
          'home',
          'auth',
          'explore',
          'property-detail',
          'dashboard',
          'favorites',
          'notifications',
          'profile',
          'how-it-works',
          'about'
        ].includes(currentTab) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer (Exact match with photo) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onNavigate={handleNavigate}
      />

      {/* Auth Modal */}
      <AuthModal />

      {/* Booking Modal */}
      <BookingModal
        property={bookingProperty}
        isOpen={!!bookingProperty}
        onClose={() => setBookingProperty(null)}
        onSuccess={handleBookingSuccess}
      />

      {/* AI Assistant Drawer */}
      <AssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <AuthProvider>
          <BookingsProvider>
            <MainApp />
          </BookingsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}
