import { useState } from 'react';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { sendPasswordReset } from '@/lib/auth';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSuccess(true);
    } catch (err: unknown) {
      // Don't reveal whether email exists or not
      setSuccess(true);
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
              <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Forgot Password</h2>
              <p className="text-[#9AA7BD] text-sm">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            {!success && (
              <>
                {error && (
                  <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm">
                    {error}
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
                    disabled={loading}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
                <p className="mt-8 text-center text-[0.8rem] text-[#9AA7BD]">
                  Remember your password?{' '}
                  <Link to="/login" className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </>
            )}

            {success && (
              <div className="text-center">
                <Mail size={48} className="mx-auto mb-6 text-[#087C61]" />
                <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">
                  Reset Link Sent
                </h2>
                <p className="text-[#9AA7BD] text-sm mb-8 max-w-xs mx-auto">
                  If an account exists with this email address, you will receive a password reset link shortly.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
