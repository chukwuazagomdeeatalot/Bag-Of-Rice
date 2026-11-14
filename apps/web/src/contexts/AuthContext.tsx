import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  sendVerificationEmail,
  verifyEmail,
  sendPasswordReset,
  resetPassword,
  sendEmailVerificationOTP,
  verifyEmailOTP,
  type AuthUser,
} from '@/lib/auth';

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  emailVerified: boolean;
  login: (email: string, password: string, duration?: number) => Promise<AuthUser | null>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<void>;
  verifyEmail: (userId: string, secret: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (
    userId: string,
    secret: string,
    password: string,
  ) => Promise<void>;
  sendEmailOTP: (phrase?: boolean) => Promise<string>;
  verifyEmailOTP: (userId: string, secret: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogin = useCallback(
    async (email: string, password: string, duration?: number) => {
      await loginUser(email, password, duration);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    },
    [],
  );

  const handleRegister = useCallback(
    async (email: string, password: string, name: string) => {
      const newUser = await registerUser(email, password, name);
      setUser(newUser);
      return newUser;
    },
    [],
  );

  const handleLogout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const handleResendVerification = useCallback(async () => {
    await sendVerificationEmail();
  }, []);

  const handleVerifyEmail = useCallback(
    async (userId: string, secret: string) => {
      await verifyEmail(userId, secret);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    },
    [],
  );

  const handleRequestPasswordReset = useCallback(async (email: string) => {
    await sendPasswordReset(email);
  }, []);

  const handleResetPassword = useCallback(
    async (userId: string, secret: string, password: string) => {
      await resetPassword(userId, secret, password);
    },
    [],
  );

  const handleSendEmailOTP = useCallback(
    async (phrase?: boolean): Promise<string> => {
      return await sendEmailVerificationOTP(phrase);
    },
    [],
  );

  const handleVerifyEmailOTP = useCallback(
    async (userId: string, secret: string) => {
      await verifyEmailOTP(userId, secret);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    },
    [],
  );

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    emailVerified: user?.emailVerification ?? false,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    resendVerification: handleResendVerification,
    verifyEmail: handleVerifyEmail,
    requestPasswordReset: handleRequestPasswordReset,
    resetPassword: handleResetPassword,
    sendEmailOTP: handleSendEmailOTP,
    verifyEmailOTP: handleVerifyEmailOTP,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export default AuthContext;
