"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerForAzure = void 0;
function loggerForAzure() {
    var appId = process.env.AZURE_APP_ID;
    if (!appId) {
        console.warn("AZURE_APP_ID missing, falling back to console.log");
        return {
            log: function (error) { return console.log(error); },
        };
    }
    return {
        log: function (error) {
            try {
                // Logga till Azure med appId
            }
            catch (e) {
                console.warn("Azure logging failed, fallback to console.log");
                console.log(error);
            }
        },
    };
}
exports.loggerForAzure = loggerForAzure;
