import { useState, useEffect } from 'react';
import { appwriteClient } from '@/lib/appwrite';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

type PingStatus = 'waiting' | 'success' | 'failure';

export function AppwritePingPage() {
  const [status, setStatus] = useState<PingStatus>('waiting');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return;
    setChecked(true);

    appwriteClient
      .ping()
      .then(() => {
        setStatus('success');
      })
      .catch(() => {
        setStatus('failure');
      });
  }, [checked]);

  const label = status === 'waiting' ? 'Waiting...' : status === 'success' ? 'Connection successful' : 'Connection failed';

  return (
    <Card className="p-8 max-w-md mx-auto">
      <h2 className="h2 text-text mb-4">Appwrite Connection Ping</h2>
      <Badge variant={status === 'success' ? 'emerald' : 'default'} className="mb-2 block">
        {label}
      </Badge>
      <p className="text-muted text-sm">
        Temporary diagnostic page. No account is created or modified.
      </p>
    </Card>
  );
}
