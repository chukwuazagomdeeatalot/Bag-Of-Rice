import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { AlertCircle, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const {
    user,
    emailVerified,
    sendEmailOTP,
    verifyEmailOTP,
    loading: authLoading,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    if (!user) {
      setError('Authentication session not found. Please sign in again.');
      return;
    }

    setLoading(true);
    try {
      await verifyEmailOTP(user.id, code);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Invalid or expired code.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await sendEmailOTP();
      setError('');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to send code.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (emailVerified) {
    return (
      <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md text-center p-10 glow">
          <Brand size="lg" className="mx-auto mb-8" />
          <Mail size={48} className="mx-auto mb-6 text-[#087C61]" />
          <h2 className="text-2xl font-bold text-[#087C61] mb-3">Email Verified</h2>
          <p className="text-[#9AA7BD] mb-8">
            Your email has been verified. You can now sign in to Bag Of Rice.
          </p>
          <Button className="w-full" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </Card>
      </div>
    );
  }

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
            <div className="text-center mb-8">
              <Brand size="lg" className="mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Verify Your Email</h2>
            </div>

            <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/20 text-[#B52E55]/90 text-sm flex items-start gap-3">
              <AlertCircle size={18} className="mt-0.5" />
              <span>
                Email verification links are temporarily unavailable. Please use the
                6-digit verification code instead.
              </span>
            </div>

            {userId && secret && (
              <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/20 text-[#B52E55]/90 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5" />
                <span>
                  Link-based verification is temporarily unavailable. Please use the
                  6-digit code below instead.
                </span>
              </div>
            )}

            {!success && (
              <form onSubmit={handleOtpSubmit} className="space-y-5">
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

                {error && (
                  <div className="mb-4 p-3 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm flex items-start gap-3">
                    <AlertCircle size={16} className="mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <p className="mt-6 text-center text-[0.8rem] text-[#9AA7BD]">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResendOtp}
                    disabled={loading || authLoading}
                    className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors"
                  >
                    {loading ? 'Sending...' : 'Resend code'}
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

            <p className="mt-8 text-center text-[0.8rem] text-[#9AA7BD]">
              Already verified?{' '}
              <Link to="/login" className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
