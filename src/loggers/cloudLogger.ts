import { loggerForAzure } from "./loggerForAzure";
import { loggerForFirebase } from "./loggerForFirebase";

import dotenv from "dotenv";
dotenv.config();

const AZURE_APP_ID = process.env.AZURE_APP_ID;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;

function getLogger() {
  if (AZURE_APP_ID) {
    return loggerForAzure();
  }
  if (FIREBASE_CONFIG) {
    return loggerForFirebase();
  }
  // fallback logger som bara wrapper console.log
  return {
    log: (...args: any[]) => {
      console.log(...args);
    },
  };
}

const cloudLogger = getLogger();

export default cloudLogger;
