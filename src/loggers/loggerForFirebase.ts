import type { Logger } from "../interfaces/Logger";

export function loggerForFirebase(): Logger {
  const firebaseApiKey = process.env.FIREBASE_API_KEY;
  if (!firebaseApiKey) {
    console.warn("FIREBASE_API_KEY missing, falling back to console.log");
    return {
      log: (error: unknown) => console.log(error),
    };
  }

  // Här kan du initiera Firebase SDK eller annat setup
  // Exempel: importera och initiera Firebase Admin SDK

  return {
    log: (error: unknown) => {
      try {
        // Här loggar du felet till Firebase (t.ex. Firestore, Crashlytics, etc)
        // Exempel:
        // firebase.firestore().collection('logs').add({ error, timestamp: new Date() });

        // Placeholder för demo, ersätt med riktig kod
        console.log("Logged to Firebase:", error);
      } catch (e) {
        console.warn("Firebase logging failed, fallback to console.log");
        console.log(error);
      }
    },
  };
}
