"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerForFirebase = void 0;
function loggerForFirebase() {
    var firebaseApiKey = process.env.FIREBASE_API_KEY;
    if (!firebaseApiKey) {
        console.warn("FIREBASE_API_KEY missing, falling back to console.log");
        return {
            log: function (error) { return console.log(error); },
        };
    }
    // Här kan du initiera Firebase SDK eller annat setup
    // Exempel: importera och initiera Firebase Admin SDK
    return {
        log: function (error) {
            try {
                // Här loggar du felet till Firebase (t.ex. Firestore, Crashlytics, etc)
                // Exempel:
                // firebase.firestore().collection('logs').add({ error, timestamp: new Date() });
                // Placeholder för demo, ersätt med riktig kod
                console.log("Logged to Firebase:", error);
            }
            catch (e) {
                console.warn("Firebase logging failed, fallback to console.log");
                console.log(error);
            }
        },
    };
}
exports.loggerForFirebase = loggerForFirebase;
