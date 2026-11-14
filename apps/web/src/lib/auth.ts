import { ID } from 'appwrite';
import { account } from '@/lib/appwrite';
import {
  getVerifyEmailCallbackUrl,
  getResetPasswordCallbackUrl,
} from '@/lib/appUrl';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  emailVerification: boolean;
};

export function mapAppwriteUser(user: Awaited<ReturnType<typeof account.get>>): AuthUser {
  return {
    id: user.$id,
    email: user.email,
    name: user.name,
    emailVerification: user.emailVerification,
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await account.get();
    return mapAppwriteUser(user);
  } catch {
    return null;
  }
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<AuthUser> {
  // Step 1: Create the Appwrite account
  await account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });

  // Step 2: Immediately establish an email/password session with the registration credentials
  await account.createEmailPasswordSession({ email, password });

  // Step 3: Only now that the session is established, send the verification email
  await account.createEmailVerification({ url: getVerifyEmailCallbackUrl() });

  // Step 4: Refresh the authentication context using account.get()
  const user = await account.get();
  return mapAppwriteUser(user);
}

export async function loginUser(
  email: string,
  password: string,
  duration?: number,
): Promise<void> {
  await account.createEmailPasswordSession({ email, password, duration });
}

export async function logoutUser(): Promise<void> {
  try {
    const sessions = await account.listSessions();
    for (const session of sessions.sessions) {
      await account.deleteSession(session.$id);
    }
  } catch {
    // If session deletion fails, still clear local state
  }
}

export async function sendVerificationEmail(): Promise<void> {
  await account.createEmailVerification({ url: getVerifyEmailCallbackUrl() });
}

export async function verifyEmail(userId: string, secret: string): Promise<void> {
  await account.updateEmailVerification({ userId, secret });
}

export async function sendPasswordReset(email: string): Promise<void> {
  await account.createRecovery({ email, url: getResetPasswordCallbackUrl() });
}

export async function resetPassword(
  userId: string,
  secret: string,
  password: string,
): Promise<void> {
  await account.updateRecovery({ userId, secret, password });
}

export async function sendEmailVerificationOTP(phrase?: boolean): Promise<string> {
  const verification = await account.createEmailVerificationOTP({ phrase });
  return verification.userId;
}

export async function verifyEmailOTP(userId: string, secret: string): Promise<void> {
  await account.updateEmailVerificationOTP({ userId, secret });
}
