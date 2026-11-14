import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '@/lib/auth';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    if (!userId || !secret) {
      setError('Invalid or missing reset link.');
    }
  }, [userId, secret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!userId || !secret) {
      setError('Invalid or missing reset link.');
      return;
    }
    if (!password) {
      setError('Please enter a new password.');
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
      await resetPassword(userId, secret, password);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Password reset failed. Please try again.';
      setError(msg);
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
            {!success && (
              <>
                <div className="text-center mb-10">
                  <Brand size="lg" className="mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Reset Password</h2>
                  <p className="text-[#9AA7BD] text-sm">
                    Enter your new password below.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl border border-[#B52E55]/40 bg-[#B52E55]/10 text-[#B52E55]/90 text-sm flex items-start gap-3">
                    <AlertCircle size={18} className="mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="New Password"
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
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
                <Lock size={48} className="mx-auto mb-6 text-[#087C61]" />
                <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Password Reset</h2>
                <p className="text-[#9AA7BD] text-sm mb-8">
                  Your password has been reset successfully. You can now sign in with your new password.
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
