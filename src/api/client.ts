import { Property, User, Booking, NotificationItem, CityId, SearchFilters } from '../types';
import { INITIAL_PROPERTIES, INITIAL_USER, INITIAL_BOOKINGS, INITIAL_NOTIFICATIONS, INITIAL_FAVORITE_IDS } from '../data/mockData';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import { safeStorage } from '../utils/storage';

const STORAGE_KEYS = {
  TOKEN: 'waaloge_sanctum_token',
  USER: 'waaloge_user',
  PROPERTIES: 'waaloge_properties',
  BOOKINGS: 'waaloge_bookings',
  NOTIFICATIONS: 'waaloge_notifications',
  FAVORITES: 'waaloge_favorites',
  API_BASE_URL: 'waaloge_custom_api_url',
  USE_CUSTOM_API: 'waaloge_use_custom_api'
};

// Seed LocalStorage with app data (properties, neighborhoods) but NOT with a pre-logged user.
// Users must register or login manually — no ghost account on first visit.
function initializeStore() {
  try {
    if (!safeStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
      safeStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
    }
    // Clear any legacy auto-created mock session so no account appears pre-connected
    const legacyToken = safeStorage.getItem(STORAGE_KEYS.TOKEN);
    if (legacyToken === 'sanctum_token_waaloge_mock_live') {
      safeStorage.removeItem(STORAGE_KEYS.TOKEN);
      safeStorage.removeItem(STORAGE_KEYS.USER);
      safeStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      safeStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      safeStorage.removeItem(STORAGE_KEYS.FAVORITES);
    }
  } catch (e) {
    console.warn('Waaloge safeStorage init notice:', e);
  }
}

initializeStore();

