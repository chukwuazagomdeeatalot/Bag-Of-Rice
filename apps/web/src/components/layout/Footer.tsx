import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Brand } from '@/components/common/Brand';
import { Container } from '@/components/layout/Container';

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Sellers', to: '/sellers' },
  { label: 'Agents', to: '/agents' },
  { label: 'Creators', to: '/creators' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy', to: '#' },
  { label: 'Terms', to: '#' },
  { label: 'Security', to: '#' },
];

export function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="bg-[#06152D] text-[#F7F8FC] border-t border-[#1E3A5C]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#091D3A] to-[#06152D] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C58B22]/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <Container>
        <div className="relative z-10 grid gap-12 md:grid-cols-4 lg:grid-cols-5 pt-16 pb-20">
          <div className="col-span-2 lg:col-span-2">
            <Brand size="lg" showSlogan className="mb-8" />
            <p className="text-[#9AA7BD] text-sm leading-relaxed max-w-xs">
              Bag Of Rice is a global social commerce and creator marketplace. All prices and content shown are demonstration data.
            </p>
          </div>
          <div>
            <h3 className="text-[#F7F8FC] font-semibold mb-6 tracking-wide uppercase text-[0.7rem]">Explore</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[#9AA7BD]/80 text-sm hover:text-[#00D5FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F7F8FC] font-semibold mb-6 tracking-wide uppercase text-[0.7rem]">Platform</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.slice(4).map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[#9AA7BD]/80 text-sm hover:text-[#00D5FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F7F8FC] font-semibold mb-6 tracking-wide uppercase text-[0.7rem]">Contact</h3>
            <ul className="space-y-4 text-sm text-[#9AA7BD]/70">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[#C58B22]" />
                <span>Contact information is a design placeholder. No real address.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C58B22]" />
                <span>Telephone is a design placeholder. No real number.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C58B22]" />
                <span>Email is a design placeholder. No real address.</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#C58B22]" />
                <span>Support hours: design placeholder only.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-16 border-t border-[#1E3A5C]/30 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#9AA7BD]/60 text-[0.7rem]">
            &copy; {year} Bag Of Rice. Demonstration storefront.
          </div>
          <div className="flex gap-8 text-[0.7rem]">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.to}
                className="text-[#9AA7BD]/60 hover:text-[#00D5FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
