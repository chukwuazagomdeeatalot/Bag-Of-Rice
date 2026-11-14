import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, LogOut, User } from 'lucide-react';
import { Brand } from '@/components/common/Brand';
import { Button } from '@/components/common/Button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Container } from '@/components/layout/Container';
import { CurrencySelector } from '@/components/marketplace/CurrencySelector';
import { useAuth } from '@/hooks/useAuth';
import type { CurrencyCode } from '@/types/index';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/sellers', label: 'Sellers' },
  { to: '/agents', label: 'Agents' },
  { to: '/creators', label: 'Creators' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
}

export function Header({ currency, onCurrencyChange }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();

  const active = (to: string) => location.pathname === to;

  const toggleMobile = () => setOpen((prev) => !prev);
  const closeMobile = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    closeMobile();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3A5C]/50 bg-[#091D3A]/60 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-b from-[#104BB5]/30 to-[#06152D]/40 pointer-events-none" />
      <Container>
        <div className="relative flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={toggleMobile}
              className="size-10 md:hidden border-transparent"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </Button>
            <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
              <Brand size="md" />
            </Link>
          </div>

          <div className="relative z-10 hidden md:flex items-center gap-1">
            <div className="relative w-[340px]">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]/70" />
              <input
                type="search"
                placeholder="Search products, sellers, creators..."
                className="w-full rounded-xl border border-[#1E3A5C] bg-[#091D3A]/50 text-[#F7F8FC] pl-11 pr-5 py-3.5 text-sm focus-visible:border-[#C58B22]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) navigate(`/marketplace?search=${encodeURIComponent(q)}`);
                  }
                }}
              />
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium text-[#F7F8FC] px-4 py-2.5 rounded-xl transition-all ${
                  active(link.to)
                    ? 'bg-gradient-to-r from-[#C58B22] to-[#A97916] text-[#06152D] shadow-glow-gold'
                    : 'hover:bg-[#091D3A]/40 hover:text-[#00D5FF] hover:border-[#C58B22]/50 border-transparent'
                }`}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="relative z-10 hidden md:flex items-center gap-3">
            <CurrencySelector currency={currency} onChange={onCurrencyChange} />
            <ThemeToggle />
            {user ? (
              <Button
                variant="ghost"
                size="md"
                onClick={handleLogout}
                disabled={authLoading}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/50 text-[#F7F8FC] hover:bg-[#C58B22]/20 hover:text-[#06152D] hover:border-transparent transition-all"
              >
                <LogOut size={16} className="mr-1" />
                <span className="text-sm font-medium">Sign out</span>
              </Button>
            ) : (
              <Link to="/login" className="text-sm font-medium text-[#F7F8FC] hover:text-[#00D5FF] transition-colors">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </Container>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#06152D]/95 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        >
          <div className="absolute right-6 top-6">
            <Button variant="ghost" onClick={closeMobile} className="size-10 border-transparent">
              <X size={20} />
            </Button>
          </div>
          <div className="container-premium py-14">
            <Link to="/" className="flex items-center gap-3 mb-14" onClick={closeMobile}>
              <Brand size="lg" showSlogan />
            </Link>
            <nav className="space-y-5 mb-16">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-xl font-medium text-[#F7F8FC] px-5 py-4 rounded-2xl transition-all ${
                    active(link.to)
                      ? 'bg-gradient-to-r from-[#C58B22] to-[#A97916] text-[#06152D] shadow-glow-gold'
                      : 'hover:bg-[#091D3A]/30 hover:border-[#C58B22]/40 border-transparent'
                  }`}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[0.7rem] text-[#9AA7BD] mb-3 uppercase tracking-widest">Currency</p>
                <CurrencySelector currency={currency} onChange={(code) => { onCurrencyChange(code); closeMobile(); }} />
              </div>
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#1E3A5C]/30">
              {user ? (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/50 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#C58B22]/20 flex items-center justify-center">
                    <User size={16} className="text-[#C58B22]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#F7F8FC]">{user.name || user.email}</div>
                    <div className="text-xs text-[#9AA7BD]">{user.email}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[0.7rem] text-[#9AA7BD] mb-3 uppercase tracking-widest">Account</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      closeMobile();
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => {
                      navigate('/register');
                      closeMobile();
                    }}
                  >
                    Create account
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
