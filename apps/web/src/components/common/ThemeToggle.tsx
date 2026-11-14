import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const isDark = document.documentElement.classList.contains('dark');

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('bag_of_rice_theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="size-11 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/50 text-[#F7F8FC] flex items-center justify-center hover:bg-[#C58B22]/20 hover:text-[#C58B22] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#C58B22]"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} className="text-[#C58B22]" /> : <Moon size={20} className="text-[#00D5FF]" />}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
}
