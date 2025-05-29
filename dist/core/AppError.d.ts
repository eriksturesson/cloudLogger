export type LogSeverity = "info" | "warning" | "error" | "critical";
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    showUser: boolean;
    severity: LogSeverity;
    code?: string | number;
    constructor({ message, statusCode, isOperational, showUser, severity, code, }: {
        message: string;
        statusCode?: number;
        isOperational?: boolean;
        showUser?: boolean;
        severity?: LogSeverity;
        code?: string | number;
    });
    static NotFound(message?: string): AppError;
    static BadRequest(message?: string): AppError;
    static Internal(message?: string): AppError;
}
