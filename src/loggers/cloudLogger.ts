import dotenv from "dotenv";
import { initTelemetry, loggerForAzure } from "./loggerForAzure";
import { loggerForFirebase } from "./loggerForFirebase";

dotenv.config();

function getLogger() {
  const azureConnectionString = process.env.APPINSIGHTS_CONNECTIONSTRING;
  const useFirebaseLogging = process.env.USE_FIREBASE_LOGGING === "true";

  if (azureConnectionString) {
    initTelemetry(azureConnectionString);
    return loggerForAzure();
  }

  if (useFirebaseLogging) {
    return loggerForFirebase();
  }

  return {
    log: (...args: any[]) => {
      console.log(...args);
    },
  };
}

const smartCloudLog = getLogger();

export default smartCloudLog;
