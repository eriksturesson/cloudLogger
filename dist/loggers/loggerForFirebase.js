"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerForFirebase = void 0;
var AppError_1 = require("../core/AppError");
function smartLogger(level, message, data) {
    var _a;
    var logFn = typeof ((_a = globalThis.context) === null || _a === void 0 ? void 0 : _a.log) === "function"
        ? globalThis.context.log
        : console[level === "warning" ? "warn" : level] || console.log;
    logFn("[".concat(level.toUpperCase(), "] ").concat(message));
    if (data) {
        try {
            logFn("\u2192 Data: ".concat(JSON.stringify(data, null, 2)));
        }
        catch (_b) {
            logFn("→ Data: [Unserializable]");
        }
    }
}
function formatLogEntry(input) {
    var _a;
    if (typeof input === "string") {
        return { message: input, level: "info" };
    }
    if (input instanceof AppError_1.AppError) {
        return {
            message: "AppError".concat(input.code ? " (".concat(input.code, ")") : "", ": ").concat(input.message),
            level: input.severity,
            data: input.data,
        };
    }
    if (typeof input === "object" && input !== null && "message" in input) {
        var log = input;
        return {
            message: "".concat(log.message).concat(log.code ? " (Code ".concat(log.code, ")") : ""),
            level: (_a = log.severity) !== null && _a !== void 0 ? _a : "info",
            data: log.data,
        };
    }
    try {
        return {
            message: JSON.stringify(input),
            level: "info",
        };
    }
    catch (_b) {
        return {
            message: "Unknown error (unserializable input)",
            level: "error",
        };
    }
}
function loggerForFirebase() {
    return {
        log: function (entry) {
            try {
                var _a = formatLogEntry(entry), message = _a.message, level = _a.level, data = _a.data;
                smartLogger(level, message, data);
            }
            catch (e) {
                smartLogger("warning", "Logging failed, fallback to console");
                console.error(entry);
            }
        },
    };
}
exports.loggerForFirebase = loggerForFirebase;
