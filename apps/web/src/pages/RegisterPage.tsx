import { useState } from 'react';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name.trim());
      navigate('/verify-email');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#17245E]/20 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C58B22]/20 rounded-full blur-[140px] -z-10" />

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
              <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Create an Account</h2>
              <p className="text-[#9AA7BD] text-sm">Join Bag Of Rice as a buyer, seller or creator.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User size={18} className="text-[#9AA7BD]/70" />}
                required
                disabled={loading || authLoading}
              />
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
                rightIcon={
                  <Eye
                    size={18}
                    className={`text-[#9AA7BD]/70 cursor-pointer hover:text-[#F7F8FC]`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                }
                required
                disabled={loading || authLoading}
              />
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock size={18} className="text-[#9AA7BD]/70" />}
                rightIcon={
                  <EyeOff
                    size={18}
                    className={`text-[#9AA7BD]/70 cursor-pointer hover:text-[#F7F8FC]`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                required
                disabled={loading || authLoading}
              />
              <label className="flex items-center gap-2 text-[0.8rem] text-[#9AA7BD]">
                <input type="checkbox" className="rounded border-[#1E3A5C] text-[#C58B22]" required disabled={loading || authLoading} />
                I agree to the terms of service and privacy policy.
              </label>
              <Button type="submit" className="w-full" disabled={loading || authLoading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
            <p className="mt-8 text-center text-[0.8rem] text-[#9AA7BD]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
