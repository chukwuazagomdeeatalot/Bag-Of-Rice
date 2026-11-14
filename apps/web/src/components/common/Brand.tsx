import { ShoppingBag } from 'lucide-react';

interface BrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
}

export function Brand({ className = '', size = 'md', showSlogan = false }: BrandProps) {
  const sizes: Record<string, { mark: number; text: number; slogan: number }> = {
    sm: { mark: 20, text: 17, slogan: 11 },
    md: { mark: 28, text: 23, slogan: 13 },
    lg: { mark: 40, text: 32, slogan: 17 },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative size-full shrink-0"
        style={{ width: s.mark, height: s.mark }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width={s.mark}
          height={s.mark}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 10a4 4 0 0 1-8 0" />
          <path d="M3.103 6.034h17.794" />
          <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
        </svg>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ mixBlendMode: 'screen' }}>
          <ShoppingBag size={s.mark * 0.45} strokeWidth={1.5} className="text-[#00D5FF]/60" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <div className="font-bold text-[#F7F8FC] tracking-tight">
          Bag Of Rice
        </div>
        {showSlogan && (
          <div className={`text-[#9AA7BD] text-[${s.slogan}px] font-medium tracking-wide uppercase mt-[2px]`}>
            One Platform. Endless Opportunities.
          </div>
        )}
      </div>
    </div>
  );
}
