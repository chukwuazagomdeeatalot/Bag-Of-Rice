import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppwritePingPage } from '@/pages/__diagnostics/AppwritePingPage';

vi.mock('@/lib/appwrite', () => ({
  appwriteClient: {
    ping: vi.fn(),
  },
}));

import { appwriteClient } from '@/lib/appwrite';

const mockPing = vi.mocked(appwriteClient.ping);

describe('AppwritePingPage', () => {
  beforeEach(() => {
    mockPing.mockClear();
    mockPing.mockResolvedValue({} as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows waiting state initially', () => {
    render(<AppwritePingPage />);
    expect(screen.getByText('Waiting...')).toBeInTheDocument();
  });

  it('displays connection successful when ping resolves', async () => {
    mockPing.mockResolvedValue({} as any);

    render(<AppwritePingPage />);

    await waitFor(() => {
      expect(screen.getByText('Connection successful')).toBeInTheDocument();
    });
    expect(mockPing).toHaveBeenCalledTimes(1);
  });

  it('displays connection failed when ping rejects', async () => {
    mockPing.mockRejectedValue(new Error('Network error'));

    render(<AppwritePingPage />);

    await waitFor(() => {
      expect(screen.getByText('Connection failed')).toBeInTheDocument();
    });
    expect(mockPing).toHaveBeenCalledTimes(1);
  });

  it('calls ping exactly once and does not repeat on re-render', async () => {
    mockPing.mockResolvedValue({} as any);

    render(<AppwritePingPage />);

    await waitFor(() => {
      expect(screen.getByText('Connection successful')).toBeInTheDocument();
    });

    expect(mockPing).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Connection successful'));

    expect(mockPing).toHaveBeenCalledTimes(1);
  });
});
