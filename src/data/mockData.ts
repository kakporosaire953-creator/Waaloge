import { Property, User, Booking, NotificationItem } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_student_01',
  name: 'Rodrigue Dossou',
  email: 'rodrigue.dossou@etudiant.waaloge.com',
  phone: '+229 97 45 89 12',
  whatsapp: '+229 97 45 89 12',
  city: 'cotonou',
  university: 'Université d’Abomey-Calavi (UAC) / EPAC',
  fieldOfStudy: 'Génie Informatique & Télécoms',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  identityVerified: true,
  role: 'student',
  createdAt: '2026-06-15'
};

export const INITIAL_FAVORITE_IDS: string[] = ['prop_photo_01'];

export const INITIAL_PROPERTIES: Property[] = [
  // 1. Studio meublé moderne (Exact match with photo)
  {
    id: 'prop_photo_01',
    title: 'Studio meublé moderne',
    type: 'studio',
    price: 85000,
    currency: 'FCFA',
    chargesIncluded: true,
    chargesAmount: 5000,
    depositMonths: 2,
    city: 'cotonou',
    neighborhood: 'Zogona, Ouagadougou',
    address: 'Rue 14.85, Secteur 13, Zogona',
    distanceToCampus: '1,2 km du campus',
    campusMinutesWalk: 12,
    nearestUniversity: 'Université Joseph Ki-Zerbo / UAC',
    surface: 28,
    floor: 1,
    availability: 'disponible',
    availableDate: 'Immédiatement',
    isFeatured: true,
    virtualTourAvailable: true,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Studio étudiant moderne tout équipé. Lit 2 places grand confort avec literie soignée, bureau de travail, salle d’eau privative et connexion Wi-Fi haut débit incluse.',
    amenities: [
      'Studio',
      '1 SDB',
      'Wi-Fi haut débit',
      'Eau courante 24h/24',
      'Lit double avec matelas orthopédique',
      'Placards de rangement',
      'Gardiennage & sécurité'
    ],
    waterSupply: 'château',
    electricityType: 'compteur_individuel',
    transportInfo: [
      '1,2 km de l’université',
      'Transports et taxis à 50m',
      'Supérettes et restaurants à proximité immédiate'
    ],
    safetyNotes: 'Immeuble sécurisé avec digicode et gardien 24h/24.',
    availableTimeSlots: ['09:00', '11:00', '14:30', '16:30', '18:00'],
    landlord: {
      id: 'landlord_01',
      name: 'M. Ouedraogo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      memberSince: '2024-02-15',
      responseRate: 98,
      responseTime: 'Moins de 15 min',
      totalProperties: 4,
      phoneContact: '+229 97 12 34 56',
      whatsappContact: '+229 97 12 34 56',
      verifiedBadgeText: 'Propriétaire Certifié Waaloge'
    },
    reviews: [
      {
        id: 'rev_01',
        authorName: 'Aminata K.',
        authorUniversity: 'Génie Civil',
        rating: 5,
        date: 'Août 2026',
        comment: 'Grâce à Waaloge, j’ai trouvé mon studio avant même d’arriver à Ouaga. La visite s’est très bien passée et le logement est exactement comme sur les photos !',
        stayDuration: '1 an de location'
      }
    ]
  },

  // 2. Chambre ventilée (Exact match with photo)
  {
    id: 'prop_photo_02',
    title: 'Chambre ventilée',
    type: 'chambre',
    price: 60000,
    currency: 'FCFA',
    chargesIncluded: true,
    chargesAmount: 3000,
    depositMonths: 2,
    city: 'cotonou',
    neighborhood: 'Ouaga 2000',
    address: 'Avenue Pascal Zagré, Ouaga 2000',
    distanceToCampus: '2,5 km du campus',
    campusMinutesWalk: 25,
    nearestUniversity: 'Campus Ouaga 2000',
    surface: 20,
    floor: 'RDC',
    availability: 'disponible',
    availableDate: 'Immédiatement',
    isFeatured: true,
    virtualTourAvailable: false,
    rating: 4.8,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chambre propre et aérée avec grandes fenêtres et rideaux occultants. Salle de bain privative avec eau 24h/24, ventilateur de plafond silencieux et cour pavée très calme.',
    amenities: [
      'Chambre',
      '1 SDB',
      'Eau 24h/24',
      'Ventilateur de plafond',
      'Sanitaires intégrés',
      'Cour clôturée et sécurisée'
    ],
    waterSupply: 'château',
    electricityType: 'compteur_individuel',
    transportInfo: [
      '2,5 km du campus universitaire',
      'Arrêt de bus et taxi direct',
      'Zone très paisible et résidentielle'
    ],
    safetyNotes: 'Quartier hautement sécurisé, portail fermé en permanence.',
    availableTimeSlots: ['08:30', '10:30', '15:00', '17:00'],
    landlord: {
      id: 'landlord_02',
      name: 'Mme Sawadogo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      memberSince: '2024-03-01',
      responseRate: 100,
      responseTime: 'Moins de 10 min',
      totalProperties: 2,
      phoneContact: '+229 96 23 45 67',
      whatsappContact: '+229 96 23 45 67',
      verifiedBadgeText: 'Propriétaire Certifié Waaloge'
    },
    reviews: [
      {
        id: 'rev_02',
        authorName: 'Issa T.',
        authorUniversity: 'Informatique',
        rating: 5,
        date: 'Juillet 2026',
        comment: 'Le processus de réservation est simple et l’équipe est vraiment réactive. Je recommande à tous les nouveaux étudiants !',
        stayDuration: '6 mois'
      }
    ]
  },

  // 3. Appartement 2 pièces (Exact match with photo)
  {
    id: 'prop_photo_03',
    title: 'Appartement 2 pièces',
    type: 'appartement',
    price: 120000,
    currency: 'FCFA',
    chargesIncluded: false,
    depositMonths: 2,
    city: 'cotonou',
    neighborhood: 'Koulouba',
    address: 'Boulevard de la Révolution, Koulouba',
    distanceToCampus: '3,1 km du campus',
    campusMinutesWalk: 30,
    nearestUniversity: 'Université Centrale',
    surface: 52,
    floor: 2,
    availability: 'bientot_disponible',
    availableDate: '1er Septembre 2026',
    isFeatured: true,
    virtualTourAvailable: true,
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Bel appartement 2 pièces lumineux avec salon spacieux meublé d’un canapé moderne, chambre indépendante avec placards, 2 salles de bain et cuisine américaine équipée.',
    amenities: [
      '2 pièces',
      '2 SDB',
      'Cuisine équipée',
      'Salon meublé',
      'Chambre climatisée',
      'Balcon privé',
      'Parking gardé'
    ],
    waterSupply: '24h/24',
    electricityType: 'compteur_individuel',
    transportInfo: [
      '3,1 km du pôle universitaire',
      'Ligne de transport direct',
      'Banques, commerces et pharmacie à pied'
    ],
    safetyNotes: 'Gardiennage 24/7 et visiophone à l’entrée.',
    availableTimeSlots: ['10:00', '12:00', '15:30', '17:30'],
    landlord: {
      id: 'landlord_03',
      name: 'Dr. Compaoré',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      memberSince: '2023-11-20',
      responseRate: 96,
      responseTime: 'Dans l’heure',
      totalProperties: 6,
      phoneContact: '+229 95 34 56 78',
      whatsappContact: '+229 95 34 56 78',
      verifiedBadgeText: 'Propriétaire Certifié Waaloge'
    },
    reviews: [
      {
        id: 'rev_03',
        authorName: 'Mariam D.',
        authorUniversity: 'Droit',
        rating: 5,
        date: 'Juin 2026',
        comment: 'J’ai pu comparer plusieurs logements et choisir celui qui correspondait à mon budget et mon emplacement. Très bonne expérience.',
        stayDuration: '2 ans'
      }
    ]
  },

  // 4. Studio cosy (Exact match with photo)
  {
    id: 'prop_photo_04',
    title: 'Studio cosy',
    type: 'studio',
    price: 75000,
    currency: 'FCFA',
    chargesIncluded: true,
    chargesAmount: 4000,
    depositMonths: 2,
    city: 'cotonou',
    neighborhood: 'Patte d’oie',
    address: 'Carrefour Patte d’oie, Résidence Les Palmiers',
    distanceToCampus: '1,9 km du campus',
    campusMinutesWalk: 18,
    nearestUniversity: 'Campus Sud',
    surface: 25,
    floor: 1,
    availability: 'disponible',
    availableDate: 'Immédiatement',
    isFeatured: true,
    virtualTourAvailable: true,
    rating: 4.8,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Charmant studio cosy décoré avec goût, canapé confortable, table basse, salle d’eau privative et balcon agréable avec vue dégagée. Calme et propice aux études.',
    amenities: [
      'Studio',
      '1 SDB',
      'Balcon privatif',
      'Wi-Fi disponible',
      'Espace cuisine aménagé',
      'Château d’eau autonome'
    ],
    waterSupply: 'château',
    electricityType: 'compteur_individuel',
    transportInfo: [
      '1,9 km des facultés',
      'Proche axes principaux et commerces',
      'Motos-taxis disponibles en continu'
    ],
    safetyNotes: 'Clôture électrifiée et service de conciergerie.',
    availableTimeSlots: ['09:30', '11:30', '14:00', '16:00'],
    landlord: {
      id: 'landlord_04',
      name: 'Mme Kaboré',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      memberSince: '2024-01-05',
      responseRate: 99,
      responseTime: 'Moins de 20 min',
      totalProperties: 3,
      phoneContact: '+229 97 78 90 12',
      whatsappContact: '+229 97 78 90 12',
      verifiedBadgeText: 'Propriétaire Certifié Waaloge'
    },
    reviews: [
      {
        id: 'rev_04',
        authorName: 'Rodrigue Dossou',
        authorUniversity: 'Informatique',
        rating: 5,
        date: 'Mai 2026',
        comment: 'Très propre, lumineux et sécurisé. La réservation a pris 2 minutes sur Waaloge.',
        stayDuration: '1 an'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book_01',
    propertyId: 'prop_photo_01',
    propertyTitle: 'Studio meublé moderne',
    propertyType: 'studio',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    propertyPrice: 85000,
    propertyCurrency: 'FCFA',
    neighborhood: 'Zogona, Ouagadougou',
    city: 'cotonou',
    landlordName: 'M. Ouedraogo',
    landlordPhone: '+229 97 12 34 56',
    date: '2026-08-22',
    timeSlot: '10:30',
    status: 'confirmed',
    createdAt: '2026-08-16',
    studentName: 'Rodrigue Dossou',
    studentPhone: '+229 97 45 89 12',
    studentEmail: 'rodrigue.dossou@etudiant.waaloge.com',
    meetingPoint: 'Devant l’entrée principale du bâtiment',
    notes: 'Visite pour emménagement rentrée universitaire.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Visite confirmée ! 🎉',
    message: 'Votre visite pour "Studio meublé moderne" est validée pour le 22 Août à 10:30.',
    type: 'booking_confirmed',
    read: false,
    createdAt: 'Il y a 10 min',
    relatedBookingId: 'book_01'
  },
  {
    id: 'notif_02',
    title: 'Bienvenue sur Waaloge',
    message: 'Découvrez des milliers de logements vérifiés pour étudiants.',
    type: 'system',
    read: true,
    createdAt: 'Hier'
  }
];
