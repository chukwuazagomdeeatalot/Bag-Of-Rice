import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { DEMO_CREATORS, DEMONSTRATION_NOTICE } from '@/lib/sampleData';
import { Play, Users } from 'lucide-react';

export function CreatorsPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#641B9B]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#B52E55]/25 rounded-full blur-[140px] -z-10" />
      <div className="fixed top-[20%] left-[-5%] w-[30%] h-[30%] bg-[#00D5FF]/25 rounded-full blur-[120px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/60 bg-[#091D3A]/90 backdrop-blur-md">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="flex flex-col gap-8 mb-12">
          <div>
            <Brand size="md" className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#F7F8FC] mb-4">Creators</h1>
            <p className="text-[#9AA7BD] text-lg">
              Social commerce creators with shoppable video and post content.
            </p>
          </div>
          <Badge variant="violet">Expressive &amp; Creative</Badge>
        </div>
        <p className="text-[0.7rem] text-[#9AA7BD]/70 mb-12">{DEMONSTRATION_NOTICE}</p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_CREATORS.map((creator) => (
            <Card key={creator.id} className="h-full flex flex-col glow">
              <div className="relative aspect-video rounded-xl border border-[#1E3A5C]/40 bg-gradient-to-br from-[#37136F] to-[#641B9B] shadow-[0_0_80px_-40px_rgba(100,27,155,0.4)] mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={36} className="text-[#C58B22]/95" />
                </div>
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#06152D]/90 backdrop-blur text-[0.65rem] font-bold text-[#F7F8FC]">
                  <Users size={14} className="text-[#00D5FF]" />
                  {String(creator.followerCount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-[#F7F8FC] text-lg">{creator.name}</div>
                  <span className="text-[#8B35D6] text-sm font-medium">@{creator.handle}</span>
                </div>
                <div className="text-[#9AA7BD] text-sm mb-6">{creator.bio}</div>
                <div className="flex items-center gap-3 text-sm text-[#9AA7BD]/90 mb-8">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#087C61] animate-glow-pulse" />
                    {creator.videoCount} videos
                  </span>
                  <span>· {creator.rating.toFixed(1)} rating</span>
                </div>
                <Button variant="purple" className="w-full">
                  View Content
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
