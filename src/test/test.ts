import drawLog, { drawInfo, drawWarning } from "..";

//Custom Error interface
drawLog({ code: 500, message: "Custom test arg error", severity: "info" });

// A normal error
drawLog(new Error("This is a 'new Error'-error"));

// A custom error with severity
drawInfo(new Error("This is a 'new Error'-error with severity"));

drawWarning(new Error("This is a 'new Error'-error with severity warning"));
