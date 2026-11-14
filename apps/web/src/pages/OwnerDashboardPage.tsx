import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

export function OwnerDashboardPage() {
  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#17245E]/20 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C58B22]/20 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/40 bg-[#091D3A]/70 backdrop-blur-sm">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-16 relative z-20">
        <div className="max-w-2xl mx-auto">
          <Card className="p-10 glow">
            <div className="flex gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#C58B22]/20 flex items-center justify-center shrink-0">
                <Shield size={28} className="text-[#C58B22]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#F7F8FC] mb-1">Platform Owner Access</h2>
                <p className="text-[#9AA7BD] text-sm">Protected-design placeholder only.</p>
              </div>
            </div>
            <div className="space-y-5 text-[#9AA7BD] text-sm leading-relaxed">
              <p>
                <AlertTriangle size={16} className="text-[#C58B22] mr-2 inline" />
                No administrator access is granted in this phase.
              </p>
              <p>There is no secret or hardcoded owner account.</p>
              <p>Real authorization and role-based access will be implemented in a later phase.</p>
            </div>
            <div className="mt-10 p-6 rounded-xl border border-[#1E3A5C] bg-[#091D3A]/50 backdrop-blur-sm">
              <Lock size={18} className="text-[#9AA7BD] mr-3" />
              <span className="text-[0.85rem] text-[#9AA7BD]">
                This page is intentionally locked. Do not attempt to bypass it.
              </span>
            </div>
            <div className="mt-10">
              <Button variant="outline" className="w-full" asChild>
                <a href="/">Return to Storefront</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