export const apiClient = {
  getToken(): string | null {
    return safeStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken(token: string | null) {
    if (token) {
      safeStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      safeStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },

  getCustomApiConfig() {
    return {
      baseUrl: safeStorage.getItem(STORAGE_KEYS.API_BASE_URL) || '',
      useCustomApi: safeStorage.getItem(STORAGE_KEYS.USE_CUSTOM_API) === 'true'
    };
  },

  setCustomApiConfig(baseUrl: string, useCustomApi: boolean) {
    safeStorage.setItem(STORAGE_KEYS.API_BASE_URL, baseUrl);
    safeStorage.setItem(STORAGE_KEYS.USE_CUSTOM_API, useCustomApi ? 'true' : 'false');
  },

  // AUTH ENDPOINTS (Laravel Sanctum format)
  async login(email: string, password?: string): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userStr = safeStorage.getItem(STORAGE_KEYS.USER);
    let user: User = userStr ? JSON.parse(userStr) : INITIAL_USER;
    user.email = email;
    const token = `sanctum_tk_${Math.random().toString(36).substring(2)}`;
    this.setToken(token);
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  async register(name: string, email: string, phone: string, university?: string): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 350));
    const user: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      whatsapp: phone,
      city: 'dakar',
      university: university || 'Université Cheikh Anta Diop (UCAD)',
      role: 'student',
      identityVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const token = `sanctum_tk_${Math.random().toString(36).substring(2)}`;
    this.setToken(token);
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;
    const userStr = safeStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  async logout(): Promise<void> {
    this.setToken(null);
    safeStorage.removeItem(STORAGE_KEYS.USER);
  },

  async updateUser(data: Partial<User>): Promise<User> {
    const current = await this.getCurrentUser();
    if (!current) throw new Error('Unauthenticated');
    const updated = { ...current, ...data };
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  },

  // PROPERTIES (LOGEMENTS)
  async getProperties(filters?: Partial<SearchFilters>): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const dataStr = safeStorage.getItem(STORAGE_KEYS.PROPERTIES) || '[]';
    let list: Property[] = [];
    try {
      list = JSON.parse(dataStr);
    } catch {
      list = INITIAL_PROPERTIES;
    }

    if (!filters) return list;

    if (filters.city) {
      list = list.filter(p => p.city === filters.city);
    }
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.nearestUniversity.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (filters.neighborhood && filters.neighborhood !== 'all') {
      list = list.filter(p => p.neighborhood.toLowerCase() === filters.neighborhood?.toLowerCase());
    }
    if (filters.type && filters.type !== 'all') {
      list = list.filter(p => p.type === filters.type);
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
      list = list.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.minPrice && filters.minPrice > 0) {
      list = list.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxDistanceMinutes && filters.maxDistanceMinutes > 0) {
      list = list.filter(p => p.campusMinutesWalk <= filters.maxDistanceMinutes!);
    }
    if (filters.availability && filters.availability !== 'all') {
      list = list.filter(p => p.availability === filters.availability);
    }

    // Sorting
    if (filters.sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'distance') {
      list.sort((a, b) => a.campusMinutesWalk - b.campusMinutesWalk);
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  },

  async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const dataStr = safeStorage.getItem(STORAGE_KEYS.PROPERTIES) || '[]';
    try {
      const list: Property[] = JSON.parse(dataStr);
      return list.find(p => p.id === id) || null;
    } catch {
      return INITIAL_PROPERTIES.find(p => p.id === id) || null;
    }
  },

  async getNeighborhoods(cityId?: CityId) {
    if (cityId) {
      return NEIGHBORHOODS.filter(n => n.cityId === cityId);
    }
    return NEIGHBORHOODS;
  },

  // BOOKINGS (RÉSERVATIONS)
  async getBookings(): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const str = safeStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]';
    try {
      const list: Booking[] = JSON.parse(str);
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return [];
    }
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const list = await this.getBookings();
    return list.find(b => b.id === id) || null;
  },

  async createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const list = await this.getBookings();
    const newBooking: Booking = {
      ...data,
      id: `book_waa_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    list.unshift(newBooking);
    safeStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));

    // Auto-create a notification for the student
    await this.createNotification({
      title: 'Demande de visite transmise',
      message: `Votre demande pour le logement "${newBooking.propertyTitle}" le ${newBooking.date} à ${newBooking.timeSlot} a été transmise au propriétaire.`,
      type: 'system',
      relatedBookingId: newBooking.id,
      relatedPropertyId: newBooking.propertyId
    });

    return newBooking;
  },

  async updateBookingStatus(id: string, status: Booking['status'], reason?: string): Promise<Booking> {
    const list = await this.getBookings();
    const index = list.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Booking not found');

    list[index].status = status;
    if (reason) list[index].rejectionReason = reason;
    safeStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));

    // Add notification
    const booking = list[index];
    let title = 'Mise à jour de visite';
    let msg = `Le statut de votre visite pour ${booking.propertyTitle} est passé à : ${status}.`;

    if (status === 'confirmed') {
      title = 'Visite confirmée !';
      msg = `Bonne nouvelle ! Le propriétaire a confirmé votre visite le ${booking.date} à ${booking.timeSlot}.`;
    } else if (status === 'cancelled') {
      title = 'Visite annulée';
      msg = `Votre visite pour ${booking.propertyTitle} a bien été annulée.`;
    }

    await this.createNotification({
      title,
      message: msg,
      type: status === 'confirmed' ? 'booking_confirmed' : 'system',
      relatedBookingId: booking.id,
      relatedPropertyId: booking.propertyId
    });

    return list[index];
  },

  // FAVORITES
  async getFavoriteIds(): Promise<string[]> {
    const str = safeStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]';
    try {
      return JSON.parse(str);
    } catch {
      return INITIAL_FAVORITE_IDS;
    }
  },

  async toggleFavorite(propertyId: string): Promise<boolean> {
    const favs = await this.getFavoriteIds();
    const exists = favs.includes(propertyId);
    let updated: string[];
    if (exists) {
      updated = favs.filter(id => id !== propertyId);
    } else {
      updated = [...favs, propertyId];
    }
    safeStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return !exists;
  },

  // NOTIFICATIONS
  async getNotifications(): Promise<NotificationItem[]> {
    const str = safeStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]';
    try {
      const list: NotificationItem[] = JSON.parse(str);
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return [];
    }
  },

  async markNotificationAsRead(id: string): Promise<void> {
    const list = await this.getNotifications();
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
    safeStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  },

  async markAllNotificationsAsRead(): Promise<void> {
    const list = await this.getNotifications();
    const updated = list.map(n => ({ ...n, read: true }));
    safeStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  },

  async deleteNotification(id: string): Promise<void> {
    const list = await this.getNotifications();
    const updated = list.filter(n => n.id !== id);
    safeStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  },

  async createNotification(data: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>): Promise<NotificationItem> {
    const list = await this.getNotifications();
    const newNotif: NotificationItem = {
      ...data,
      id: `notif_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    list.unshift(newNotif);
    safeStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return newNotif;
  }
};
