export { AppError } from "./core/AppError";
export { loggerForAzure } from "./loggers/loggerForAzure";
export { loggerForFirebase } from "./loggers/loggerForFirebase";
export type { CustomError } from "./interfaces/ErrorTypes";
import cloudLogger from "./loggers/cloudLogger";
export default cloudLogger;
