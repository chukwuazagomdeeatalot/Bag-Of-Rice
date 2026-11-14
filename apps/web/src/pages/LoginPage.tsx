import { useState } from 'react';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading } = useAuth();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password, undefined);
      if (user && !user.emailVerification) {
        navigate('/verify-email');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#17245E]/20 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/20 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/40 bg-[#091D3A]/70 backdrop-blur-sm">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="max-w-md mx-auto">
          <Card className="p-10 lg:p-14 glow">
            <div className="text-center mb-10">
              <Brand size="lg" className="mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Sign In</h2>
              <p className="text-[#9AA7BD] text-sm">Welcome back to Bag Of Rice.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={18} className="text-[#9AA7BD]/70" />}
                required
                disabled={loading || authLoading}
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} className="text-[#9AA7BD]/70" />}
                required
                disabled={loading || authLoading}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[0.8rem] text-[#9AA7BD] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="rounded border-[#1E3A5C] text-[#C58B22]" />
                  Show password
                </label>
                <Link to="/forgot-password" className="text-[0.8rem] text-[#00D5FF] hover:text-[#F7F8FC] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading || authLoading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <p className="mt-8 text-center text-[0.8rem] text-[#9AA7BD]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors">
                Create an account
              </Link>
            </p>
            <div className="mt-10 pt-8 border-t border-[#1E3A5C]/30">
              <div className="relative flex items-center justify-center mb-6">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#1E3A5C]/40" />
                </span>
                <span className="px-4 text-[0.7rem] text-[#9AA7BD] uppercase tracking-widest">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" disabled>
                  Google
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Apple
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
