import { Link } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/types/index';
import { PriceDisplay } from '@/components/marketplace/CurrencySelector';
import { DemoTag } from '@/components/marketplace/CurrencySelector';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group h-full flex flex-col">
      <div className="relative aspect-[4/5] rounded-xl border border-[#1E3A5C]/60 bg-[#091D3A]/80 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#104BB5] to-[#174A8B] opacity-50" />
        <ImageIcon className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 z-10">
          <DemoTag className="bg-[#091D3A]/90 backdrop-blur" />
        </div>
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-xl bg-[#06152D]/90 backdrop-blur text-[0.65rem] font-bold text-[#F7F8FC] uppercase tracking-tighter">
          <span className="w-1.5 h-1.5 rounded-full bg-[#087C61] animate-glow-pulse" />
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-[#F7F8FC] text-lg line-clamp-2 mb-3">{product.title}</h3>
        <p className="text-[#9AA7BD] text-sm line-clamp-2 mb-6">{product.description}</p>
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#C58B22]">
              <PriceDisplay minorUnits={product.price.minorUnits} currency={product.price.currency} />
            </span>
            <span className="text-[#9AA7BD] text-sm">/unit</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9AA7BD]/70 border-t border-[#1E3A5C]/40 pt-4">
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span>· ({product.reviewCount})</span>
          <span>· {product.stock} left</span>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Link
          to={`/marketplace/products/${product.id}`}
          className="w-full py-3.5 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-center text-sm font-medium text-[#C58B22] hover:bg-[#C58B22]/20 hover:text-[#06152D] hover:border-[#C58B22] transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-[#091D3A]/60 flex items-center justify-center mb-6">
        <ImageIcon size={32} className="text-[#9AA7BD]/50" />
      </div>
      <h3 className="text-xl font-bold text-[#F7F8FC] mb-3">{title}</h3>
      <p className="text-[#9AA7BD] text-sm max-w-xs">{description}</p>
    </div>
  );
}
