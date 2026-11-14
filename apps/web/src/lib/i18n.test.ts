import { describe, it, expect } from 'vitest';
import { t, supportedLocales, isSupportedLocale, DEFAULT_LOCALE } from '@/lib/i18n';

describe('t', () => {
  it('returns English strings by default', () => {
    expect(t('brandName')).toBe('Bag Of Rice');
    expect(t('slogan')).toBe('One Platform. Endless Opportunities.');
    expect(t('loginPlaceholder')).toContain('later phase');
  });

  it('returns French strings for supported locale', () => {
    expect(t('brandName', 'fr')).toBe('Bag Of Rice');
    expect(t('home', 'fr')).toBe('Accueil');
  });

  it('falls back to English for missing keys', () => {
    expect(t('brandName' as any, 'xx')).toBe('Bag Of Rice');
  });

  it('falls back to English for unsupported locale', () => {
    expect(t('home', 'pt')).toBe('Home');
  });
});

describe('locales', () => {
  it('lists supported locales including English', () => {
    expect(supportedLocales()).toContain('en');
    expect(supportedLocales()).toContain('fr');
  });

  it('validates supported locales', () => {
    expect(isSupportedLocale('en')).toBe(true);
    expect(isSupportedLocale('fr')).toBe(true);
    expect(isSupportedLocale('xx')).toBe(false);
  });

  it('defaults to English', () => {
    expect(DEFAULT_LOCALE).toBe('en');
  });
});
