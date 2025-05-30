<center>

# smart-cloud-log

_Log errors the smart way — whether you're using Azure, Firebase, or just the console._

<img alt="GitHub package.json version (master)" src="https://img.shields.io/github/package-json/v/eriksturesson/cloudLogger/master">
<img alt="npm" src="https://img.shields.io/npm/dy/smart-cloud-log?label=npm%20downloads">

</center>

---

```
npm install smart-cloud-log
```

## ⚠️ Required environment variables

To enable platform-specific logging, make sure to set the appropriate environment variables in your `.env` file:

```ts
# For Azure Application Insights logging
APPINSIGHTS_CONNECTIONSTRING=Your_Azure_Connection_String

# For Firebase-based environments (optional, for future extensibility)
FIREBASE_CONNECTION_STRING=placeholder_or_relevant_value
```

If neither variable is present, the logger will default to standard `console.log`.

> ✅ `APPINSIGHTS_CONNECTIONSTRING` is **required** for Azure logging to work.  
> 🔥 `FIREBASE_CONNECTION_STRING` is optional — logging to console works seamlessly in Firebase Functions.

---

## ☁️ Platform-aware logging

Use a logger that adapts to your environment: Console, Azure, or Firebase.

You can:

- Import a specific logger like `loggerForAzure`, `loggerForFirebase`, or `loggerForConsole`
- Or just use the default export `smartCloudLog` which automatically picks the right logger based on your environment

```ts
import { AppError } from "smart-cloud-log";
import smartCloudLog from "smart-cloud-log";

try {
  throw AppError.NotFound("User not found");
} catch (err) {
  smartCloudLog.log(err); // Logs to correct platform
  next(err); // Pass to Express error handler
}
```

---

## 🔥 Custom AppError class

Use `AppError` for standardized backend-to-frontend error flow:

```ts
throw AppError.BadRequest("Missing required fields");
```

Or construct it manually for full control:

```ts
const error = new AppError({
  message: "Something went terribly wrong",
  severity: "critical",
  showUser: true,
  code: 500,
  data: { context: "PaymentService", id: 12345 },
});
```

Properties available:

- `message`: The error message
- `code`: HTTP status code
- `isOperational`: Marks it as a handled error (vs. crash)
- `showUser`: Whether frontend should show the message
- `severity`: "info" | "warning" | "error" | "critical"
- `data`: Additional metadata (optional and anything accepted)

You can extend it for custom domains too.

---

## 🧠 Example: With Express

```ts
import { AppError } from "smart-cloud-log";
import smartCloudLog from "smart-cloud-log";

app.get("/user/:id", async (req, res, next) => {
  try {
    const user = null;
    if (!user) throw AppError.NotFound("User not found");
    res.json(user);
  } catch (err) {
    smartCloudLog.log(err);
    next(err);
  }
});
```

## 🧠 Example: With Express + showUser handling

```ts
import { AppError } from "smart-cloud-log";
import smartCloudLog from "smart-cloud-log";

app.get("/user/:id", async (req, res, next) => {
  try {
    const user = null;
    if (!user) throw AppError.NotFound("User not found");
    res.json(user);
  } catch (err) {
    smartCloudLog.log(err);

    // If showUser is true, it is safe to send the error to the client (frontend)
    if (err instanceof AppError && err.showUser) {
      res.status(err.code ?? 400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }

    next(err); // Optional
  }
});
```

## 🧩 Types

Use `CustomLog` when throwing non-Error objects:

```ts
import type { CustomLog } from "smart-cloud-log";

const logEntry: CustomLog = {
  code: 400,
  message: "Something went wrong",
  severity: "warning",
};
```

```ts
export interface CustomLog {
  code?: number;
  status?: string | number;
  message?: string;
  severity?: "info" | "warning" | "error" | "critical";
  data?: any;
}
```

```ts
export type LogSeverity = "info" | "warning" | "error" | "critical";
```

```ts
export interface AppErrorOptions {
  message: string;
  isOperational?: boolean;
  showUser?: boolean;
  severity?: LogSeverity;
  code?: number;
  data?: any;
}
```

---

## 🌐 Repo

[https://github.com/eriksturesson/cloud-logger](https://github.com/eriksturesson/cloud-logger)

---

Created by [@eriksturesson](https://eriksturesson.se)
