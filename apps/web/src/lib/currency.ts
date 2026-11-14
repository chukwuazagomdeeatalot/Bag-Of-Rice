import type { CurrencyCode, Money, CurrencyInfo } from '@/types/index';

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', minorUnitDigits: 2 },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', minorUnitDigits: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', minorUnitDigits: 2 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '\u20A6', minorUnitDigits: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', minorUnitDigits: 0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$', minorUnitDigits: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: '$', minorUnitDigits: 2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00A5', minorUnitDigits: 2 },
  { code: 'INR', name: 'Indian Rupee', symbol: '\u20B9', minorUnitDigits: 2 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', minorUnitDigits: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', minorUnitDigits: 2 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', minorUnitDigits: 2 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '\u20B5', minorUnitDigits: 2 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', minorUnitDigits: 2 },
];

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

export function getCurrencyInfo(code: CurrencyCode): CurrencyInfo {
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === code);
  return found ?? SUPPORTED_CURRENCIES.find((c) => c.code === DEFAULT_CURRENCY)!;
}

export function currencySymbol(code: CurrencyCode): string {
  return getCurrencyInfo(code).symbol;
}

export function isValidCurrency(code: string): code is CurrencyCode {
  return SUPPORTED_CURRENCIES.some((c) => c.code === code);
}

export function normalizeCurrency(code: string): CurrencyCode {
  const upper = code.toUpperCase();
  return isValidCurrency(upper) ? upper : DEFAULT_CURRENCY;
}

export function toMajorUnits(minorUnits: number, currency: CurrencyCode): number {
  const digits = getCurrencyInfo(currency).minorUnitDigits;
  return minorUnits / Math.pow(10, digits);
}

export function toMinorUnits(majorUnits: number, currency: CurrencyCode): number {
  const digits = getCurrencyInfo(currency).minorUnitDigits;
  return Math.round(majorUnits * Math.pow(10, digits));
}

export function createMoney(minorUnits: number, currency: CurrencyCode): Money {
  return { minorUnits: Math.trunc(minorUnits), currency: normalizeCurrency(currency) };
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot add amounts in different currencies: ${a.currency} and ${b.currency}`);
  }
  return createMoney(a.minorUnits + b.minorUnits, a.currency);
}

export function subtractMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot subtract amounts in different currencies: ${a.currency} and ${b.currency}`);
  }
  return createMoney(a.minorUnits - b.minorUnits, a.currency);
}

export function formatMoney(
  amount: Money,
  options: { locale?: string; currency?: CurrencyCode; showSymbol?: boolean } = {},
): string {
  const currency = options.currency ?? amount.currency;
  const locale = options.locale ?? 'en-US';
  const info = getCurrencyInfo(currency);
  const major = toMajorUnits(amount.minorUnits, currency);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: info.minorUnitDigits,
    maximumFractionDigits: info.minorUnitDigits,
    currencyDisplay: options.showSymbol === false ? 'code' : 'symbol',
  }).format(major);
}

export function formatMinorUnits(minorUnits: number, currency: CurrencyCode, options?: Parameters<typeof formatMoney>[1]): string {
  return formatMoney({ minorUnits, currency }, options);
}

export function parsePriceInput(value: string, currency: CurrencyCode): Money | null {
  const cleaned = value.replace(/[^0-9.,]/g, '');
  const parsed = Number(cleaned.replace(',', '.'));
  if (!Number.isFinite(parsed)) return null;
  return createMoney(toMinorUnits(parsed, currency), currency);
}

export const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'pt', 'ar', 'zh', 'sw'];
export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_COUNTRIES: { code: string; name: string }[] = [
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
];

export function getCountryName(code: string): string {
  const found = SUPPORTED_COUNTRIES.find((c) => c.code === code.toUpperCase());
  return found ? found.name : code;
}

export const DEFAULT_TIME_ZONE = 'UTC';

export function formatDateTime(
  value: string | Date,
  options: { locale?: string; timeZone?: string } = {},
): string {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const timeZone = options.timeZone ?? DEFAULT_TIME_ZONE;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date(value));
}

export function formatDate(value: string | Date, options: { locale?: string; timeZone?: string } = {}): string {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const timeZone = options.timeZone ?? DEFAULT_TIME_ZONE;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone,
  }).format(new Date(value));
}

export function getUserTimeZone(): string {
  if (typeof Intl === 'undefined') return DEFAULT_TIME_ZONE;
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
