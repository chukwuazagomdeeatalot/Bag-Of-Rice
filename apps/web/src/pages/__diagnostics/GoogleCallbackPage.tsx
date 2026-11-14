import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { AlertCircle, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { account } from '@/lib/appwrite';
import { getCurrentUser } from '@/lib/auth';

export function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    if (!userId || !secret) {
      setMessage('Invalid Google sign-in response. Please try again.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    const completeSignIn = async () => {
      try {
        await account.createSession({ userId, secret });

        const currentUser = await getCurrentUser();
        setUser(currentUser);

        setMessage('Google sign-in successful. You are now signed in.');
        setMessageType('success');

        window.history.replaceState({}, document.title, window.location.pathname);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate('/', { replace: true });
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : 'Google sign-in failed.';
        setMessage(msg);
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    completeSignIn();
  }, [userId, secret, navigate, setUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md text-center p-10 glow">
          <Brand size="lg" className="mx-auto mb-8" />
          <Loader2 size={48} className="mx-auto mb-6 text-[#C58B22] animate-spin" />
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Signing in with Google...</h2>
        </Card>
      </div>
    );
  }

  if (messageType === 'success') {
    return (
      <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md text-center p-10 glow">
          <Brand size="lg" className="mx-auto mb-8" />
          <Mail size={48} className="mx-auto mb-6 text-[#087C61]" />
          <h2 className="text-2xl font-bold text-[#087C61] mb-3">Signed In</h2>
          <p className="text-[#9AA7BD] mb-8">{message}</p>
          <AppButtonLink to="/">Continue to Home</AppButtonLink>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
      <Card className="w-full max-w-md text-center p-10 glow">
        <Brand size="lg" className="mx-auto mb-8" />
        <AlertCircle size={48} className="mx-auto mb-6 text-[#B52E55]" />
        <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Google Sign-In Failed</h2>
        <p className="text-[#9AA7BD] mb-8">{message}</p>
        <AppButtonLink to="/login">Try Again</AppButtonLink>
      </Card>
    </div>
  );
}

function AppButtonLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-medium bg-[#00D5FF] text-[#06152D] hover:bg-[#00B9A8] transition-colors"
    >
      {children}
    </Link>
  );
}
