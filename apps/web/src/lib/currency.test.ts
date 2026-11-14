import { describe, it, expect } from 'vitest';
import {
  formatMoney,
  createMoney,
  addMoney,
  subtractMoney,
  toMajorUnits,
  toMinorUnits,
  isValidCurrency,
  normalizeCurrency,
  getCurrencyInfo,
} from '@/lib/currency';

describe('formatMoney', () => {
  it('formats USD minor units as dollars', () => {
    expect(formatMoney(createMoney(1099, 'USD'))).toBe('$10.99');
  });

  it('formats NGN with naira symbol', () => {
    expect(formatMoney(createMoney(350000, 'NGN'))).toContain('3,500');
  });

  it('formats JPY without fractional digits', () => {
    expect(formatMoney(createMoney(500, 'JPY'))).toContain('500');
  });

  it('shows currency code when symbol is hidden', () => {
    expect(formatMoney(createMoney(1099, 'USD'), { showSymbol: false })).toContain('USD');
  });
});

describe('money arithmetic', () => {
  it('adds amounts in the same currency using integer minor units', () => {
    const total = addMoney(createMoney(1099, 'USD'), createMoney(901, 'USD'));
    expect(total).toEqual({ minorUnits: 2000, currency: 'USD' });
  });

  it('throws when adding different currencies', () => {
    expect(() => addMoney(createMoney(100, 'USD'), createMoney(100, 'NGN'))).toThrow();
  });

  it('subtracts amounts in the same currency', () => {
    const remaining = subtractMoney(createMoney(2000, 'USD'), createMoney(1099, 'USD'));
    expect(remaining.minorUnits).toBe(901);
  });
});

describe('unit conversion', () => {
  it('converts major to minor units and back without floating-point drift', () => {
    const minor = toMinorUnits(10.99, 'USD');
    expect(minor).toBe(1099);
    expect(toMajorUnits(minor, 'USD')).toBe(10.99);
  });

  it('rounds minor units from major input', () => {
    expect(toMinorUnits(10.995, 'USD')).toBe(1100);
  });
});

describe('currency validation', () => {
  it('accepts supported codes', () => {
    expect(isValidCurrency('USD')).toBe(true);
    expect(isValidCurrency('NGN')).toBe(true);
    expect(isValidCurrency('JPY')).toBe(true);
  });

  it('rejects unsupported codes', () => {
    expect(isValidCurrency('XXX')).toBe(false);
    expect(isValidCurrency('')).toBe(false);
  });

  it('normalizes invalid codes to the default', () => {
    expect(normalizeCurrency('XXX')).toBe('USD');
    expect(normalizeCurrency('ngn')).toBe('NGN');
  });

  it('returns info for supported currencies', () => {
    expect(getCurrencyInfo('NGN').name).toBe('Nigerian Naira');
    expect(getCurrencyInfo('JPY').minorUnitDigits).toBe(0);
  });
});
