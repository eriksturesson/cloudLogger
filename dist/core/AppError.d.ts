import { LogSeverity } from "../interfaces/LogTypes";
export declare class AppError extends Error {
    isOperational: boolean;
    showUser: boolean;
    severity: LogSeverity;
    code?: string | number;
    data?: any;
    constructor({ message, isOperational, showUser, severity, code, data, }: {
        message: string;
        isOperational?: boolean;
        showUser?: boolean;
        severity?: LogSeverity;
        code?: string | number;
        data?: any;
    });
    static NotFound(message?: string, data?: any): AppError;
    static BadRequest(message?: string, data?: any): AppError;
    static Internal(message?: string, data?: any): AppError;
}
