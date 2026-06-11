import { Platform } from 'react-native';

const API_URLS = Platform.select({
  android: ['http://localhost:5000', 'http://10.0.2.2:5000'],
  default: ['http://localhost:5000'],
}) as string[];

export async function postApi(path: string, payload: unknown) {
  let lastError = 'Unable to reach the DevTrack API.';

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Request failed.');
      }

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error.message : lastError;
    }
  }

  throw new Error(lastError);
}
