import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Filter, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Brand } from '@/components/common/Brand';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ProductGrid } from '@/components/marketplace/ProductCard';
import { CategoryFilters } from '@/components/marketplace/CategoryFilters';
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMONSTRATION_NOTICE } from '@/lib/sampleData';
import type { Product } from '@/types/index';

export function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
  const [categorySlug, setCategorySlug] = useState<string | null>(searchParams.get('category') ?? null);
  const [sort, setSort] = useState<string>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = useMemo((): Product[] => {
    let result = DEMO_PRODUCTS.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !categorySlug || p.category === categoryName(categorySlug);
      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price.minorUnits - b.price.minorUnits);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price.minorUnits - a.price.minorUnits);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [searchQuery, categorySlug, sort]);

  function categoryName(slug: string): string {
    const found = DEMO_CATEGORIES.find((c) => c.slug === slug);
    return found ? found.name : slug;
  }

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D5FF]/15 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/15 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/40 bg-[#091D3A]/70 backdrop-blur-md">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
          <div className="relative z-10 flex flex-col md:flex-row gap-5 items-start md:items-center">
            <div className="relative flex-1 md:w-[450px]">
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]/70" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, sellers, creators..."
                className="w-full rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-[#F7F8FC] pl-11 pr-5 py-4 focus-visible:border-[#C58B22]"
              />
            </div>
            <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)} className="w-full md:w-auto">
              {filtersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span className="ml-3 hidden md:inline">Filters</span>
            </Button>
            <Button className="w-full md:w-auto" asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
          <p className="text-[0.7rem] text-[#9AA7BD]/60 mt-4 text-center">{DEMONSTRATION_NOTICE}</p>
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          <aside className="lg:w-72 shrink-0">
            <div className="space-y-8">
              <div className="p-6 rounded-[2rem] border border-[#1E3A5C]/60 bg-[#091D3A]/60 shadow-card">
                <h3 className="text-[0.7rem] font-bold text-[#F7F8FC] mb-5 tracking-widest uppercase">Categories</h3>
                <CategoryFilters
                  categories={DEMO_CATEGORIES}
                  activeSlug={categorySlug}
                  onSelect={(slug) => setCategorySlug(slug)}
                />
              </div>
              <div className="p-6 rounded-[2rem] border border-[#1E3A5C]/60 bg-[#091D3A]/60 shadow-card">
                <h3 className="text-[0.7rem] font-bold text-[#F7F8FC] mb-5 tracking-widest uppercase">Sort by</h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 text-[#F7F8FC] px-5 py-3.5 text-sm focus-visible:border-[#C58B22]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#F7F8FC]">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </span>
                <Badge variant="cyan">Demonstration</Badge>
              </div>
              <span className="text-[0.7rem] text-[#9AA7BD]/70">
                Formatted prices shown in original currencies. Demonstration amounts only — no live conversion.
              </span>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-24 h-24 rounded-full bg-[#091D3A]/60 flex items-center justify-center mb-6">
                  <ImageIcon size={36} className="text-[#9AA7BD]/50" />
                </div>
                <h3 className="text-xl font-bold text-[#F7F8FC] mb-3">No products found</h3>
                <p className="text-[#9AA7BD] text-sm">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
