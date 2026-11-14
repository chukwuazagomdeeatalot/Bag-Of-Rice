export type AppwriteStatusKind = 'missing' | 'present' | 'verified';

export interface AppwriteStatus {
  kind: AppwriteStatusKind;
  connection: 'not-verified' | 'verified';
  detail: string;
}

const notVerified = (detail: string): AppwriteStatus => ({
  kind: 'present',
  connection: 'not-verified',
  detail,
});

const missing = (detail: string): AppwriteStatus => ({
  kind: 'missing',
  connection: 'not-verified',
  detail,
});

export async function getAppwriteStatus(): Promise<AppwriteStatus> {
  try {
    await import('./appwrite');
    return notVerified(
      'Appwrite client initialized. Endpoint and project ID are configured. ' +
        'Server reachability has not been verified; environment variables alone do not confirm connectivity.',
    );
  } catch (error) {
    return missing(
      error instanceof Error ? error.message : String(error),
    );
  }
}

export async function verifyAppwriteConnection(): Promise<AppwriteStatus> {
  const status = await getAppwriteStatus();
  if (status.kind !== 'present') return status;

  try {
    const { account } = await import('./appwrite');
    // account.get() without an active session returns a 401 from Appwrite.
    // A 401 means the endpoint responded, proving reachability without
    // creating users, sessions, or database resources.
    await account.get();
    return {
      kind: 'verified',
      connection: 'verified',
      detail: 'Connection verified: Appwrite endpoint responded (authentication required for calls).',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // A 401 / missing-session response from Appwrite confirms the server is reachable.
    if (/401|unauthorized|no session|session required/i.test(message)) {
      return {
        kind: 'verified',
        connection: 'verified',
        detail: 'Connection verified: Appwrite endpoint responded (authentication required for calls).',
      };
    }
    return {
      kind: 'present',
      connection: 'not-verified',
      detail: `Connection check could not complete: ${message}`,
    };
  }
}
