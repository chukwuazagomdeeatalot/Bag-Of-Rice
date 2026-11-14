import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  asTextarea?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  className = '',
  label,
  error,
  asTextarea = false,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const paddingLeft = hasLeftIcon ? 'pl-12' : 'pl-5';
  const paddingRight = hasRightIcon ? 'pr-12' : 'pr-5';

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-[#F7F8FC] mb-2 tracking-wide uppercase">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]/70">
            {leftIcon}
          </span>
        )}
        {rightIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]/70">
            {rightIcon}
          </span>
        )}
        {asTextarea ? (
          <textarea
            className={`block w-full min-h-[120px] rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-[#F7F8FC] px-5 py-4 transition-colors focus-visible:border-[#C58B22] focus-visible:box-shadow-[0_0_0_4px_rgba(197,139,34,0.2)] focus-visible:outline-none ${paddingLeft} ${paddingRight} ${className}`}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            aria-invalid={error ? true : undefined}
          />
        ) : (
          <input
            className={`block w-full rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-[#F7F8FC] px-5 py-4 transition-colors focus-visible:border-[#C58B22] focus-visible:box-shadow-[0_0_0_4px_rgba(197,139,34,0.2)] focus-visible:outline-none ${paddingLeft} ${paddingRight} ${className}`}
            {...props}
            aria-invalid={error ? true : undefined}
          />
        )}
      </div>
      {error && <p className="mt-2 text-[0.75rem] text-[#C62845]">{error}</p>}
    </div>
  );
}
