<center>

# easify-logger

_Log errors the smart way — whether you're using Azure, Firebase, or just the console._

<img alt="GitHub package.json version (master)" src="https://img.shields.io/github/package-json/v/eriksturesson/cloud-logger/master">
<img alt="npm" src="https://img.shields.io/npm/dy/easify-logger?label=npm%20downloads">

</center>

---

```
npm install easify-logger
```

## ☁️ Platform-aware logging

Use a logger that adapts to your environment: Console, Azure, or Firebase.

You can:

- Import a specific logger like `loggerForAzure`, `loggerForFirebase`, or `loggerForConsole`
- Or use the `getSmartLogger()` that automatically picks based on your `.env` config

```ts
import { AppError, getSmartLogger } from "easify-logger";

const logger = getSmartLogger(); // Chooses based on available env vars

try {
  throw AppError.NotFound("User not found");
} catch (err) {
  logger.log(err); // Logs to correct platform
  next(err); // Pass to Express error handler
}
```

---

## 🔥 Custom AppError class

Use `AppError` for standardized backend-to-frontend error flow:

```ts
throw AppError.BadRequest("Missing required fields");
```

Properties available:

- `statusCode`: HTTP status code
- `isOperational`: Marks it as a handled error (vs. crash)
- `showUser`: Whether frontend should show the message

You can extend it for custom domains too.

---

## 🧠 Example: With Express

```ts
import { AppError, loggerForConsole } from "cloud-logger";

const logger = loggerForConsole();

app.get("/user/:id", async (req, res, next) => {
  try {
    const user = null;
    if (!user) throw AppError.NotFound("User not found");
    res.json(user);
  } catch (err) {
    logger.log(err);
    next(err);
  }
});
```

---

## ✅ Environment support for `getSmartLogger`

```env
# Firebase
FIREBASE_PROJECT_ID=...

# Azure
AZURE_CONNECTION_STRING=...

# Fallback: console only
```

If no cloud credentials are found, it falls back to console logger **and shows a warning**.

---

## 🧩 Types

Use `CustomError` when throwing non-Error objects:

```ts
import type { CustomError } from "cloud-logger";

const error: CustomError = {
  code: 400,
  message: "Something went wrong",
  severity: "warning",
};
```

```ts
export interface CustomError {
  code?: string | number;
  status?: string | number;
  message?: string;
  severity?: "info" | "warning" | "error" | "critical";
}
```

---

## 🌐 Repo

[https://github.com/eriksturesson/cloud-logger](https://github.com/eriksturesson/cloud-logger)

---

Created by [@eriksturesson](https://eriksturesson.se)
