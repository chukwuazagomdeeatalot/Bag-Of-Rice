
const strings: Record<string, Record<string, string>> = {
  en: {
    brandName: 'Bag Of Rice',
    slogan: 'One Platform. Endless Opportunities.',
    home: 'Home',
    marketplace: 'Marketplace',
    sellers: 'Sellers',
    agents: 'Agents',
    creators: 'Creators',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    ownerDashboard: 'Owner Dashboard',
    searchPlaceholder: 'Search products, sellers, creators...',
    categories: 'Categories',
    featuredProducts: 'Featured Products',
    trendingProducts: 'Trending Products',
    recommendedSellers: 'Recommended Sellers',
    topAgents: 'Top Agents',
    trendingCreators: 'Trending Creators',
    promotions: 'Promotions',
    aiAssistant: 'AI Shopping Assistant',
    customerSupport: 'Customer Support',
    comingSoon: 'Coming Soon',
    currencySelector: 'Currency',
    languageSelector: 'Language',
    themeToggle: 'Toggle theme',
    menu: 'Menu',
    close: 'Close',
    addToCart: 'Add to cart',
    viewDetails: 'View details',
    shopNow: 'Shop now',
    learnMore: 'Learn more',
    sendMessage: 'Send message',
    demoLabel: 'Demonstration data',
    loginPlaceholder: 'Login interface coming soon. Real authorization will be implemented in a later phase.',
    registerPlaceholder: 'Registration interface coming soon. Real authorization will be implemented in a later phase.',
    ownerPlaceholder: 'Owner dashboard placeholder. Protected design only. Real authorization will be implemented in a later phase.',
    noResults: 'No results found.',
    emptyCart: 'Your cart is empty.',
    errorLoading: 'Unable to load content. Please try again later.',
    contactName: 'Full name',
    contactEmail: 'Email address',
    contactMessage: 'Message',
    contactSubmit: 'Send message',
    contactNote: 'This contact form is a design placeholder. No messages are sent.',
  },
  fr: {
    brandName: 'Bag Of Rice',
    slogan: 'Une plateforme. Des opportunits sans fin.',
    home: 'Accueil',
    marketplace: 'March',
    sellers: 'Vendeurs',
    agents: 'Agents',
    creators: 'Crators',
    about: 'propos',
    contact: 'Contact',
    login: 'Connexion',
    register: "S'inscrire",
    ownerDashboard: 'Tableau de bord du propritiaire',
    searchPlaceholder: 'Chercher produits, vendeurs, crateurs...',
    categories: 'Catgories',
    featuredProducts: 'Produits en vedette',
    trendingProducts: 'Produits tendance',
    recommendedSellers: 'Vendeurs recommands',
    topAgents: 'Meilleurs agents',
    trendingCreators: 'Crators en vedette',
    promotions: 'Promotions',
    aiAssistant: 'Assistant dachat IA',
    customerSupport: 'Assistance clientle',
    comingSoon: 'Bientt',
    currencySelector: 'Devise',
    languageSelector: 'Langue',
    themeToggle: 'Changer de thme',
    menu: 'Menu',
    close: 'Fermer',
    addToCart: 'Ajouter au panier',
    viewDetails: 'Voir les dtails',
    shopNow: 'Acheter maintenant',
    learnMore: 'En savoir plus',
    sendMessage: 'Envoyer un message',
    demoLabel: 'Donnes de dmonstration',
    loginPlaceholder: 'Interface de connexion bientt disponible.',
    registerPlaceholder: "Interface d'inscription bientt disponible.",
    ownerPlaceholder: 'Espace propritiaire (emplacement de conception).',
    noResults: 'Aucun rsultat trouv.',
    emptyCart: 'Votre panier est vide.',
    errorLoading: 'Impossible de charger le contenu. Veuillez ressayer plus tard.',
    contactName: 'Nom complet',
    contactEmail: 'Adresse e-mail',
    contactMessage: 'Message',
    contactSubmit: 'Envoyer le message',
    contactNote: 'Ce formulaire de contact est un emplacement de conception.',
  },
};

export const DEFAULT_LOCALE = 'en';

export type StringKey = keyof (typeof strings)[typeof DEFAULT_LOCALE];

export function t(key: StringKey, locale: string = DEFAULT_LOCALE): string {
  const byLocale = strings[locale];
  if (byLocale && key in byLocale) return byLocale[key];
  const fallback = strings[DEFAULT_LOCALE];
  return fallback[key] ?? key;
}

export function supportedLocales(): string[] {
  return Object.keys(strings);
}

export function isSupportedLocale(locale: string): boolean {
  return locale in strings;
}
