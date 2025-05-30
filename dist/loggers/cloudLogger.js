"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loggerForAzure_1 = require("./loggerForAzure");
var loggerForFirebase_1 = require("./loggerForFirebase");
function isAzureFunction() {
    var _a;
    return typeof ((_a = globalThis.context) === null || _a === void 0 ? void 0 : _a.log) === "function";
}
function isFirebaseFunction() {
    var _a;
    return (typeof globalThis.functions !== "undefined" &&
        typeof ((_a = globalThis.functions.logger) === null || _a === void 0 ? void 0 : _a.log) === "function");
}
function getLogger() {
    if (isAzureFunction()) {
        return (0, loggerForAzure_1.loggerForAzure)();
    }
    if (isFirebaseFunction()) {
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
