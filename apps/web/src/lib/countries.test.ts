import { describe, it, expect } from 'vitest';
import { findCountry, findCountryByName, regionForCountry, COUNTRIES } from '@/lib/countries';

describe('countries', () => {
  it('finds a country by code case-insensitively', () => {
    expect(findCountry('us')?.name).toBe('United States');
    expect(findCountry('NG')?.name).toBe('Nigeria');
    expect(findCountry('xx')).toBeUndefined();
  });

  it('finds a country by name', () => {
    expect(findCountryByName('Nigeria')?.code).toBe('NG');
    expect(findCountryByName('Nowhere')).toBeUndefined();
  });

  it('groups countries into regions', () => {
    expect(regionForCountry('KE')).toBe('Africa');
    expect(regionForCountry('US')).toBe('North America');
    expect(regionForCountry('GB')).toBe('Europe');
    expect(regionForCountry('BR')).toBe('South America');
    expect(regionForCountry('AU')).toBe('Oceania');
    expect(regionForCountry('AE')).toBe('Middle East');
    expect(regionForCountry('XX')).toBe('International');
  });

  it('contains a realistic worldwide set', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(10);
  });
});
