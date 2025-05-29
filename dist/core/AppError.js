"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(_a) {
        var message = _a.message, _b = _a.statusCode, statusCode = _b === void 0 ? 500 : _b, _c = _a.isOperational, isOperational = _c === void 0 ? true : _c, _d = _a.showUser, showUser = _d === void 0 ? false : _d, _e = _a.severity, severity = _e === void 0 ? "error" : _e, code = _a.code;
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = "AppError";
        _this.statusCode = statusCode;
        _this.isOperational = isOperational;
        _this.showUser = showUser;
        _this.severity = severity;
        _this.code = code;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        Error.captureStackTrace(_this);
        return _this;
    }
    AppError.NotFound = function (message) {
        if (message === void 0) { message = "Not Found"; }
        return new AppError({ message: message, statusCode: 404, showUser: true });
    };
    AppError.BadRequest = function (message) {
        if (message === void 0) { message = "Bad Request"; }
        return new AppError({ message: message, statusCode: 400, showUser: true });
    };
    AppError.Internal = function (message) {
        if (message === void 0) { message = "Internal Server Error"; }
        return new AppError({ message: message, statusCode: 500 });
    };
    return AppError;
}(Error));
exports.AppError = AppError;
