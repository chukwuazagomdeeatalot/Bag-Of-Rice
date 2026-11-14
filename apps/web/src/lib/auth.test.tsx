import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

vi.mock('@/lib/appwrite', () => ({
  account: {
    get: vi.fn(),
    create: vi.fn(),
    createEmailPasswordSession: vi.fn(),
    listSessions: vi.fn(),
    deleteSession: vi.fn(),
    createEmailVerification: vi.fn(),
    updateEmailVerification: vi.fn(),
    createEmailVerificationOTP: vi.fn(),
    updateEmailVerificationOTP: vi.fn(),
    createRecovery: vi.fn(),
    updateRecovery: vi.fn(),
  },
}));

import {
  registerUser,
  loginUser,
  logoutUser,
  sendVerificationEmail,
  verifyEmail,
  sendPasswordReset,
  resetPassword,
  sendEmailVerificationOTP,
  verifyEmailOTP,
} from '@/lib/auth';
import { account } from '@/lib/appwrite';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const TestComponent = () => {
  const { user, loading, isAuthenticated, login, register, logout } = useAuth();
  if (loading) return <div data-testid="auth-loading">Loading...</div>;
  return (
    <div>
      <div data-testid="auth-user">{user ? user.email : 'No user'}</div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <button data-testid="btn-login" onClick={() => login('test@example.com', 'password123')}>
        Login
      </button>
      <button
        data-testid="btn-register"
        onClick={() => register('new@example.com', 'password123', 'New User')}
      >
        Register
      </button>
      <button data-testid="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_APP_URL', 'http://localhost:5173');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts in loading state', () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId('auth-loading')).toBeInTheDocument();
  });

  it('restores session when getCurrentUser succeeds', async () => {
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: true,
    } as any);

    render(<TestComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId('auth-user')).toHaveTextContent('test@example.com');
    });
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
  });

  it('shows unauthenticated when getCurrentUser fails', async () => {
    vi.mocked(account.get).mockRejectedValue(new Error('No session'));

    render(<TestComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    });
    expect(screen.getByTestId('auth-user')).toHaveTextContent('No user');
  });

  it('calls loginUser on login', async () => {
    vi.mocked(account.get).mockResolvedValueOnce(null as any);
    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);
    vi.mocked(account.get).mockResolvedValueOnce({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);

    render(<TestComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('auth-loading')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('btn-login'));

    expect(vi.mocked(account.createEmailPasswordSession)).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      duration: undefined,
    });
  });

  it('calls registerUser on register', async () => {
    vi.mocked(account.get).mockResolvedValueOnce(null as any);
    vi.mocked(account.create).mockResolvedValue({
      $id: 'user-2',
      email: 'new@example.com',
      name: 'New User',
      emailVerification: false,
    } as any);
    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);
    vi.mocked(account.createEmailVerification).mockResolvedValue({} as any);
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-2',
      email: 'new@example.com',
      name: 'New User',
      emailVerification: false,
    } as any);

    render(<TestComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('auth-loading')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('btn-register'));

    expect(vi.mocked(account.create)).toHaveBeenCalledWith({
      userId: expect.any(String),
      email: 'new@example.com',
      password: 'password123',
      name: 'New User',
    });
  });

  it('calls logoutUser on logout', async () => {
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);
    vi.mocked(account.listSessions).mockResolvedValue({
      sessions: [],
    } as any);
    vi.mocked(account.deleteSession).mockResolvedValue({} as any);
    vi.mocked(account.get).mockResolvedValueOnce(null as any);

    render(<TestComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    });

    fireEvent.click(screen.getByTestId('btn-logout'));

    expect(vi.mocked(account.listSessions)).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    });
  });
});

