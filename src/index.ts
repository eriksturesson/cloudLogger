export { AppError } from "./core/AppError";
export { loggerForAzure } from "./loggers/loggerForAzure";
export { loggerForFirebase } from "./loggers/loggerForFirebase";

export type { CustomLog } from "./interfaces/LogTypes";

import cloudLogger from "./loggers/cloudLogger";
export default cloudLogger;
