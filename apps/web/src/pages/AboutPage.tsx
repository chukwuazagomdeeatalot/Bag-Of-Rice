import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { MapPin, Truck, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#17245E]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/25 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/60 bg-[#091D3A]/90 backdrop-blur-sm">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F7F8FC] mb-6">About Bag Of Rice</h1>
            <p className="text-[#9AA7BD] text-lg max-w-2xl mx-auto leading-relaxed">
              Bag Of Rice is a global social commerce and creator marketplace built on one idea:
              <span className="text-[#00D5FF] font-bold">One Platform. Endless Opportunities.</span>
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <Card className="p-8 h-full border-l-4 border-[#C58B22]/40">
              <div className="w-12 h-12 rounded-xl bg-[#C58B22]/20 flex items-center justify-center mb-6">
                <MapPin size={24} className="text-[#C58B22]" />
              </div>
              <h3 className="text-xl font-bold text-[#F7F8FC] mb-4">Worldwide from Day One</h3>
              <p className="text-[#9AA7BD] text-sm leading-relaxed">
                International trade is our foundation — multiple currencies, countries, time zones and translation-ready strings.
              </p>
            </Card>
            <Card className="p-8 h-full border-l-4 border-[#00D5FF]/40">
              <div className="w-12 h-12 rounded-xl bg-[#00D5FF]/20 flex items-center justify-center mb-6">
                <Truck size={24} className="text-[#00D5FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#F7F8FC] mb-4">Global Marketplace</h3>
              <p className="text-[#9AA7BD] text-sm leading-relaxed">
                Discover products, connect with sellers and shop from creators across borders.
              </p>
            </Card>
            <Card className="p-8 h-full border-l-4 border-[#00A878]/40">
              <div className="w-12 h-12 rounded-xl bg-[#00A878]/20 flex items-center justify-center mb-6">
                <Shield size={24} className="text-[#00A878]" />
              </div>
              <h3 className="text-xl font-bold text-[#F7F8FC] mb-4">Verified Partners</h3>
              <p className="text-[#9AA7BD] text-sm leading-relaxed">
                Sellers, agents and creators you can trust — all clearly labelled as demonstration data.
              </p>
            </Card>
          </div>

          <div className="mt-16 rounded-[2rem] border border-[#1E3A5C]/40 bg-gradient-to-br from-[#37136F] to-[#641B9B] shadow-[0_0_80px_-40px_rgba(100,27,155,0.4)] p-10 md:p-16 text-center bg-[#091D3A]/20 rounded-[2rem]">
            <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">Ready to Join?</h2>
            <p className="text-[#8B35D6]/90 text-lg mb-8 max-w-xl mx-auto">
              Become a buyer, seller, agent or creator on Bag Of Rice today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyan" size="lg" asChild>
                <a href="/marketplace">Explore Marketplace</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/sellers">Become a Seller</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
