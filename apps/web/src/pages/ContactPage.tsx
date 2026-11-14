import { useState } from 'react';
import { Brand } from '@/components/common/Brand';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#06152D] text-[#F7F8FC] relative overflow-hidden z-10">
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#091D3A]/80 rounded-full blur-[140px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D5FF]/20 rounded-full blur-[140px] -z-10" />

      <section className="relative z-20 border-b border-[#1E3A5C]/40 bg-[#091D3A]/70 backdrop-blur-sm">
        <div className="container-premium py-5">
          <Brand size="sm" className="mr-auto mb-4 md:mb-0" />
        </div>
      </section>

      <div className="container-premium py-16 relative z-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Card className="p-8 h-full">
              <h2 className="text-xl font-bold text-[#F7F8FC] mb-6">Get in Touch</h2>
              <p className="text-[#9AA7BD] text-sm mb-8">
                This contact form is a design placeholder. No real addresses, phone numbers or email addresses are published, and no messages are sent.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C58B22]/20 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#C58B22]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#F7F8FC]">Office Location</div>
                    <div className="text-[#9AA7BD] text-sm">Design placeholder — no real address.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00D5FF]/20 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#00D5FF]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#F7F8FC]">Telephone</div>
                    <div className="text-[#9AA7BD] text-sm">Design placeholder — no real number.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00A878]/20 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#00A878]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#F7F8FC]">Email</div>
                    <div className="text-[#9AA7BD] text-sm">Design placeholder — no real address.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#B52E55]/20 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-[#B52E55]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#F7F8FC]">Support Hours</div>
                    <div className="text-[#9AA7BD] text-sm">Design placeholder only.</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-8">
            <Card className="p-8 lg:p-12 h-full glow">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Input label="Message" asTextarea value={message} onChange={(e) => setMessage(e.target.value)} required />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
              {submitted && (
                <div className="mt-6 p-5 rounded-xl border border-[#00A878]/30 bg-[#00A878]/10 text-[#00A878] text-sm">
                  Message sent (design placeholder — nothing was transmitted).
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
