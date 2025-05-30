import { LogSeverity } from "../interfaces/LogTypes";

export class AppError extends Error {
  isOperational: boolean;
  showUser: boolean;
  severity: LogSeverity;
  code?: string | number;
  data?: any;

  constructor({
    message,
    isOperational = true,
    showUser = false,
    severity = "error",
    code,
    data,
  }: {
    message: string;
    isOperational?: boolean;
    showUser?: boolean;
    severity?: LogSeverity;
    code?: string | number;
    data?: any;
  }) {
    super(message);

    this.name = "AppError";
    this.isOperational = isOperational;
    this.showUser = showUser;
    this.severity = severity;
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static NotFound(message = "Not Found", data?: any) {
    return new AppError({ message, code: 404, showUser: true, data });
  }

  static BadRequest(message = "Bad Request", data?: any) {
    return new AppError({ message, code: 400, showUser: true, data });
  }

  static Internal(message = "Internal Server Error", data?: any) {
    return new AppError({ message, code: 500, data });
  }
}
