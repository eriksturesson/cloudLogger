"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var loggerForAzure_1 = require("./loggerForAzure");
var loggerForFirebase_1 = require("./loggerForFirebase");
dotenv_1.default.config();
function getLogger() {
    var azureConnectionString = process.env.APPINSIGHTS_CONNECTIONSTRING;
    var useFirebaseLogging = process.env.USE_FIREBASE_LOGGING === "true";
    if (azureConnectionString) {
        (0, loggerForAzure_1.initTelemetry)(azureConnectionString);
        return (0, loggerForAzure_1.loggerForAzure)();
    }
    if (useFirebaseLogging) {
        return (0, loggerForFirebase_1.loggerForFirebase)();
    }
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
var smartCloudLog = getLogger();
exports.default = smartCloudLog;
