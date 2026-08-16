export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    // Navigation
    nav_home: 'Accueil',
    nav_explore: 'Explorer',
    nav_favorites: 'Favoris',
    nav_bookings: 'Mes visites',
    nav_notifications: 'Notifications',
    nav_profile: 'Profil',
    nav_how_it_works: 'Comment ça marche',
    nav_login: 'Se connecter',
    nav_register: "S'inscrire",
    nav_logout: 'Déconnexion',

    // Hero & Story
    hero_badge: 'Plateforme certifiée logement étudiant',
    hero_title: 'Ton prochain chez-toi commence ici.',
    hero_subtitle: "Trouve un logement adapté à ta vie étudiante, découvre ton futur quartier et réserve ta visite vérifiée avant même d'arriver.",
    hero_search_placeholder: 'Rechercher par quartier, université...',
    hero_cta_search: 'Trouver mon logement',
    hero_cta_how: 'Comment ça marche ?',

    // Search bar
    search_city: 'Ville',
    search_neighborhood: 'Quartier',
    search_all_neighborhoods: 'Tous les quartiers',
    search_type: 'Type de logement',
    search_all_types: 'Tous les types',
    search_max_budget: 'Budget maximum',
    search_button: 'Rechercher',

    // Steps narrative
    journey_title: 'Un parcours pensé pour te rassurer',
    journey_subtitle: 'De ta recherche depuis ton pays ou ta ville d’origine jusqu’à la remise des clés.',
    step_1_title: '01. Je cherche',
    step_1_desc: 'Je renseigne mon quartier, mon budget et le type de logement que je recherche près de mon université.',
    step_2_title: '02. Je découvre',
    step_2_desc: 'Je consulte les photos réelles, équipements, avis, distance à pied du campus et informations du quartier.',
    step_3_title: '03. Je réserve',
    step_3_desc: 'Je choisis un créneau horaire disponible pour visiter sur place ou avec un garant sans payer d’avance illégale.',
    step_4_title: '04. Je m’installe',
    step_4_desc: 'Je rencontre le propriétaire ou le gestionnaire certifié et poursuis mon installation sereinement.',

    // Featured listings
    featured_title: 'Des logements qui pourraient te correspondre',
    featured_subtitle: 'Sélectionnés pour leur proximité des universités, leur sécurité et leur bon rapport qualité/prix.',
    view_all_listings: 'Voir tous les logements',

    // Trust pillars
    trust_title: 'Pourquoi Waaloge fait la différence',
    trust_1_title: 'Visites vérifiées & sans pièges',
    trust_1_desc: 'Chaque annonce est vérifiée. Aucun paiement préalable n’est exigé pour une simple visite.',
    trust_2_title: 'Transparence eau & électricité',
    trust_2_desc: 'Type de compteur (Woyofal individuel/partagé), approvisionnement d’eau et charges clairement détaillés.',
    trust_3_title: 'Repères campus & transports',
    trust_3_desc: 'Calcul précis du temps de trajet à pied ou en bus jusqu’à tes amphis et bibliothèques.',

    // Neighborhoods guide
    neighborhoods_title: 'Les quartiers étudiants en vue',
    neighborhoods_subtitle: 'Découvre l’ambiance, les lignes de transport et le coût de la vie par secteur.',

    // Explore / Filters
    filters_title: 'Filtres de recherche',
    filters_reset: 'Réinitialiser',
    filter_price_range: 'Fourchette de prix (mensuel)',
    filter_property_type: 'Type de logement',
    filter_distance: 'Distance max au campus',
    filter_distance_10: 'Moins de 10 min à pied',
    filter_distance_20: 'Moins de 20 min à pied',
    filter_distance_any: 'Toutes distances',
    filter_amenities: 'Équipements indispensables',
    filter_availability: 'Disponibilité',
    sort_by: 'Trier par',
    sort_relevance: 'Pertinence',
    sort_price_asc: 'Prix : croissant',
    sort_price_desc: 'Prix : décroissant',
    sort_distance: 'Proximité campus',
    sort_rating: 'Meilleurs avis',

    // Property details
    property_verified_badge: 'Logement vérifié par Waaloge',
    property_per_month: '/ mois',
    property_charges: 'Charges',
    property_charges_included: 'Charges comprises',
    property_charges_extra: 'Charges en sus',
    property_deposit: 'Caution',
    property_surface: 'Superficie',
    property_floor: 'Étage',
    property_availability_label: 'Disponibilité',
    property_overview: 'Présentation du lieu de vie',
    property_amenities_title: 'Équipements & confort',
    property_location_title: 'Quartier & vie étudiante',
    property_landlord_title: 'Propriétaire certifié',
    property_reviews_title: 'Avis d’anciens locataires étudiants',
    property_no_reviews: 'Aucun avis pour l’instant. Sois le premier à visiter ce logement !',
    property_cta_book: 'Réserver une visite gratuite',
    property_back: 'Retour aux résultats',

    // Booking modal
    booking_modal_title: 'Réserver une visite',
    booking_step_1: '1. Date',
    booking_step_2: '2. Créneau',
    booking_step_3: '3. Coordonnées',
    booking_step_4: '4. Confirmation',
    booking_select_date: 'Choisis le jour de ta visite',
    booking_select_slot: 'Choisis une heure disponible',
    booking_student_info: 'Tes coordonnées pour la visite',
    booking_full_name: 'Nom & Prénom',
    booking_phone: 'Numéro de téléphone (WhatsApp)',
    booking_email: 'Adresse email',
    booking_university: 'Université ou École',
    booking_notes: 'Remarque ou question (facultatif)',
    booking_summary_title: 'Récapitulatif de la visite',
    booking_free_guarantee: 'Visite 100% gratuite • Aucun paiement préalable à distance',
    booking_submit: 'Confirmer ma demande de visite',
    booking_success_title: 'Demande de visite enregistrée !',
    booking_success_desc: 'Le propriétaire a reçu ta demande. Tu recevras une confirmation par SMS/WhatsApp et dans tes notifications.',
    booking_view_status: 'Suivre ma réservation',

    // Booking statuses
    status_pending: 'En attente',
    status_pending_desc: 'Ta demande est en cours de traitement par le propriétaire.',
    status_confirmed: 'Confirmée',
    status_confirmed_desc: 'Bonne nouvelle ! Ta visite est confirmée. Rendez-vous à l’heure convenue.',
    status_rejected: 'Refusée',
    status_rejected_desc: 'Ce créneau n’est plus disponible. Choisis un autre horaire.',
    status_completed: 'Terminée',
    status_cancelled: 'Annulée',

    // Student space / Dashboard
    dashboard_greeting: 'Bonjour',
    dashboard_next_visit: 'Ta prochaine visite',
    dashboard_no_next_visit: 'Tu n’as aucune visite planifiée pour le moment.',
    dashboard_find_property_cta: 'Explorer les logements disponibles',
    dashboard_all_bookings: 'Historique de mes visites',
    dashboard_my_favorites: 'Mes logements favoris',
    dashboard_view_details: 'Voir détails',
    dashboard_cancel_booking: 'Annuler la visite',

    // Favorites
    favorites_title: 'Mes favoris',
    favorites_empty_title: 'Tu n’as encore aucun favori.',
    favorites_empty_desc: 'Garde les logements qui te plaisent pour les retrouver et les comparer facilement.',
    favorites_browse_cta: 'Découvrir les logements',

    // Notifications
    notifications_title: 'Centre de notifications',
    notifications_empty: 'Aucune notification pour le moment.',
    notifications_mark_all_read: 'Tout marquer comme lu',
    notifications_delete: 'Supprimer',

    // Profile
    profile_title: 'Profil étudiant',
    profile_save: 'Enregistrer les modifications',
    profile_language: 'Langue de l’application',
    profile_status_verified: 'Étudiant vérifié',
    profile_api_settings: 'Paramètres de connexion API (Laravel Sanctum)',
    profile_api_mode_demo: 'Mode Démo interactif (Mock API conforme Sanctum)',
    profile_api_mode_custom: 'Serveur API Laravel personnalisé',

    // AI Assistant
    assistant_title: 'Assistant Waaloge',
    assistant_badge: 'Conseiller étudiant',
    assistant_welcome: 'Bonjour ! Je suis ton conseiller Waaloge. Une question sur un quartier, un contrat de bail, ou la réservation d’une visite ?',
    assistant_input_placeholder: 'Pose ta question ici...',
    assistant_whatsapp_negotiation_warn: 'Pour négocier le loyer ou discuter des modalités particulières avec le propriétaire, nous t’orientons directement vers le contact WhatsApp du gestionnaire officiel.',
    assistant_cta_whatsapp: 'Contacter le gestionnaire sur WhatsApp',

    // FAQ & How it works
    faq_title: 'Foire aux Questions (FAQ)',
    faq_subtitle: 'Toutes les réponses pour trouver et visiter ton logement sereinement.',

    // Common UI
    common_loading: 'Chargement des logements...',
    common_error_title: 'Une petite erreur est survenue.',
    common_error_desc: 'Nous n’avons pas réussi à charger les informations. Vérifie ta connexion puis réessaie.',
    common_retry: 'Réessayer',
    common_no_results: 'Aucun logement ne correspond à tes critères.',
    common_no_results_desc: 'Essaie d’élargir ta recherche ou de modifier tes filtres de budget et de quartier.',
    common_close: 'Fermer',
    common_back: 'Retour',
    common_confirm: 'Confirmer',
    common_cancel: 'Annuler',
    common_verified: 'Vérifié',
    common_month: 'mois',
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_explore: 'Explore',
    nav_favorites: 'Favorites',
    nav_bookings: 'My Visits',
    nav_notifications: 'Notifications',
    nav_profile: 'Profile',
    nav_how_it_works: 'How it Works',
    nav_login: 'Log In',
    nav_register: 'Sign Up',
    nav_logout: 'Log Out',

    // Hero & Story
    hero_badge: 'Certified Student Housing Platform',
    hero_title: 'Your next student home starts here.',
    hero_subtitle: 'Find housing tailored to your student life, discover your future neighborhood, and book a verified visit before you even arrive.',
    hero_search_placeholder: 'Search by neighborhood, university...',
    hero_cta_search: 'Find My Housing',
    hero_cta_how: 'How It Works?',

    // Search bar
    search_city: 'City',
    search_neighborhood: 'Neighborhood',
    search_all_neighborhoods: 'All neighborhoods',
    search_type: 'Housing type',
    search_all_types: 'All types',
    search_max_budget: 'Max budget',
    search_button: 'Search',

    // Steps narrative
    journey_title: 'A journey designed to reassure you',
    journey_subtitle: 'From your first search from home to receiving your room keys.',
    step_1_title: '01. I search',
    step_1_desc: 'I select my neighborhood, budget, and desired housing type near my university campus.',
    step_2_title: '02. I discover',
    step_2_desc: 'I check real photos, utilities, reviews, walking distance to campus, and neighborhood safety.',
    step_3_title: '03. I book',
    step_3_desc: 'I pick an available time slot to visit on-site with zero advance deposit fees.',
    step_4_title: '04. I settle in',
    step_4_desc: 'I meet the certified landlord or manager and complete my move-in with peace of mind.',

    // Featured listings
    featured_title: 'Homes that might suit you',
    featured_subtitle: 'Handpicked for their campus proximity, safety, and student-friendly pricing.',
    view_all_listings: 'View all listings',

    // Trust pillars
    trust_title: 'Why Waaloge makes the difference',
    trust_1_title: 'Verified visits & zero scam fees',
    trust_1_desc: 'Every listing is physically verified. No advance payment is ever demanded for a simple visit.',
    trust_2_title: 'Water & Electricity transparency',
    trust_2_desc: 'Meter type (individual prepaid vs shared), water tanks and monthly charges explicitly stated.',
    trust_3_title: 'Campus proximity & bus routes',
    trust_3_desc: 'Precise walking and transit time to your lecture halls and university library.',

    // Neighborhoods guide
    neighborhoods_title: 'Popular student quarters',
    neighborhoods_subtitle: 'Explore the atmosphere, transit lines, and student cost of living by district.',

    // Explore / Filters
    filters_title: 'Search Filters',
    filters_reset: 'Reset',
    filter_price_range: 'Monthly Price Range',
    filter_property_type: 'Housing Type',
    filter_distance: 'Max Distance to Campus',
    filter_distance_10: 'Under 10 min walking',
    filter_distance_20: 'Under 20 min walking',
    filter_distance_any: 'Any distance',
    filter_amenities: 'Essential Amenities',
    filter_availability: 'Availability',
    sort_by: 'Sort by',
    sort_relevance: 'Relevance',
    sort_price_asc: 'Price: Low to High',
    sort_price_desc: 'Price: High to Low',
    sort_distance: 'Campus proximity',
    sort_rating: 'Top rated',

    // Property details
    property_verified_badge: 'Verified by Waaloge',
    property_per_month: '/ month',
    property_charges: 'Utilities',
    property_charges_included: 'Utilities included',
    property_charges_extra: 'Utilities extra',
    property_deposit: 'Deposit',
    property_surface: 'Area',
    property_floor: 'Floor',
    property_availability_label: 'Availability',
    property_overview: 'Living Space Overview',
    property_amenities_title: 'Amenities & Utilities',
    property_location_title: 'Neighborhood & Student Life',
    property_landlord_title: 'Certified Landlord',
    property_reviews_title: 'Reviews from Student Tenants',
    property_no_reviews: 'No reviews yet. Be the first student to visit this place!',
    property_cta_book: 'Book a Free Visit',
    property_back: 'Back to results',

    // Booking modal
    booking_modal_title: 'Book a Visit',
    booking_step_1: '1. Date',
    booking_step_2: '2. Time Slot',
    booking_step_3: '3. Contact Info',
    booking_step_4: '4. Confirm',
    booking_select_date: 'Select your visit date',
    booking_select_slot: 'Select an available time slot',
    booking_student_info: 'Your contact details for the visit',
    booking_full_name: 'Full Name',
    booking_phone: 'Phone Number (WhatsApp)',
    booking_email: 'Email Address',
    booking_university: 'University or College',
    booking_notes: 'Note or questions (optional)',
    booking_summary_title: 'Visit Summary',
    booking_free_guarantee: '100% Free visit • No advance payment requested',
    booking_submit: 'Confirm My Visit Request',
    booking_success_title: 'Visit request submitted!',
    booking_success_desc: 'The landlord has received your request. You will receive confirmation via SMS/WhatsApp and in your notifications.',
    booking_view_status: 'Track my booking',

    // Booking statuses
    status_pending: 'Pending',
    status_pending_desc: 'Your request is being reviewed by the landlord.',
    status_confirmed: 'Confirmed',
    status_confirmed_desc: 'Great news! Your visit is confirmed. See you at the scheduled time.',
    status_rejected: 'Declined',
    status_rejected_desc: 'This slot is no longer available. Please select another time.',
    status_completed: 'Completed',
    status_cancelled: 'Cancelled',

    // Student space / Dashboard
    dashboard_greeting: 'Hello',
    dashboard_next_visit: 'Your Next Scheduled Visit',
    dashboard_no_next_visit: 'You have no scheduled visits at the moment.',
    dashboard_find_property_cta: 'Explore available housing',
    dashboard_all_bookings: 'My Visit History',
    dashboard_my_favorites: 'My Saved Properties',
    dashboard_view_details: 'View details',
    dashboard_cancel_booking: 'Cancel visit',

    // Favorites
    favorites_title: 'My Favorites',
    favorites_empty_title: 'You have no favorites yet.',
    favorites_empty_desc: 'Save the places you like to easily find and compare them.',
    favorites_browse_cta: 'Discover Housing',

    // Notifications
    notifications_title: 'Notification Center',
    notifications_empty: 'No notifications at the moment.',
    notifications_mark_all_read: 'Mark all as read',
    notifications_delete: 'Delete',

    // Profile
    profile_title: 'Student Profile',
    profile_save: 'Save Changes',
    profile_language: 'App Language',
    profile_status_verified: 'Verified Student',
    profile_api_settings: 'API Connection Settings (Laravel Sanctum)',
    profile_api_mode_demo: 'Interactive Demo Mode (Sanctum-compliant Mock API)',
    profile_api_mode_custom: 'Custom Laravel API Server',

    // AI Assistant
    assistant_title: 'Waaloge Assistant',
    assistant_badge: 'Student Advisor',
    assistant_welcome: 'Hello! I am your Waaloge student advisor. Have questions about neighborhoods, lease contracts, or booking a visit?',
    assistant_input_placeholder: 'Ask your question here...',
    assistant_whatsapp_negotiation_warn: 'To negotiate rent or discuss custom terms with the landlord, we connect you directly to the verified manager on WhatsApp.',
    assistant_cta_whatsapp: 'Contact Manager on WhatsApp',

    // FAQ & How it works
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Everything you need to know to find and visit your student home safely.',

    // Common UI
    common_loading: 'Loading listings...',
    common_error_title: 'Something went wrong.',
    common_error_desc: 'We could not load the listings. Please check your connection and retry.',
    common_retry: 'Retry',
    common_no_results: 'No listings match your search criteria.',
    common_no_results_desc: 'Try broadening your search or adjusting your budget and neighborhood filters.',
    common_close: 'Close',
    common_back: 'Back',
    common_confirm: 'Confirm',
    common_cancel: 'Cancel',
    common_verified: 'Verified',
    common_month: 'month',
  }
};
