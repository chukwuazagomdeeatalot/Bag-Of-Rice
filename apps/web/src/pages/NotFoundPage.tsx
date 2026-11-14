import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative overflow-hidden z-10">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#17245E]/20 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/20 rounded-full blur-[140px] -z-10" />

      <Card className="w-full max-w-md text-center p-12 glow">
        <Brand size="lg" className="mx-auto mb-8" />
        <Search size={56} className="mx-auto mb-8 text-[#9AA7BD]/50" />
        <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">Page Not Found</h2>
        <p className="text-[#9AA7BD] mb-10">The page you are looking for does not exist.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button variant="outline" onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </div>
      </Card>
    </div>
  );
}
