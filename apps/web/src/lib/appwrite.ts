import { Account, Client } from 'appwrite';

type AppwriteConfig = {
  endpoint: string;
  projectId: string;
};

function readAppwriteConfig(): AppwriteConfig {
  const endpointRaw = import.meta.env.VITE_APPWRITE_ENDPOINT;
  const projectIdRaw = import.meta.env.VITE_APPWRITE_PROJECT_ID;

  if (!endpointRaw) {
    throw new Error(
      'Appwrite configuration missing: VITE_APPWRITE_ENDPOINT. Define it in .env.local (see .env.example).',
    );
  }
  if (!projectIdRaw) {
    throw new Error(
      'Appwrite configuration missing: VITE_APPWRITE_PROJECT_ID. Define it in .env.local (see .env.example).',
    );
  }

  const endpoint: string = endpointRaw;
  const projectId: string = projectIdRaw;

  try {
    new URL(endpoint);
  } catch {
    throw new Error(
      `Appwrite configuration invalid: VITE_APPWRITE_ENDPOINT must be a valid URL. Received: ${endpoint}`,
    );
  }

  return { endpoint, projectId };
}

const config = readAppwriteConfig();

export const appwriteClient = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

export const account = new Account(appwriteClient);

export type { AppwriteConfig };
