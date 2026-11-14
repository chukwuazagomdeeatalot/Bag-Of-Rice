import { Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { AlertCircle } from 'lucide-react';

export function GoogleErrorPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
      <Card className="w-full max-w-md text-center p-10 glow">
        <Brand size="lg" className="mx-auto mb-8" />
        <AlertCircle size={48} className="mx-auto mb-6 text-[#B52E55]" />
        <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Google Sign-In Failed</h2>
        <p className="text-[#9AA7BD] mb-8">
          Unable to complete sign-in with Google. Please try again or use email
          and password instead.
        </p>
        <div className="space-y-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-medium bg-[#00D5FF] text-[#06152D] hover:bg-[#00B9A8] transition-colors"
          >
            Try Email Sign-In
          </Link>
        </div>
      </Card>
    </div>
  );
}
