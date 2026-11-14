import { useState, useEffect } from 'react';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function OtpVerifyPage() {
  const { user, sendEmailOTP, verifyEmailOTP, loading: authLoading } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpUserId, setOtpUserId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      if (!user) {
        setError('Authentication session not found. Please sign in again.');
        return;
      }
      await verifyEmailOTP(otpUserId ?? user.id, code);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Invalid or expired code.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendCooldown(60);
    try {
      const userId = await sendEmailOTP();
      setOtpUserId(userId);
      setError('');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to resend code.';
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  // Countdown timer for resend cooldown
  useEffect(() => {
    const interval = setInterval(() => {
      if (resendCooldown > 0) {
        setResendCooldown((prev) => prev - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

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
              <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Verify Your Email</h2>
              <p className="text-[#9AA7BD] text-sm">
                Enter the 6-digit code sent to your email address.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Verification Code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  leftIcon={<Mail size={18} className="text-[#9AA7BD]/70" />}
                  maxLength={6}
                  required
                  disabled={loading || authLoading}
                  autoComplete="one-time-code"
                />
                <Button type="submit" className="w-full" disabled={loading || authLoading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>

                <p className="mt-6 text-center text-[0.8rem] text-[#9AA7BD]">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={resendLoading || resendCooldown > 0 || authLoading}
                    className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors"
                  >
                    {resendLoading
                      ? 'Sending...'
                      : resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : 'Resend code'}
                  </button>
                </p>
              </form>
            )}

            {success && (
              <div className="text-center">
                <Mail size={48} className="mx-auto mb-6 text-[#087C61]" />
                <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Email Verified</h2>
                <p className="text-[#9AA7BD] text-sm mb-8">
                  Your email has been verified. You can now sign in.
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
