import type { Country } from '@/types/index';

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GH', name: 'Ghana' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SG', name: 'Singapore' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'EG', name: 'Egypt' },
  { code: 'UG', name: 'Uganda' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'CM', name: 'Cameroon' },
];

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase());
}

export function findCountryByName(name: string): Country | undefined {
  return COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function regionForCountry(code: string): string {
  const upper = code.toUpperCase();
  if (['NG', 'GH', 'KE', 'UG', 'TZ', 'RW', 'CM', 'EG', 'PK'].includes(upper)) return 'Africa';
  if (['US', 'CA'].includes(upper)) return 'North America';
  if (['GB', 'FR', 'DE', 'ES', 'IT', 'NL'].includes(upper)) return 'Europe';
  if (['IN', 'CN', 'JP', 'SG', 'PK'].includes(upper)) return 'Asia';
  if (['AU'].includes(upper)) return 'Oceania';
  if (['BR'].includes(upper)) return 'South America';
  if (['AE'].includes(upper)) return 'Middle East';
  return 'International';
}

export const DEFAULT_COUNTRY = 'US';
