import { Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { DemoTag } from '@/components/marketplace/CurrencySelector';
import { DEMO_SELLERS, DEMONSTRATION_NOTICE } from '@/lib/sampleData';

export function SellersPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#087C61]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/25 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/60 bg-[#091D3A]/90 backdrop-blur-md">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-12">
          <div>
            <Brand size="md" className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#F7F8FC] mb-4">Sellers</h1>
            <p className="text-[#9AA7BD] text-lg">
              A premium business ecosystem of verified makers and merchants from around the world.
            </p>
          </div>
          <Button variant="emerald" asChild>
            <Link to="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
        <p className="text-[0.7rem] text-[#9AA7BD]/70 mb-8">{DEMONSTRATION_NOTICE}</p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DEMO_SELLERS.map((seller) => (
            <Card key={seller.id} className="h-full flex flex-col glow">
              <div className="relative aspect-square rounded-xl border border-[#1E3A5C]/40 bg-gradient-to-br from-[#064D3B] to-[#087C61] shadow-[0_0_80px_-40px_rgba(8,124,104,0.4)] mb-6 overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                  <DemoTag className="bg-[#091D3A]/90 backdrop-blur" />
                </div>
                {seller.isVerified && (
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#087C61] text-[0.65rem] font-bold text-[#F7F8FC]">
                    Verified
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#F7F8FC] text-lg mb-2">{seller.name}</div>
                <div className="text-[#00A878]/95 text-sm mb-4">{seller.tagline}</div>
                <div className="flex items-center gap-2 text-sm text-[#9AA7BD]/90 mb-6">
                  <span className="font-medium">{seller.rating.toFixed(1)}</span>
                  <span>({seller.reviewCount} reviews)</span>
                </div>
                <div className="text-[0.7rem] text-[#9AA7BD]/70 mb-6">{seller.location}</div>
                <Link
                  to="/sellers/[id]"
                  className="w-full py-3.5 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/80 text-center text-sm font-medium text-[#C58B22] hover:bg-[#C58B22]/30 hover:text-[#06152D] hover:border-[#C58B22] transition-all duration-300"
                >
                  Visit Shop
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
