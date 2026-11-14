import type { ButtonHTMLAttributes } from 'react';
import { cloneElement } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'icon' | 'cyan' | 'emerald' | 'purple' | 'ruby';
  size?: 'sm' | 'md' | 'lg';
  isComingSoon?: boolean;
  asChild?: boolean;
}

const sizePadding: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  isComingSoon = false,
  asChild = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06152D]';
  const mergedClassName = `${base} ${sizePadding[size]} ${className}`;

  if (asChild) {
    const child = children as React.ReactElement;
    return cloneElement(child, {
      className: `${mergedClassName} ${(child.props as any).className ?? ''}`,
      ...(disabled || isComingSoon ? { disabled: true, 'aria-disabled': true } : {}),
    } as any);
  }

  return (
    <button
      className={mergedClassName}
      disabled={disabled || isComingSoon}
      aria-disabled={isComingSoon || disabled ? true : undefined}
      {...props}
    >
      {children}
      {isComingSoon && (
        <span className="sr-only">Coming soon</span>
      )}
    </button>
  );
}
