"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loggerForAzure_1 = require("./loggerForAzure");
var loggerForFirebase_1 = require("./loggerForFirebase");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var AZURE_APP_ID = process.env.AZURE_APP_ID;
var FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;
function getLogger() {
    if (AZURE_APP_ID) {
        return (0, loggerForAzure_1.loggerForAzure)();
    }
    if (FIREBASE_CONFIG) {
        return (0, loggerForFirebase_1.loggerForFirebase)();
    }
    // fallback logger som bara wrapper console.log
    return {
        log: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, args);
        },
    };
}
var cloudLogger = getLogger();
exports.default = cloudLogger;
