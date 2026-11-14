export type CurrencyCode =
  | 'USD' | 'EUR' | 'GBP' | 'NGN' | 'JPY' | 'CAD' | 'AUD'
  | 'CNY' | 'INR' | 'BRL' | 'ZAR' | 'KES' | 'GHS' | 'AED'
  | 'SGD' | 'HKD' | 'CHF' | 'SEK' | 'NOK' | 'DKK' | 'PLN'
  | string;

export interface Money {
  minorUnits: number;
  currency: CurrencyCode;
}

export interface Price {
  minorUnits: number;
  currency: CurrencyCode;
}

export interface Country {
  code: string;
  name: string;
}

export interface Region {
  code: string;
  name: string;
  countryCode: string;
}

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  minorUnitDigits: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: Money;
  images: string[];
  category: string;
  sellerId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isDemo: boolean;
}

export interface Seller {
  id: string;
  name: string;
  tagline: string;
  location: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  joined: string;
  isVerified: boolean;
  isDemo: boolean;
}

export interface Agent {
  id: string;
  name: string;
  specialty: string;
  location: string;
  avatar: string;
  commissionRate: number;
  rating: number;
  reviewCount: number;
  isDemo: boolean;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  videoCount: number;
  followerCount: number;
  rating: number;
  isDemo: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface UserPreferences {
  displayCurrency: CurrencyCode;
  locale: string;
  timeZone: string;
  theme: 'light' | 'dark' | 'system';
}

export interface RouteMeta {
  path: string;
  label: string;
}

export interface DemoLabel {
  readonly isDemo: true;
  readonly source: 'demonstration';
}
