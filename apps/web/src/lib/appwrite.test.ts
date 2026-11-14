import { Client, Account } from 'appwrite';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAppwriteStatus } from '@/lib/appwriteStatus';

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function stubEnv(endpoint: string, projectId: string) {
  vi.stubEnv('VITE_APPWRITE_ENDPOINT', endpoint);
  vi.stubEnv('VITE_APPWRITE_PROJECT_ID', projectId);
}

describe('Appwrite client initialization', () => {
  it('throws when environment configuration is missing', async () => {
    stubEnv('', '');
    await expect(import('@/lib/appwrite')).rejects.toThrow(/missing/i);
  });

  it('throws when endpoint is malformed', async () => {
    stubEnv('not-a-url', 'bag-of-rice');
    await expect(import('@/lib/appwrite')).rejects.toThrow(/invalid/i);
  });

  it('throws when project id is missing', async () => {
    stubEnv('https://nyc.cloud.appwrite.io/v1', '');
    await expect(import('@/lib/appwrite')).rejects.toThrow(/missing/i);
  });

  it('initializes exactly one reusable client and an account service with valid configuration', async () => {
    stubEnv('https://nyc.cloud.appwrite.io/v1', 'bag-of-rice');
    const mod = await import('@/lib/appwrite');

    expect(mod.appwriteClient).toBeInstanceOf(Client);
    expect(mod.account).toBeInstanceOf(Account);
    expect(mod.appwriteClient).toBeDefined();
    expect(mod.account).toBeDefined();
  });

  it('does not log secrets or tokens (no console calls in client module)', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      stubEnv('https://nyc.cloud.appwrite.io/v1', 'bag-of-rice');
      await import('@/lib/appwrite');
      expect(logSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    } finally {
      logSpy.mockRestore();
      errorSpy.mockRestore();
    }
  });
});

describe('Appwrite configuration status', () => {
  it('reports missing configuration when env vars are absent', async () => {
    stubEnv('', '');
    const status = await getAppwriteStatus();
    expect(status.kind).toBe('missing');
    expect(status.connection).toBe('not-verified');
    expect(typeof status.detail).toBe('string');
    expect(status.detail.length).toBeGreaterThan(0);
  });

  it('reports present-but-not-verified when configuration is valid', async () => {
    stubEnv('https://nyc.cloud.appwrite.io/v1', 'bag-of-rice');
    const status = await getAppwriteStatus();
    expect(status.kind).toBe('present');
    expect(status.connection).toBe('not-verified');
    // Must not claim the server is reachable merely because env vars exist.
    expect(status.detail.toLowerCase()).not.toContain('reachable');
    expect(status.detail.toLowerCase()).not.toContain('connected');
  });

  it('does not verify connection without making authenticated calls', async () => {
    stubEnv('https://nyc.cloud.appwrite.io/v1', 'bag-of-rice');
    const status = await getAppwriteStatus();
    expect(status.kind).toBe('present');
    expect(status.connection).toBe('not-verified');
  });
});
