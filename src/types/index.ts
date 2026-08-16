export type CityId = 'dakar' | 'saint-louis' | 'thies' | 'ziguinchor' | 'abidjan' | 'cotonou' | 'yaounde' | 'lome';

export interface City {
  id: CityId;
  name: string;
  country: string;
  currency: string;
  currencySymbol: string;
  universities: string[];
}

export type PropertyType = 'chambre' | 'studio' | 'colocation' | 'appartement';

export type AvailabilityStatus = 'disponible' | 'bientot_disponible' | 'reserve';

export interface Landlord {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
  memberSince: string;
  responseRate: number; // in percentage e.g. 98
  responseTime: string; // e.g. "Moins de 2h"
  totalProperties: number;
  phoneContact?: string;
  whatsappContact?: string;
  verifiedBadgeText: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorUniversity: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  stayDuration: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'essential' | 'comfort' | 'safety';
  icon: string;
  description?: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number; // In local currency per month
  currency: string;
  chargesIncluded: boolean;
  chargesAmount?: number;
  depositMonths: number; // usually 1 or 2 months
  city: CityId;
  neighborhood: string;
  address: string;
  distanceToCampus: string; // e.g. "7 min à pied de l'UCAD"
  campusMinutesWalk: number;
  nearestUniversity: string;
  surface: number; // in m2
  floor?: number | string;
  availability: AvailabilityStatus;
  availableDate: string;
  images: string[];
  description: string;
  amenities: string[];
  landlord: Landlord;
  reviews: Review[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  virtualTourAvailable?: boolean;
  transportInfo: string[];
  safetyNotes: string;
  waterSupply: '24h/24' | 'citerne' | 'château';
  electricityType: 'compteur_individuel' | 'woyofal_partage' | 'inclus';
  availableTimeSlots: string[]; // e.g. ["09:00", "11:30", "14:30", "16:30"]
}

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: PropertyType;
  propertyImage: string;
  propertyPrice: number;
  propertyCurrency: string;
  neighborhood: string;
  city: CityId;
  landlordName: string;
  landlordPhone?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  status: BookingStatus;
  createdAt: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  studentUniversity?: string;
  notes?: string;
  meetingPoint: string;
  rejectionReason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  city: CityId;
  university?: string;
  fieldOfStudy?: string;
  avatar?: string;
  identityVerified?: boolean;
  role: 'student' | 'landlord' | 'admin';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking_confirmed' | 'booking_rejected' | 'booking_reminder' | 'price_alert' | 'system';
  relatedBookingId?: string;
  relatedPropertyId?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface SearchFilters {
  city: CityId;
  query: string;
  neighborhood: string;
  type: PropertyType | 'all';
  minPrice: number;
  maxPrice: number;
  maxDistanceMinutes: number;
  availability?: AvailabilityStatus | 'all';
  amenities?: string[];
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'distance' | 'rating';
}