describe('Auth utility functions - ordering guarantees', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_APP_URL', 'http://localhost:5173');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('registration calls account.create BEFORE createEmailPasswordSession BEFORE createEmailVerification', async () => {
    const createMock = vi.mocked(account.create);
    const sessionMock = vi.mocked(account.createEmailPasswordSession);
    const verificationMock = vi.mocked(account.createEmailVerification);
    const getMock = vi.mocked(account.get);

    createMock.mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);
    sessionMock.mockResolvedValue({} as any);
    verificationMock.mockResolvedValue({} as any);
    getMock.mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);

    await registerUser('test@example.com', 'password123', 'Test User');

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(sessionMock).toHaveBeenCalledTimes(1);
    expect(verificationMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledTimes(1);

    // Verify ordering: create -> session -> verification -> get
    const createCall = createMock.mock.invocationCallOrder[0];
    const sessionCall = sessionMock.mock.invocationCallOrder[0];
    const verificationCall = verificationMock.mock.invocationCallOrder[0];
    const getCall = getMock.mock.invocationCallOrder[0];

    expect(createCall).toBeLessThan(sessionCall);
    expect(sessionCall).toBeLessThan(verificationCall);
    expect(verificationCall).toBeLessThan(getCall);
  });

  it('registration calls session creation BEFORE verification email', async () => {
    const sessionMock = vi.mocked(account.createEmailPasswordSession);
    const verificationMock = vi.mocked(account.createEmailVerification);

    sessionMock.mockResolvedValue({} as any);
    verificationMock.mockResolvedValue({} as any);

    vi.mocked(account.create).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);

    await registerUser('test@example.com', 'password123', 'Test User');

    expect(sessionMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      duration: undefined,
    });

    expect(verificationMock).toHaveBeenCalledWith({
      url: expect.stringContaining('/verify-email'),
    });

    expect(sessionMock.mock.invocationCallOrder[0]).toBeLessThan(
      verificationMock.mock.invocationCallOrder[0],
    );
  });

  it('verification is never requested if session creation fails', async () => {
    vi.mocked(account.create).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);
    vi.mocked(account.createEmailPasswordSession).mockRejectedValue(new Error('Session failed'));
    vi.mocked(account.createEmailVerification).mockResolvedValue({} as any);

    await expect(
      registerUser('test@example.com', 'password123', 'Test User'),
    ).rejects.toThrow('Session failed');

    expect(vi.mocked(account.createEmailVerification)).not.toHaveBeenCalled();
  });

  it('existing users can sign in and resend verification', async () => {
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-1',
      email: 'existing@example.com',
      name: 'Existing User',
      emailVerification: false,
    } as any);
    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);
    vi.mocked(account.createEmailVerification).mockResolvedValue({} as any);

    const { loginUser, sendVerificationEmail } = await import('@/lib/auth');

    await loginUser('existing@example.com', 'password123');
    await sendVerificationEmail();

    expect(vi.mocked(account.createEmailPasswordSession)).toHaveBeenCalledWith({
      email: 'existing@example.com',
      password: 'password123',
      duration: undefined,
    });
    expect(vi.mocked(account.createEmailVerification)).toHaveBeenCalledWith({
      url: expect.stringContaining('/verify-email'),
    });
  });

  it('authentication state is refreshed via account.get() after login through handleLogin', async () => {
    const getMock = vi.mocked(account.get);
    getMock.mockResolvedValue({
      $id: 'user-1',
      email: 'refreshed@example.com',
      name: 'Refreshed User',
      emailVerification: true,
    } as any);

    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);

    const RefreshTest = () => {
      const { login } = useAuth();
      const handleClick = async () => {
        await login('refreshed@example.com', 'password123');
      };
      return (
        <button data-testid="btn-refresh-login" onClick={handleClick}>
          Login
        </button>
      );
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <RefreshTest />
        </AuthProvider>
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('btn-refresh-login'));

    await waitFor(() => {
      expect(getMock).toHaveBeenCalled();
    });

    expect(vi.mocked(account.createEmailPasswordSession)).toHaveBeenCalledWith({
      email: 'refreshed@example.com',
      password: 'password123',
      duration: undefined,
    });
    expect(getMock).toHaveBeenCalledWith();
  });
});

