import type { Logger } from "../interfaces/Logger";

export function loggerForAzure(): Logger {
  const appId = process.env.AZURE_APP_ID;
  if (!appId) {
    console.warn("AZURE_APP_ID missing, falling back to console.log");
    return {
      log: (error: unknown) => console.log(error),
    };
  }

  return {
    log: (error: unknown) => {
      try {
        // Logga till Azure med appId
      } catch (e) {
        console.warn("Azure logging failed, fallback to console.log");
        console.log(error);
      }
    },
  };
}
