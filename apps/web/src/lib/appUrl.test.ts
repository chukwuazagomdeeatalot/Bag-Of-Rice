import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

async function importAppUrl() {
  const mod = await import('@/lib/appUrl');
  return mod;
}

describe('appUrl production configuration', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_APP_URL', 'https://bag-of-rice.pages.dev');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('production callback uses https://bag-of-rice.pages.dev/verify-email', async () => {
    vi.resetModules();
    const { getVerifyEmailCallbackUrl } = await importAppUrl();
    expect(getVerifyEmailCallbackUrl()).toBe(
      'https://bag-of-rice.pages.dev/verify-email',
    );
  });

  it('production callback never uses localhost', async () => {
    vi.resetModules();
    const { getVerifyEmailCallbackUrl } = await importAppUrl();
    const url = getVerifyEmailCallbackUrl();
    expect(url.startsWith('https://')).toBe(true);
    expect(url).not.toContain('localhost');
    expect(url).not.toContain('127.0.0.1');
  });

  it('development can use localhost', async () => {
    vi.stubEnv('VITE_APP_URL', 'http://localhost:5173');
    vi.resetModules();
    const { getVerifyEmailCallbackUrl } = await importAppUrl();
    expect(getVerifyEmailCallbackUrl()).toBe(
      'http://localhost:5173/verify-email',
    );
  });

  it('throws when VITE_APP_URL is empty', async () => {
    vi.stubEnv('VITE_APP_URL', '');
    vi.resetModules();
    const { getAppUrl } = await importAppUrl();
    expect(() => getAppUrl()).toThrow(/missing/i);
  });

  it('throws when production URL is not HTTPS', async () => {
    vi.stubEnv('VITE_APP_URL', 'http://example.com');
    vi.resetModules();
    const { getAppUrl } = await importAppUrl();
    expect(() => getAppUrl()).toThrow(/HTTPS/i);
  });
});

describe('appUrl isLocalhost', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns true for localhost', async () => {
    vi.stubEnv('VITE_APP_URL', 'http://localhost:5173');
    vi.resetModules();
    const { isLocalhost } = await importAppUrl();
    expect(isLocalhost()).toBe(true);
  });

  it('returns false for production domain', async () => {
    vi.stubEnv('VITE_APP_URL', 'https://bag-of-rice.pages.dev');
    vi.resetModules();
    const { isLocalhost } = await importAppUrl();
    expect(isLocalhost()).toBe(false);
  });
});