describe('Auth utility functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_APP_URL', 'http://localhost:5173');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('registerUser calls account.create with ID.unique()', async () => {
    vi.mocked(account.create).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);
    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);
    vi.mocked(account.createEmailVerification).mockResolvedValue({} as any);
    vi.mocked(account.get).mockResolvedValue({
      $id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerification: false,
    } as any);

    await registerUser('test@example.com', 'password123', 'Test User');

    expect(vi.mocked(account.create)).toHaveBeenCalledWith({
      userId: expect.any(String),
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
  });

  it('loginUser calls account.createEmailPasswordSession', async () => {
    vi.mocked(account.createEmailPasswordSession).mockResolvedValue({} as any);

    await loginUser('test@example.com', 'password123');

    expect(vi.mocked(account.createEmailPasswordSession)).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      duration: undefined,
    });
  });

  it('logoutUser calls account.listSessions and account.deleteSession', async () => {
    vi.mocked(account.listSessions).mockResolvedValue({
      sessions: [{ $id: 'session-1' }, { $id: 'session-2' }],
    } as any);
    vi.mocked(account.deleteSession).mockResolvedValue({} as any);

    await logoutUser();

    expect(vi.mocked(account.deleteSession)).toHaveBeenCalledWith('session-1');
    expect(vi.mocked(account.deleteSession)).toHaveBeenCalledWith('session-2');
  });

  it('sendPasswordReset calls account.createRecovery', async () => {
    vi.mocked(account.createRecovery).mockResolvedValue({} as any);

    await sendPasswordReset('test@example.com');

    expect(vi.mocked(account.createRecovery)).toHaveBeenCalledWith({
      email: 'test@example.com',
      url: expect.stringContaining('/reset-password'),
    });
  });

  it('resetPassword calls account.updateRecovery', async () => {
    vi.mocked(account.updateRecovery).mockResolvedValue({} as any);

    await resetPassword('user-1', 'secret-123', 'newPassword123');

    expect(vi.mocked(account.updateRecovery)).toHaveBeenCalledWith({
      userId: 'user-1',
      secret: 'secret-123',
      password: 'newPassword123',
    });
  });

  it('sendVerificationEmail calls account.createEmailVerification', async () => {
    vi.mocked(account.createEmailVerification).mockResolvedValue({} as any);

    await sendVerificationEmail();

    expect(vi.mocked(account.createEmailVerification)).toHaveBeenCalledWith({
      url: expect.stringContaining('/verify-email'),
    });
  });

  it('verifyEmail calls account.updateEmailVerification', async () => {
    vi.mocked(account.updateEmailVerification).mockResolvedValue({} as any);

    await verifyEmail('user-1', 'secret-123');

    expect(vi.mocked(account.updateEmailVerification)).toHaveBeenCalledWith({
      userId: 'user-1',
      secret: 'secret-123',
    });
  });

  it('sendEmailVerificationOTP calls account.createEmailVerificationOTP and returns userId', async () => {
    vi.mocked(account.createEmailVerificationOTP).mockResolvedValue({
      $id: 'token-1',
      userId: 'user-1',
      secret: '',
    } as any);

    const userId = await sendEmailVerificationOTP();

    expect(userId).toBe('user-1');
    expect(vi.mocked(account.createEmailVerificationOTP)).toHaveBeenCalledWith({});
  });

  it('verifyEmailOTP calls account.updateEmailVerificationOTP', async () => {
    vi.mocked(account.updateEmailVerificationOTP).mockResolvedValue({} as any);

    await verifyEmailOTP('user-1', '123456');

    expect(vi.mocked(account.updateEmailVerificationOTP)).toHaveBeenCalledWith({
      userId: 'user-1',
      secret: '123456',
    });
  });
});
