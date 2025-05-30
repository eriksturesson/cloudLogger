export type LogSeverity = "info" | "warning" | "error" | "critical";
export interface CustomLog {
    message: string;
    code?: string | number;
    status?: string | number;
    severity?: LogSeverity;
    data?: any;
}
export interface AppErrorOptions {
    message: string;
    isOperational?: boolean;
    showUser?: boolean;
    severity?: LogSeverity;
    code?: string | number;
    data?: any;
}
