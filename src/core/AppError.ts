export type LogSeverity = "info" | "warning" | "error" | "critical";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  showUser: boolean;
  severity: LogSeverity;
  code?: string | number;

  constructor({
    message,
    statusCode = 500,
    isOperational = true,
    showUser = false,
    severity = "error",
    code,
  }: {
    message: string;
    statusCode?: number;
    isOperational?: boolean;
    showUser?: boolean;
    severity?: LogSeverity;
    code?: string | number;
  }) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.showUser = showUser;
    this.severity = severity;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static NotFound(message = "Not Found") {
    return new AppError({ message, statusCode: 404, showUser: true });
  }

  static BadRequest(message = "Bad Request") {
    return new AppError({ message, statusCode: 400, showUser: true });
  }

  static Internal(message = "Internal Server Error") {
    return new AppError({ message, statusCode: 500 });
  }
}
