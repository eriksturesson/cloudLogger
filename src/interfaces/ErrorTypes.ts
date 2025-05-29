export interface CustomError {
  code?: string | number;
  status?: string | number;
  message?: string;
  severity?: "info" | "warning" | "error" | "critical";
}
