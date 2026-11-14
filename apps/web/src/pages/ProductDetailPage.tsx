import { useParams, Link } from 'react-router-dom';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { PriceDisplay, DemoTag } from '@/components/marketplace/CurrencySelector';
import { DEMO_PRODUCTS, DEMONSTRATION_NOTICE } from '@/lib/sampleData';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = DEMO_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] flex items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md text-center p-10 glow">
          <Brand size="md" className="mx-auto mb-8" />
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-3">Product not found</h2>
          <p className="text-[#9AA7BD] mb-6">This demonstration product does not exist.</p>
          <Button asChild>
            <Link to="/marketplace">Browse Marketplace</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#641B9B]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#006C78]/25 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/60 bg-[#091D3A]/90 backdrop-blur-sm">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-video rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#104BB5] to-[#174A8B] shadow-[0_0_80px_-40px_rgba(16,75,181,0.4)] mb-6">
              <div className="relative aspect-video rounded-[2rem] bg-[#091D3A]/40 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-[#00D5FF]/50" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {product.images.map((_img, i) => (
                <div key={i} className="aspect-square rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full bg-[#091D3A]/80" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <DemoTag />
              <span className="text-[0.7rem] text-[#9AA7BD]/70 uppercase tracking-widest">Product ID: {product.id}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F7F8FC] mb-5">{product.title}</h1>
            <p className="text-[#9AA7BD] text-lg leading-relaxed mb-8">{product.description}</p>
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#C58B22]">
                  <PriceDisplay minorUnits={product.price.minorUnits} currency={product.price.currency} />
                </span>
                <span className="text-[#9AA7BD] text-sm">/unit</span>
              </div>
              <p className="text-[0.7rem] text-[#9AA7BD]/60 mt-2">
                Formatted demonstration amount in {product.price.currency}. No live conversion.
              </p>
            </div>
            <div className="mb-8 p-6 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/80 shadow-card">
              <div className="flex justify-between mb-3">
                <span className="text-[0.7rem] text-[#9AA7BD]/70 uppercase tracking-widest">Seller</span>
                <span className="font-medium text-[#F7F8FC]">{product.sellerId}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-[0.7rem] text-[#9AA7BD]/70 uppercase tracking-widest">Category</span>
                <span className="font-medium text-[#F7F8FC]">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[0.7rem] text-[#9AA7BD]/70 uppercase tracking-widest">Availability</span>
                <span className={`font-medium text-[#F7F8FC] ${product.stock > 0 ? 'text-[#087C61]' : 'text-[#B52E55]'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <Button className="w-full" disabled>
                Add to Cart (Coming Soon)
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/marketplace">Back to Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-12 text-[0.7rem] text-[#9AA7BD]/60 text-center">{DEMONSTRATION_NOTICE}</p>
      </div>
    </div>
  );
}

import { Image as ImageIcon } from 'lucide-react';
