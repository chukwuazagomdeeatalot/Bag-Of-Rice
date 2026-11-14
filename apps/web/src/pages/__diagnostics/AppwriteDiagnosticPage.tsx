import { useState } from 'react';
import { runAppwriteConnectivityCheck, type ConnectivityResult } from '@/lib/appwriteDiagnostics';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export function AppwriteDiagnosticPage() {
  const [result, setResult] = useState<ConnectivityResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!import.meta.env.DEV) {
    return (
      <Card className="p-8 max-w-md mx-auto">
        <h2 className="h2 text-text mb-4">Diagnostics</h2>
        <p className="text-muted text-sm">
          Diagnostic pages are not available in production.
        </p>
      </Card>
    );
  }

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const result = await runAppwriteConnectivityCheck();
      setResult(result);
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = result?.status === 'authenticated' || result?.status === 'reachable';

  return (
    <Card className="p-8 max-w-md mx-auto">
      <h2 className="h2 text-text mb-2">Appwrite Connectivity Diagnostic</h2>
      <p className="text-muted text-sm mb-6">
        Development-only connectivity check. Uses the existing Appwrite Account instance.{' '}
        <strong className="text-text">No account is created or modified.</strong>
      </p>
      <Button
        onClick={handleTest}
        disabled={loading}
        className="w-full mb-4"
      >
        {loading ? 'Checking connection...' : 'Test Appwrite Connection'}
      </Button>
      {result && (
        <div
          className={`p-4 rounded-xl border ${
            isSuccess
              ? 'border-emerald/20 bg-emerald/5 text-emerald'
              : 'border-border bg-surface text-text'
          }`}
        >
          <Badge
            variant={isSuccess ? 'emerald' : 'default'}
            className="mb-2 block"
          >
            {result.status}
          </Badge>
          <p className="text-sm">{result.message}</p>
        </div>
      )}
    </Card>
  );
}
