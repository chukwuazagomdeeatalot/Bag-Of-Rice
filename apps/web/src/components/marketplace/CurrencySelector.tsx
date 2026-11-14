import type { CurrencyCode } from '@/types/index';
import { formatMoney, createMoney } from '@/lib/currency';

interface CurrencySelectorProps {
  currency: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
}

export function CurrencySelector({ currency, onChange }: CurrencySelectorProps) {
  return (
    <div className="relative w-[150px]">
      <button
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-[#F7F8FC] text-sm hover:bg-[#C58B22]/20 hover:text-[#C58B22] hover:border-[#C58B22]/50 transition-all duration-300"
        onClick={() => {
          const next: CurrencyCode = currency === 'USD' ? 'NGN' : 'USD';
          onChange(next);
        }}
      >
        <span className="font-medium">#{currency}</span>
        <svg className="w-4 h-4 text-[#9AA7BD]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

export function PriceDisplay({ minorUnits, currency }: { minorUnits: number; currency: string }) {
  return <span>{formatMoney(createMoney(minorUnits, currency as any))}</span>;
}

export function DemoTag({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-tighter border-[#00D5FF]/40 text-[#00D5FF] bg-[#00D5FF]/10 animate-glow-pulse ${className}`}>
      Demonstration
    </span>
  );
}
