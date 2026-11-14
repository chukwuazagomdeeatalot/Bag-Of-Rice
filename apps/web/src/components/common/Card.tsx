import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  glow?: boolean;
}

export function Card({ className = '', padded = true, glow = false, children }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[#1E3A5C] bg-[#091D3A]/90 shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-2 ${glow ? 'shadow-glow hover:shadow-[0_0_80px_-30px_currentColor]' : ''} ${padded ? 'p-8' : 'p-6'} ${className}`}
    >
      {children}
    </div>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardSection({ className = '', children }: CardSectionProps) {
  return (
    <div className={`rounded-xl border border-[#1E3A5C] bg-[#091D3A]/85 shadow-card ${className}`}>
      {children}
    </div>
  );
}
