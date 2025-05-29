"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerForFirebase = exports.loggerForAzure = exports.AppError = void 0;
var AppError_1 = require("./core/AppError");
Object.defineProperty(exports, "AppError", { enumerable: true, get: function () { return AppError_1.AppError; } });
var loggerForAzure_1 = require("./loggers/loggerForAzure");
Object.defineProperty(exports, "loggerForAzure", { enumerable: true, get: function () { return loggerForAzure_1.loggerForAzure; } });
var loggerForFirebase_1 = require("./loggers/loggerForFirebase");
Object.defineProperty(exports, "loggerForFirebase", { enumerable: true, get: function () { return loggerForFirebase_1.loggerForFirebase; } });
var cloudLogger_1 = __importDefault(require("./loggers/cloudLogger"));
exports.default = cloudLogger_1.default;
