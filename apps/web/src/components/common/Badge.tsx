import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'emerald' | 'violet' | 'cyan' | 'ruby' | 'copper' | 'demonstration';
}

const variantClasses: Record<string, string> = {
  default: 'border-[#1E3A5C] text-[#9AA7BD] bg-[#091D3A]/40',
  gold: 'border-[#C58B22]/40 text-[#C58B22] bg-[#C58B22]/15',
  emerald: 'border-[#087C61]/40 text-[#087C61] bg-[#087C61]/15',
  violet: 'border-[#8B35D6]/40 text-[#8B35D6] bg-[#8B35D6]/15',
  cyan: 'border-[#00D5FF]/40 text-[#00D5FF] bg-[#00D5FF]/15',
  ruby: 'border-[#B52E55]/40 text-[#B52E55] bg-[#B52E55]/15',
  copper: 'border-[#A64F27]/40 text-[#A64F27] bg-[#A64F27]/15',
  demonstration: 'border-[#00D5FF]/50 text-[#00D5FF] bg-[#00D5FF]/10 animate-glow-pulse',
};

export function Badge({ className = '', variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
