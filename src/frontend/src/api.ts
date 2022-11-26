import { AppInfo } from "./models";

const baseUrl = 'https://localhost:7279';

export async function getAppInfo(appId: number): Promise<AppInfo | undefined> {
  try {
    const response = await fetch(`${baseUrl}/app/${appId}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const appInfo: AppInfo = await response.json();
    return appInfo;
  } catch (error) {
    console.error(`Failed to fetch app info for id ${appId}: ${error}`);
    return undefined;
  }
}