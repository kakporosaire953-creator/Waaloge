import { City, CityId } from '../types';

export interface NeighborhoodInfo {
  id: string;
  name: string;
  cityId: CityId;
  description: string;
  averageRent: string;
  campusProximity: string;
  transportHighlight: string;
  vibeTags: string[];
  safetyLevel: 'high' | 'medium';
  image: string;
}

export const CITIES: City[] = [
  {
    id: 'cotonou',
    name: 'Cotonou & Abomey-Calavi',
    country: 'Bénin 🇧🇯',
    currency: 'FCFA',
    currencySymbol: 'XOF',
    universities: [
      'UAC (Université d’Abomey-Calavi)',
      'ENEAM Gbégamey',
      'EPAC Calavi',
      'ISM Adonaï',
      'Pigier Bénin',
      'IRGIB Africa'
    ]
  },
  {
    id: 'dakar',
    name: 'Dakar',
    country: 'Sénégal 🇸🇳',
    currency: 'FCFA',
    currencySymbol: 'XOF',
    universities: ['UCAD (Université Cheikh Anta Diop)', 'ESP Dakar', 'ISM', 'BEM Dakar', 'IAM']
  },
  {
    id: 'abidjan',
    name: 'Abidjan',
    country: "Côte d'Ivoire 🇨🇮",
    currency: 'FCFA',
    currencySymbol: 'XOF',
    universities: ['UFHB (Université Félix Houphouët-Boigny)', 'INP-HB', 'ESATIC', 'CERAP']
  },
  {
    id: 'lome',
    name: 'Lomé',
    country: 'Togo 🇹🇬',
    currency: 'FCFA',
    currencySymbol: 'XOF',
    universities: ['Université de Lomé (UL)', 'IAEC', 'ESGIS Lomé']
  }
];

export const NEIGHBORHOODS: NeighborhoodInfo[] = [
  // 1. BÉNIN - COTONOU & ABOMEY-CALAVI (CIBLE PRIORITAIRE #1)
  {
    id: 'calavi-uac-zogbadje',
    name: 'Abomey-Calavi (Zogbadjè & Campus UAC)',
    cityId: 'cotonou',
    description: 'Le cœur battant des étudiants de l’UAC. À 3 minutes à pied du portail principal et des amphis Idriss Déby. Logements neufs, restos universitaires, cybercafés et zémidjans 24h/24.',
    averageRent: '25 000 - 65 000 FCFA',
    campusProximity: '3 min à pied du campus UAC',
    transportHighlight: 'Zémidjans (Zems) & Taxis-motos omniprésents',
    vibeTags: ['100% Vie de Campus', 'Très économique', 'Épiceries & Restos U'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'calavi-tankpe-arconville',
    name: 'Abomey-Calavi (Tankpè & Arconville)',
    cityId: 'cotonou',
    description: 'Secteur résidentiel moderne très calme, apprécié pour ses mini-villas et studios carrelés avec forage d’eau continue et compteurs SBEE personnels.',
    averageRent: '35 000 - 80 000 FCFA',
    campusProximity: '8 min en Zem de l’UAC',
    transportHighlight: 'Motos-taxis réguliers & Voie pavée',
    vibeTags: ['Résidentiel', 'Calme pour réviser', 'Eau forage garantie'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cotonou-gbegamey-haie-vive',
    name: 'Cotonou (Gbégamey & Haie Vive)',
    cityId: 'cotonou',
    description: 'Emplacement de choix à Cotonou proche de l’ENEAM, ISM Adonaï et Pigier. Idéal pour étudiants en gestion, finance et écoles supérieures privées.',
    averageRent: '65 000 - 140 000 FCFA',
    campusProximity: '5 min à pied de l’ENEAM & ISM Adonaï',
    transportHighlight: 'Taxis ville, Minibus Tokpa-Tokpa & Zems',
    vibeTags: ['Grandes Écoles', 'Commerces & Cafés', 'Standing Sécurisé'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cotonou-akpakpa-agbato',
    name: 'Cotonou (Akpakpa & PK3)',
    cityId: 'cotonou',
    description: 'Zone accessible et bien desservie, proche des instituts polytechniques et du centre des affaires de Cotonou.',
    averageRent: '45 000 - 95 000 FCFA',
    campusProximity: '12 min des facultés de médecine & IRGIB',
    transportHighlight: 'Bus urbains & Axe routier principal',
    vibeTags: ['Accessible', 'Dynamique', 'Bord lagunaire'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },

  // 2. SÉNÉGAL - DAKAR
  {
    id: 'fann-point-e',
    name: 'Fann Résidence & Point E',
    cityId: 'dakar',
    description: 'Le quartier étudiant et résidentiel par excellence à Dakar. Calme, sécurisé et à 5 minutes à pied des facultés de l’UCAD.',
    averageRent: '90 000 - 160 000 FCFA',
    campusProximity: '5 à 10 min à pied de l’UCAD',
    transportHighlight: 'Lignes DDD 1, 3, 10 + Taxis Clando',
    vibeTags: ['Très proche campus', 'Calme', 'Étudiants & Chercheurs'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ouakam-mermoz',
    name: 'Ouakam / Mermoz',
    cityId: 'dakar',
    description: 'Quartier vivant et dynamique avec une excellente offre de studios étudiants, commerces de proximité et accès rapide à la corniche.',
    averageRent: '75 000 - 130 000 FCFA',
    campusProximity: '12 min en bus / 20 min à pied',
    transportHighlight: 'Bus Tata 218, 44 & Taxis express',
    vibeTags: ['Vivant', 'Bon rapport qualité/prix', 'Commerces 24/7'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },

  // 3. CÔTE D'IVOIRE - ABIDJAN
  {
    id: 'cocody-danga',
    name: 'Cocody Danga & Université',
    cityId: 'abidjan',
    description: 'Le cœur universitaire historique d’Abidjan. Verdoyant, aéré, directement connecté au campus de l’UFHB.',
    averageRent: '70 000 - 140 000 FCFA',
    campusProximity: '5 à 12 min à pied de l’UFHB',
    transportHighlight: 'SOTRA Bus Express & Wôro-Wôro',
    vibeTags: ['Cœur universitaire', 'Sécurisé', 'Verdure'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
  },

  // 4. TOGO - LOMÉ
  {
    id: 'lome-campus-tokoin',
    name: 'Tokoin & Campus UL',
    cityId: 'lome',
    description: 'À proximité directe des facultés de l’Université de Lomé.',
    averageRent: '30 000 - 75 000 FCFA',
    campusProximity: '5 min de l’UL',
    transportHighlight: 'Taxis motos Olé & Zems',
    vibeTags: ['Université de Lomé', 'Pratique', 'Marchés'],
    safetyLevel: 'high',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  }
];
