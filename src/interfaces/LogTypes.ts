export type LogSeverity = "info" | "warning" | "error" | "critical";
export interface CustomLog {
  message: string;
  code?: string | number;
  status?: string | number;
  severity?: LogSeverity;
  data?: any;
}
