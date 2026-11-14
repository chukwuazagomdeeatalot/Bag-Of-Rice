import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Truck, Bot, MapPin, Users, Shield as ShieldIcon } from 'lucide-react';
import { Brand } from '@/components/common/Brand';
import { Button } from '@/components/common/Button';
import { CardSection } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { ProductGrid } from '@/components/marketplace/ProductCard';
import { DEMO_FEATURED_PRODUCTS, DEMO_TRENDING_PRODUCTS, DEMO_SELLERS, DEMO_AGENTS, DEMO_CREATORS, DEMO_CATEGORIES, DEMONSTRATION_NOTICE } from '@/lib/sampleData';

export function HomePage() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/marketplace?search=${encodeURIComponent(query.trim())}`;
  };

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden">
      {/* Decorative ambient glows - visible and colorful */}
      <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#00D5FF]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#C58B22]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed top-[25%] right-[-5%] w-[50%] h-[50%] bg-[#641B9B]/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed top-[-10%] left-[25%] w-[35%] h-[35%] bg-[#006C78]/20 rounded-full blur-[100px] -z-10" />

      {/* Navigation/Search bar area */}
      <section className="relative z-20 border-b border-[#1E3A5C]/60 bg-[#091D3A]/90 backdrop-blur-md">
        <div className="container-premium py-5">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Brand size="md" />
            </Link>
          </div>
          <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto mt-6 md:mt-0 md:w-[440px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]/80" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, sellers, creators..."
              className="w-full rounded-xl border border-[#1E3A5C] bg-[#091D3A]/80 text-[#F7F8FC] pl-11 pr-5 py-4 text-base focus-visible:border-[#C58B22]"
            />
          </form>
          <p className="text-[0.7rem] text-[#9AA7BD]/70 mt-3 text-center">{DEMONSTRATION_NOTICE}</p>
        </div>
      </section>

      {/* Hero Section - Large visible royal blue gradient */}
      <section className="relative z-20 py-28 md:py-36">
        <div className="container-premium">
          <div className="relative rounded-[2.5rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#104BB5] via-[#174A8B] to-[#176BFF] p-1 shadow-[0_0_100px_-40px_rgba(16,75,181,0.5)]">
            <div className="relative p-10 md:p-20 text-center bg-[#091D3A]/30 rounded-[2rem]">
              <Badge variant="demonstration" className="mx-auto mb-10 inline-block">
                Demonstration
              </Badge>
              <h1 className="text-[4rem] md:text-[5rem] font-black text-[#F7F8FC] mb-8 tracking-tight leading-[1.05]">
                One Platform.<br className="hidden md:block" />
                Endless Opportunities.
              </h1>
              <p className="text-[#F7F8FC]/95 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover products, grow your business, connect with creators and unlock opportunities in a world without boundaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link to="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/sellers">Start Your Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Discovery - Cyan section */}
      <section className="relative z-20 py-28 border-y border-[#1E3A5C]/40">
        <div className="container-premium">
          <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#006C78] via-[#00B9A8] to-[#00D5FF] shadow-[0_0_80px_-40px_rgba(0,213,255,0.4)]">
            <div className="relative p-10 md:p-16 text-center bg-[#091D3A]/20 rounded-[2rem]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-3">Marketplace Discovery</h2>
                  <p className="text-[#00D5FF]/95 text-lg">Find extraordinary products from verified sellers worldwide.</p>
                </div>
                <Button variant="cyan" size="md" asChild>
                  <Link to="/marketplace">Browse All</Link>
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {DEMO_CATEGORIES.map((category) => (
                  <CardSection
                    key={category.id}
                    className="p-8 hover:bg-[#F7F8FC]/15 transition-colors group cursor-pointer"
                    onClick={() => {
                      window.location.href = `/marketplace?category=${category.slug}`;
                    }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#F7F8FC]/25 flex items-center justify-center mb-6 group-hover:bg-[#F7F8FC]/40 transition-colors">
                      <MapPin size={26} className="text-[#00D5FF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F7F8FC] mb-2">{category.name}</h3>
                    <p className="text-[#00D5FF]/90 text-sm">{category.productCount} products</p>
                  </CardSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative z-20 py-28">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-3">Featured Products</h2>
              <p className="text-[#9AA7BD] text-lg">Handpicked by our curation team. Demonstration data.</p>
            </div>
            <Badge variant="gold">Demonstration</Badge>
          </div>
          <ProductGrid products={DEMO_FEATURED_PRODUCTS} />
        </div>
      </section>

      {/* Platform Identities - Three rows with distinct colors */}
      <section className="relative z-20 py-28 border-y border-[#1E3A5C]/40">
        <div className="container-premium">
          {/* Buyers - Sapphire/Cyan */}
          <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#104BB5] via-[#174A8B] to-[#00D5FF] shadow-[0_0_80px_-40px_rgba(16,75,181,0.4)] mb-16">
            <div className="relative p-10 md:p-16 overflow-hidden bg-[#091D3A]/20 rounded-[2rem]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00D5FF]/25 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-4">For Buyers</h3>
                  <p className="text-[#00D5FF]/95 text-lg mb-8 leading-relaxed">
                    A modern, trustworthy shopping experience. Browse products, compare sellers, and shop globally with confidence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="cyan" className="mb-2">Sapphire &amp; Cyan</Badge>
                    <Badge variant="default" className="mb-2">Worldwide Shipping</Badge>
                    <Badge variant="gold" className="mb-2">Secure Checkout</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Truck size={48} className="absolute text-[#00D5FF]/60" />
                    <ShieldIcon size={32} className="relative z-10 text-[#C58B22]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sellers - Emerald/Gold */}
          <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#064D3B] via-[#087C61] to-[#00A878] shadow-[0_0_80px_-40px_rgba(8,124,104,0.4)] mb-16 mt-12">
            <div className="relative p-10 md:p-16 overflow-hidden bg-[#091D3A]/20 rounded-[2rem]">
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C58B22]/25 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex items-center justify-center order-2 md:order-1">
                  <div className="relative w-48 h-48">
                    <Users size={48} className="absolute text-[#087C61]/60" />
                    <ShieldIcon size={32} className="relative z-10 text-[#C58B22]" />
                  </div>
                </div>
                <div className="text-left order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-4">For Sellers</h3>
                  <p className="text-[#00A878]/95 text-lg mb-8 leading-relaxed">
                    A premium business ecosystem for verified makers and merchants. Grow your brand, reach global buyers, and succeed.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="emerald" className="mb-2">Emerald &amp; Gold</Badge>
                    <Badge variant="gold" className="mb-2">Verified Seller</Badge>
                    <Badge variant="default" className="mb-2">Global Reach</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agents & Creators */}
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#37136F] via-[#641B9B] to-[#8B35D6] shadow-[0_0_80px_-40px_rgba(100,27,155,0.4)]">
              <div className="relative p-10 md:p-16 overflow-hidden bg-[#091D3A]/20 rounded-[2rem]">
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#B52E55]/25 rounded-full blur-[80px] translate-x-1/4 -translate-y-1/4" />
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-4">For Agents</h3>
                  <p className="text-[#8B35D6]/95 text-lg">Professional, rewarding and energetic commission-based partnerships.</p>
                  <Button variant="cyan" size="md" className="mt-6 w-full md:w-auto" asChild>
                    <Link to="/agents">Join as Agent</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#651B39] via-[#B52E55] to-[#C62845] shadow-[0_0_80px_-40px_rgba(181,46,85,0.4)]">
              <div className="relative p-10 md:p-16 overflow-hidden bg-[#091D3A]/20 rounded-[2rem]">
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#00D5FF]/25 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-4">For Creators</h3>
                  <p className="text-[#B52E55]/95 text-lg">Expressive, creative, modern and exciting social commerce.</p>
                  <Button variant="purple" size="md" className="mt-6 w-full md:w-auto" asChild>
                    <Link to="/creators">Join as Creator</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="relative z-20 py-28">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-3">Trending Now</h2>
              <p className="text-[#9AA7BD] text-lg">What the world is discovering today. Demonstration data.</p>
            </div>
            <Link to="/marketplace" className="text-sm font-medium text-[#00D5FF] hover:text-[#F7F8FC] transition-colors flex items-center gap-2">
              View all trending <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProductGrid products={DEMO_TRENDING_PRODUCTS} />
        </div>
      </section>

      {/* Sellers & Agents & Creators Row */}
      <section className="relative z-20 py-28 border-y border-[#1E3A5C]/40">
        <div className="container-premium">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="p-8 rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#064D3B] via-[#087C61] to-[#00A878] shadow-[0_0_80px_-40px_rgba(8,124,104,0.4)]">
              <div className="relative p-6 md:p-10 bg-[#091D3A]/20 rounded-[2rem]">
                <h3 className="text-xl md:text-2xl font-bold text-[#F7F8FC] mb-4">Explore Seller Stores</h3>
                <p className="text-[#00A878]/90 text-sm mb-6">Verified makers and merchants worldwide.</p>
                <div className="space-y-3">
                  {DEMO_SELLERS.slice(0, 3).map((seller) => (
                    <div key={seller.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FC]/15 hover:bg-[#F7F8FC]/25 transition-colors cursor-pointer">
                      <div className="size-10 rounded-full bg-[#F7F8FC]/25 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="w-full h-full bg-[#091D3A]/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#F7F8FC] font-medium text-sm truncate">{seller.name}</div>
                        <div className="text-[#00A878]/80 text-xs truncate">{seller.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="emerald" size="md" className="mt-6 w-full" asChild>
                  <Link to="/sellers">View All Sellers</Link>
                </Button>
              </div>
            </div>
            <div className="p-8 rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#104BB5] via-[#174A8B] to-[#00D5FF] shadow-[0_0_80px_-40px_rgba(16,75,181,0.4)]">
              <div className="relative p-6 md:p-10 bg-[#091D3A]/20 rounded-[2rem]">
                <h3 className="text-xl md:text-2xl font-bold text-[#F7F8FC] mb-4">Top Agents</h3>
                <p className="text-[#00D5FF]/90 text-sm mb-6">Commission-based partners for global fulfillment.</p>
                <div className="space-y-3">
                  {DEMO_AGENTS.slice(0, 3).map((agent) => (
                    <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FC]/15 hover:bg-[#F7F8FC]/25 transition-colors cursor-pointer">
                      <div className="size-10 rounded-full bg-[#F7F8FC]/25 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="w-full h-full bg-[#091D3A]/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#F7F8FC] font-medium text-sm truncate">{agent.name}</div>
                        <div className="text-[#00D5FF]/80 text-xs truncate">{agent.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="cyan" size="md" className="mt-6 w-full" asChild>
                  <Link to="/agents">View All Agents</Link>
                </Button>
              </div>
            </div>
            <div className="p-8 rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#37136F] via-[#641B9B] to-[#8B35D6] shadow-[0_0_80px_-40px_rgba(100,27,155,0.4)]">
              <div className="relative p-6 md:p-10 bg-[#091D3A]/20 rounded-[2rem]">
                <h3 className="text-xl md:text-2xl font-bold text-[#F7F8FC] mb-4">Trending Creators</h3>
                <p className="text-[#8B35D6]/90 text-sm mb-6">Social commerce voices you can shop from.</p>
                <div className="space-y-3">
                  {DEMO_CREATORS.slice(0, 3).map((creator) => (
                    <div key={creator.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FC]/15 hover:bg-[#F7F8FC]/25 transition-colors cursor-pointer">
                      <div className="size-10 rounded-full bg-[#F7F8FC]/25 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="w-full h-full bg-[#091D3A]/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#F7F8FC] font-medium text-sm truncate">{creator.name}</div>
                        <div className="text-[#8B35D6]/80 text-xs truncate">{creator.handle}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="purple" size="md" className="mt-6 w-full" asChild>
                  <Link to="/creators">View All Creators</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview - Electric Blue and Purple */}
      <section className="relative z-20 py-28">
        <div className="container-premium">
          <div className="relative rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#176BFF] via-[#641B9B] to-[#37136F] shadow-[0_0_80px_-40px_rgba(23,107,255,0.4)]">
            <div className="relative p-10 md:p-16 overflow-hidden flex flex-col md:flex-row gap-12 items-center bg-[#091D3A]/20 rounded-[2rem]">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#F7F8FC] mb-4">AI Shopping Assistant Preview</h2>
                <p className="text-[#8B35D6]/95 text-lg mb-8 leading-relaxed">
                  Ask the assistant to find products, compare sellers, or track an order. This is a design preview — no assistant backend is connected yet.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#00D5FF]/95">
                  <Bot size={16} className="text-[#00D5FF]" />
                  <span>Available soon</span>
                </div>
              </div>
              <div className="relative w-full md:w-80">
                <div className="relative w-full h-48 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/60 backdrop-blur flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 p-6">
                    <div className="w-12 h-12 rounded-full bg-[#C58B22]/30 flex items-center justify-center">
                      <Bot size={24} className="text-[#C58B22]" />
                    </div>
                    <div className="font-medium text-[#F7F8FC]">Bag Of Rice Assistant</div>
                    <div className="text-[0.7rem] text-[#9AA7BD]/80">Available soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Deep Gold and Midnight */}
      <section className="relative z-20 py-28 border-y border-[#1E3A5C]/40">
        <div className="container-premium">
          <div className="relative rounded-[2rem] border border-[#C58B22]/60 bg-gradient-to-br from-[#8C5B0A] via-[#A97916] to-[#C58B22] shadow-[0_0_80px_-40px_rgba(197,139,34,0.5)]">
            <div className="relative p-10 md:p-20 text-center bg-[#091D3A]/15 rounded-[2rem] overflow-hidden">
              <h2 className="text-2xl md:text-3xl font-bold text-[#06152D] mb-4">Ready to Explore?</h2>
              <p className="text-[#06152D]/90 text-lg max-w-xl mx-auto mb-10">
                Join thousands of buyers, sellers, agents and creators building a world without boundaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link to="/marketplace">Start Shopping</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/sellers">Become a Seller</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
