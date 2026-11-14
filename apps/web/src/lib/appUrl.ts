/**
 * Application URL configuration.
 *
 * Reads VITE_APP_URL from environment. In production this MUST be an HTTPS URL.
 * In development, localhost HTTP is permitted for local testing.
 */
export function getAppUrl(): string {
  const appUrl = import.meta.env.VITE_APP_URL;

  if (!appUrl) {
    throw new Error(
      'App URL configuration missing: VITE_APP_URL. Define it in .env.local (see .env.example).',
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(appUrl);
  } catch {
    throw new Error(
      `App URL configuration invalid: VITE_APP_URL must be a valid URL. Received: ${appUrl}`,
    );
  }

  const protocol = parsed.protocol.toLowerCase();
  const hostname = parsed.hostname.toLowerCase();

  // Production (non-localhost) requires HTTPS
  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '::1';

  if (protocol !== 'https:' && !isLocalhost) {
    throw new Error(
      `App URL configuration invalid: VITE_APP_URL must use HTTPS in production. Received: ${appUrl}`,
    );
  }

  // Development allows http://localhost but warn about production
  if (protocol !== 'https:' && isLocalhost) {
    if (import.meta.env.DEV) {
      // localhost HTTP is fine for local development
    } else {
      throw new Error(
        `App URL configuration invalid: VITE_APP_URL must use HTTPS for non-development builds. Received: ${appUrl}`,
      );
    }
  }

  return appUrl.replace(/\/$/, ''); // strip trailing slash
}

/**
 * Returns the email verification callback URL.
 * Format: <PUBLIC_APP_URL>/verify-email
 */
export function getVerifyEmailCallbackUrl(): string {
  return `${getAppUrl()}/verify-email`;
}

/**
 * Returns the password reset callback URL.
 * Format: <PUBLIC_APP_URL>/reset-password
 */
export function getResetPasswordCallbackUrl(): string {
  return `${getAppUrl()}/reset-password`;
}

/**
 * Returns true if the application is running on localhost (development).
 */
export function isLocalhost(): boolean {
  try {
    const hostname = new URL(getAppUrl()).hostname.toLowerCase();
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1'
    );
  } catch {
    return false;
  }
}
