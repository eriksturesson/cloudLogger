import { AppError } from "../core/AppError";
import { CustomLog } from "../interfaces/LogTypes";
import type { Logger } from "../interfaces/Logger";

import { TelemetryClient } from "applicationinsights";

type LogSeverity = "info" | "warning" | "error" | "critical";

let telemetryClient: TelemetryClient | null = null;

export function initTelemetry(connectionString?: string) {
  if (connectionString) {
    telemetryClient = new TelemetryClient(connectionString);
  } else {
    telemetryClient = null;
  }
}

function mapSeverity(level: LogSeverity): string {
  switch (level) {
    case "info":
      return "Information";
    case "warning":
      return "Warning";
    case "error":
      return "Error";
    case "critical":
      return "Critical";
    default:
      return "Information";
  }
}

function smartLogger(level: LogSeverity, message: string, data?: any) {
  if (telemetryClient) {
    telemetryClient.trackTrace({
      message,
      severity: mapSeverity(level),
      properties: data,
    });
  } else {
    // fallback till vanlig console-logging
    const logFn = (console as any)[level === "warning" ? "warn" : level] || console.log;

    logFn(`[${level.toUpperCase()}] ${message}`);
    if (data) {
      try {
        logFn(`→ Data: ${JSON.stringify(data, null, 2)}`);
      } catch {
        logFn("→ Data: [Unserializable]");
      }
    }
  }
}

function formatLogEntry(input: unknown): {
  message: string;
  level: LogSeverity;
  data?: any;
} {
  if (typeof input === "string") {
    return { message: input, level: "info" };
  }

  if (input instanceof AppError) {
    return {
      message: `AppError${input.code ? ` (${input.code})` : ""}: ${input.message}`,
      level: input.severity,
      data: input.data,
    };
  }

  if (typeof input === "object" && input !== null && "message" in input) {
    const log = input as CustomLog;
    return {
      message: `${log.message}${log.code ? ` (Code ${log.code})` : ""}`,
      level: log.severity ?? "info",
      data: log.data,
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

export function loggerForAzure(): Logger {
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
