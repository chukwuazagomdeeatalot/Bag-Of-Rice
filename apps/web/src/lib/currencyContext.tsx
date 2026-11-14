import { createContext, useContext, useCallback, useState } from 'react';
import type { CurrencyCode } from '@/types/index';
import { normalizeCurrency, DEFAULT_CURRENCY } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyContextProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const stored = localStorage.getItem('bag_of_rice_currency');
    return stored ? normalizeCurrency(stored) : DEFAULT_CURRENCY;
  });

  const setCurrency = useCallback((code: CurrencyCode) => {
    const next = normalizeCurrency(code);
    setCurrencyState(next);
    localStorage.setItem('bag_of_rice_currency', next);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyContextProvider');
  }
  return ctx;
}
