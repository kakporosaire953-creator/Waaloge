import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Booking, NotificationItem, Property } from '../types';
import { apiClient } from '../api/client';
import { useToast } from './ToastContext';

interface BookingsContextType {
  bookings: Booking[];
  favorites: string[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  isLoading: boolean;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  cancelBooking: (id: string, reason?: string) => Promise<void>;
  toggleFavorite: (propertyId: string) => Promise<boolean>;
  isFavorite: (propertyId: string) => boolean;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showInfo, showError } = useToast();

  const refreshAll = useCallback(async () => {
    try {
      const [bookingsData, favsData, notifsData] = await Promise.all([
        apiClient.getBookings(),
        apiClient.getFavoriteIds(),
        apiClient.getNotifications()
      ]);
      setBookings(bookingsData);
      setFavorites(favsData);
      setNotifications(notifsData);
    } catch (err) {
      console.error('Error loading user data', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
    try {
      const newBooking = await apiClient.createBooking(bookingData);
      setBookings(prev => [newBooking, ...prev]);
      // Refresh notifications
      const notifs = await apiClient.getNotifications();
      setNotifications(notifs);
      showSuccess('Ta demande de visite a bien été transmise au propriétaire !', 'Visite réservée');
      return newBooking;
    } catch (err) {
      showError('Impossible d’enregistrer la réservation. Réessaie.', 'Erreur');
      throw err;
    }
  };

  const cancelBooking = async (id: string, reason?: string) => {
    try {
      await apiClient.updateBookingStatus(id, 'cancelled', reason);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      showInfo('La visite a été annulée.');
      const notifs = await apiClient.getNotifications();
      setNotifications(notifs);
    } catch (err) {
      showError('Erreur lors de l’annulation de la visite.');
    }
  };

  const toggleFavorite = async (propertyId: string): Promise<boolean> => {
    const isNowFav = await apiClient.toggleFavorite(propertyId);
    setFavorites(prev => isNowFav ? [...prev, propertyId] : prev.filter(id => id !== propertyId));
    if (isNowFav) {
      showSuccess('Logement ajouté à tes favoris.');
    } else {
      showInfo('Logement retiré des favoris.');
    }
    return isNowFav;
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  const markNotificationAsRead = async (id: string) => {
    await apiClient.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = async () => {
    await apiClient.markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showSuccess('Toutes les notifications ont été marquées comme lues.');
  };

  const deleteNotification = async (id: string) => {
    await apiClient.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        favorites,
        notifications,
        unreadNotificationsCount,
        isLoading,
        createBooking,
        cancelBooking,
        toggleFavorite,
        isFavorite,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        refreshAll
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    return {
      bookings: [],
      favorites: [],
      notifications: [],
      unreadNotificationsCount: 0,
      isLoading: false,
      createBooking: async () => ({} as any),
      cancelBooking: async () => {},
      toggleFavorite: async () => false,
      isFavorite: () => false,
      markNotificationAsRead: async () => {},
      markAllNotificationsAsRead: async () => {},
      deleteNotification: async () => {},
      refreshAll: async () => {}
    };
  }
  return context;
};
