import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppwriteDiagnosticPage } from '@/pages/__diagnostics/AppwriteDiagnosticPage';

vi.mock('@/lib/appwriteDiagnostics', () => ({
  runAppwriteConnectivityCheck: vi.fn(),
}));

import { runAppwriteConnectivityCheck } from '@/lib/appwriteDiagnostics';

const mockCheck = vi.mocked(runAppwriteConnectivityCheck);

describe('AppwriteDiagnosticPage', () => {
  beforeEach(() => {
    mockCheck.mockReset();
    vi.stubEnv('VITE_APPWRITE_ENDPOINT', 'https://nyc.cloud.appwrite.io/v1');
    vi.stubEnv('VITE_APPWRITE_PROJECT_ID', 'bag-of-rice');
  });

  it('renders the test button and is not loading initially', () => {
    render(<AppwriteDiagnosticPage />);
    expect(
      screen.getByRole('button', { name: 'Test Appwrite Connection' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Checking connection...')).not.toBeInTheDocument();
  });

  it('shows loading state while the check runs', async () => {
    let resolveCheck: ((v: any) => void) | undefined;
    mockCheck.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCheck = resolve;
        }),
    );
    render(<AppwriteDiagnosticPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Appwrite Connection' }));
    expect(screen.getByText('Checking connection...')).toBeInTheDocument();
    resolveCheck!({
      status: 'reachable',
      httpCode: 401,
      message: 'Appwrite server reached successfully. No authenticated session exists.',
    });
    await vi.waitFor(() => {
      expect(screen.queryByText('Checking connection...')).not.toBeInTheDocument();
    });
  });

  it('displays reachable result for HTTP 401', async () => {
    mockCheck.mockResolvedValue({
      status: 'reachable',
      httpCode: 401,
      message: 'Appwrite server reached successfully. No authenticated session exists.',
    });
    render(<AppwriteDiagnosticPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Appwrite Connection' }));
    await vi.waitFor(() => {
      expect(screen.getByText('reachable')).toBeInTheDocument();
    });
    expect(screen.getByText(/No authenticated session exists/)).toBeInTheDocument();
  });

  it('displays authenticated result for HTTP 200 without sensitive info', async () => {
    mockCheck.mockResolvedValue({
      status: 'authenticated',
      httpCode: 200,
      message: 'Appwrite server reached successfully. Authenticated session active.',
    });
    render(<AppwriteDiagnosticPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Appwrite Connection' }));
    await vi.waitFor(() => {
      expect(screen.getByText('authenticated')).toBeInTheDocument();
    });
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    expect(screen.queryByText(/user/i)).not.toBeInTheDocument();
  });

  it('displays config-error with HTTP status', async () => {
    mockCheck.mockResolvedValue({
      status: 'config-error',
      httpCode: 400,
      message: 'Appwrite configuration error (HTTP 400): invalid_endpoint',
    });
    render(<AppwriteDiagnosticPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Appwrite Connection' }));
    await vi.waitFor(() => {
      expect(screen.getByText('config-error')).toBeInTheDocument();
    });
    expect(screen.getByText(/400/)).toBeInTheDocument();
  });

  it('displays network-error for connectivity failures', async () => {
    mockCheck.mockResolvedValue({
      status: 'network-error',
      httpCode: undefined,
      message: 'The browser could not complete the connection check.',
    });
    render(<AppwriteDiagnosticPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Appwrite Connection' }));
    await vi.waitFor(() => {
      expect(screen.getByText('network-error')).toBeInTheDocument();
    });
  });

  it('does not run the check automatically on mount', () => {
    render(<AppwriteDiagnosticPage />);
    expect(mockCheck).not.toHaveBeenCalled();
  });
});
