import type { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  full?: boolean;
}

export function Container({ className = '', full = false, children }: ContainerProps) {
  return (
    <div
      className={`mx-auto ${full ? 'w-full' : 'max-w-72rem'} px-4 sm:px-6 lg:px-8 xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
