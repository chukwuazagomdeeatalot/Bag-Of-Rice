import { AppwriteException } from 'appwrite';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/appwrite', () => ({
  account: { get: vi.fn() },
}));

import { runAppwriteConnectivityCheck } from '@/lib/appwriteDiagnostics';
import { account } from '@/lib/appwrite';

const mockGet = vi.mocked(account.get);

describe('runAppwriteConnectivityCheck', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('returns authenticated when account.get() succeeds (HTTP 200)', async () => {
    mockGet.mockResolvedValue({} as any);
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('authenticated');
    expect(result.httpCode).toBe(200);
    expect(result.message).toContain('reached successfully');
    expect(result.message).not.toContain('email');
    expect(result.message).not.toContain('name');
  });

  it('returns reachable when account.get() throws HTTP 401', async () => {
    mockGet.mockRejectedValue(
      new AppwriteException('Unauthorized', 401, 'unauthorized', 'Missing session'),
    );
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('reachable');
    expect(result.httpCode).toBe(401);
    expect(result.message).toContain('reached successfully');
    expect(result.message).toContain('No authenticated session exists');
  });

  it('does not treat HTTP 401 as authentication success', async () => {
    mockGet.mockRejectedValue(
      new AppwriteException('Unauthorized', 401, 'unauthorized', 'Missing session'),
    );
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('reachable');
    expect(result.status).not.toBe('authenticated');
  });

  it('returns config-error for invalid project (HTTP 404)', async () => {
    mockGet.mockRejectedValue(
      new AppwriteException('Project not found', 404, 'not_found', 'Project not found'),
    );
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('config-error');
    expect(result.httpCode).toBe(404);
    expect(result.message).toContain('404');
  });

  it('returns config-error for invalid endpoint (HTTP 400)', async () => {
    mockGet.mockRejectedValue(
      new AppwriteException('Invalid endpoint', 400, 'invalid_endpoint', 'Invalid endpoint'),
    );
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('config-error');
    expect(result.httpCode).toBe(400);
  });

  it('returns network-error for non-Appwrite failures', async () => {
    mockGet.mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('network-error');
    expect(result.httpCode).toBeUndefined();
    expect(result.message).toContain('could not complete');
  });

  it('returns network-error for CORS-style failures', async () => {
    mockGet.mockRejectedValue(new Error('CORS error'));
    const result = await runAppwriteConnectivityCheck();
    expect(result.status).toBe('network-error');
    expect(result.httpCode).toBeUndefined();
  });

  it('does not expose raw error objects in the message', async () => {
    mockGet.mockRejectedValue(new AppwriteException('Forbidden', 403, 'forbidden', 'Forbidden'));
    const result = await runAppwriteConnectivityCheck();
    expect(result.message).not.toContain('stack');
    expect(result.message).not.toContain('headers');
    expect(result.message).not.toContain('token');
  });
});
