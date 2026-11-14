import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { AlertCircle, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const { user, emailVerified, verifyEmail, resendVerification, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    if (userId && secret) {
      setLoading(true);
      verifyEmail(userId, secret)
        .then(() => {
          setMessage('Email verified successfully! You can now sign in.');
          setMessageType('success');
          setLoading(false);
        })
        .catch((err: unknown) => {
          const msg =
            err instanceof Error ? err.message : 'Verification failed.';
          setMessage(msg);
          setMessageType('error');
          setLoading(false);
        });
    }
  }, [userId, secret, verifyEmail]);

  const handleResend = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await resendVerification();
      setMessage('Verification email sent. Please check your inbox.');
      setMessageType('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to send verification email.';
      setMessage(msg);
      setMessageType('error');
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
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Email Verified</h2>
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
              <p className="text-[#9AA7BD] text-sm">
                Please check your inbox and click the verification link we sent you.
              </p>
            </div>

            {message && (
              <div className="mb-6 p-4 rounded-xl flex items-start gap-3">
                {messageType === 'success' ? (
                  <div className="w-8 h-8 rounded-full bg-[#087C61]/20 flex items-center justify-center mt-0.5">
                    <Mail size={16} className="text-[#087C61]" />
                  </div>
                ) : (
                  <AlertCircle size={18} className="mt-0.5 text-[#B52E55]" />
                )}
                <span className={`text-sm ${messageType === 'success' ? 'text-[#087C61]' : 'text-[#B52E55]'}`}>
                  {message}
                </span>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 size={20} className="text-[#C58B22] animate-spin" />
              </div>
            )}

            {!loading && userId && secret && (
              <div className="pt-4">
                <Button variant="outline" className="w-full" disabled={authLoading} onClick={() => {
                  // Already handled in useEffect
                }}>
                  Verifying...
                </Button>
              </div>
            )}

            {!loading && (!userId || !secret) && (
              <>
                <p className="text-[0.8rem] text-[#9AA7BD] mb-6 text-center">
                  Didn't receive the email? Request a new one.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={loading || authLoading}
                  onClick={handleResend}
                >
                  {loading ? 'Sending...' : 'Resend Verification Email'}
                </Button>

                {user && (
                  <div className="mt-6 pt-6 border-t border-[#1E3A5C]/30">
                    <p className="text-[0.8rem] text-[#9AA7BD] mb-4 text-center">
                      Prefer a 6-digit code?{' '}
                      <Link
                        to="/verify-email/otp"
                        className="text-[#00D5FF] hover:text-[#F7F8FC] font-medium transition-colors"
                      >
                        Verify with code
                      </Link>
                    </p>
                  </div>
                )}
              </>
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
