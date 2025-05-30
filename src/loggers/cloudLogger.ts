import { loggerForAzure } from "./loggerForAzure";
import { loggerForFirebase } from "./loggerForFirebase";

function isAzureFunction(): boolean {
  return typeof (globalThis as any).context?.log === "function";
}

function isFirebaseFunction(): boolean {
  return (
    typeof (globalThis as any).functions !== "undefined" &&
    typeof (globalThis as any).functions.logger?.log === "function"
  );
}

function getLogger() {
  if (isAzureFunction()) {
    return loggerForAzure();
  }
  if (isFirebaseFunction()) {
    return loggerForFirebase();
  }
  return {
    log: (...args: any[]) => {
      console.log(...args);
    },
  };
}

const cloudLogger = getLogger();

export default cloudLogger;
