export { AppError } from "./core/AppError";
export { loggerForAzure } from "./loggers/loggerForAzure";
export { loggerForFirebase } from "./loggers/loggerForFirebase";

export type { AppErrorOptions, CustomLog, LogSeverity } from "./interfaces/LogTypes";

import smartCloudLog from "./loggers/cloudLogger";
export default smartCloudLog;
