import { AppError } from "../core/AppError";
import type { CustomLog } from "../interfaces/LogTypes";
import type { Logger } from "../interfaces/Logger";

function smartLogger(level: "info" | "warning" | "error" | "critical", message: string, data?: any) {
  const logFn =
    typeof (globalThis as any).context?.log === "function"
      ? (globalThis as any).context.log
      : (console as any)[level === "warning" ? "warn" : level] || console.log;

  logFn(`[${level.toUpperCase()}] ${message}`);
  if (data) {
    try {
      logFn(`→ Data: ${JSON.stringify(data, null, 2)}`);
    } catch {
      logFn("→ Data: [Unserializable]");
    }
  }
}

function formatLogEntry(input: unknown): {
  message: string;
  level: "info" | "warning" | "error" | "critical";
  data?: any;
} {
  if (typeof input === "string") {
    return { message: input, level: "info" };
  }

  if (input instanceof AppError) {
    return {
      message: `AppError${input.code ? ` (${input.code})` : ""}: ${input.message}`,
      level: input.severity,
      data: (input as any).data,
    };
  }

  if (typeof input === "object" && input !== null && "message" in input) {
    const log = input as CustomLog;
    return {
      message: `${log.message}${log.code ? ` (Code ${log.code})` : ""}`,
      level: log.severity ?? "info",
      data: (log as any).data,
    };
  }

  try {
    return {
      message: JSON.stringify(input),
      level: "info",
    };
  } catch {
    return {
      message: "Unknown error (unserializable input)",
      level: "error",
    };
  }
}

export function loggerForFirebase(): Logger {
  return {
    log: (entry: unknown) => {
      try {
        const { message, level, data } = formatLogEntry(entry);
        smartLogger(level, message, data);
      } catch (e) {
        smartLogger("warning", "Logging failed, fallback to console");
        console.error(entry);
      }
    },
  };
}
