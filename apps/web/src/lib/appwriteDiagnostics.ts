import { AppwriteException } from 'appwrite';
import { account } from './appwrite';

export type ConnectivityStatus =
  | 'authenticated'
  | 'reachable'
  | 'config-error'
  | 'network-error';

export interface ConnectivityResult {
  status: ConnectivityStatus;
  httpCode?: number;
  message: string;
}

function isAppwriteException(error: unknown): error is AppwriteException {
  return (
    error instanceof AppwriteException ||
    (typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as { code: unknown }).code === 'number')
  );
}

function safeMessage(error: unknown): string {
  if (error instanceof AppwriteException) {
    return error.type || 'Invalid project or endpoint configuration.';
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'Unable to complete the connection check.';
}

export async function runAppwriteConnectivityCheck(): Promise<ConnectivityResult> {
  try {
    await account.get();
    return {
      status: 'authenticated',
      httpCode: 200,
      message: 'Appwrite server reached successfully. Authenticated session active.',
    };
  } catch (error) {
    if (isAppwriteException(error)) {
      const code = error.code;
      if (code === 401) {
        return {
          status: 'reachable',
          httpCode: 401,
          message:
            'Appwrite server reached successfully. No authenticated session exists.',
        };
      }
      return {
        status: 'config-error',
        httpCode: code,
        message: `Appwrite configuration error (HTTP ${code}): ${safeMessage(error)}`,
      };
    }
    return {
      status: 'network-error',
      httpCode: undefined,
      message:
        'The browser could not complete the connection check. This may be due to network access, browser CORS restrictions, or platform hostname configuration in the Appwrite Console.',
    };
  }
}
