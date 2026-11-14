import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { DEMO_AGENTS, DEMONSTRATION_NOTICE } from '@/lib/sampleData';

export function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#104BB5]/20 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A64F27]/20 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/40 bg-[#091D3A]/70 backdrop-blur-md">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-12 relative z-20">
        <div className="flex flex-col gap-8 mb-12">
          <div>
            <Brand size="md" className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#F7F8FC] mb-4">Agents</h1>
            <p className="text-[#9AA7BD] text-lg">
              Commission-based partners who help sellers fulfill and ship orders worldwide.
            </p>
          </div>
          <Badge variant="copper">Professional &amp; Rewarding</Badge>
        </div>
        <p className="text-[0.7rem] text-[#9AA7BD]/60 mb-10">{DEMONSTRATION_NOTICE}</p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_AGENTS.map((agent) => (
            <Card key={agent.id} className="h-full flex flex-col glow">
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-bold text-[#F7F8FC] text-lg mb-1">{agent.name}</div>
                    <div className="text-[#00D5FF]/90 text-sm">{agent.location}</div>
                  </div>
                  <Badge variant="copper">{agent.commissionRate * 100}% Commission</Badge>
                </div>
                <div className="text-[#9AA7BD] text-sm mb-6">{agent.specialty}</div>
                <div className="flex items-center gap-2 text-sm text-[#9AA7BD]/80 mb-8">
                  <span className="font-medium">{agent.rating.toFixed(1)}</span>
                  <span>({agent.reviewCount} reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/40">
                    <div className="text-[0.7rem] text-[#9AA7BD]/60 uppercase tracking-widest mb-1">Commission Rate</div>
                    <div className="text-xl font-bold text-[#F7F8FC]">{agent.commissionRate * 100}%</div>
                  </div>
                  <div className="p-4 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/40">
                    <div className="text-[0.7rem] text-[#9AA7BD]/60 uppercase tracking-widest mb-1">Rating</div>
                    <div className="text-xl font-bold text-[#F7F8FC]">{agent.rating.toFixed(1)}</div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#1E3A5C]/40">
                <p className="text-[0.7rem] text-[#9AA7BD]/60 text-center">
                  Agent partnerships are demonstration content. Real agent onboarding comes in a later phase.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
