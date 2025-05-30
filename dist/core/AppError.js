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
        var message = _a.message, _b = _a.isOperational, isOperational = _b === void 0 ? true : _b, _c = _a.showUser, showUser = _c === void 0 ? false : _c, _d = _a.severity, severity = _d === void 0 ? "error" : _d, code = _a.code, data = _a.data;
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = "AppError";
        _this.isOperational = isOperational;
        _this.showUser = showUser;
        _this.severity = severity;
        _this.code = code;
        _this.data = data;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        Error.captureStackTrace(_this);
        return _this;
    }
    AppError.NotFound = function (message, data) {
        if (message === void 0) { message = "Not Found"; }
        return new AppError({ message: message, code: 404, showUser: true, data: data });
    };
    AppError.BadRequest = function (message, data) {
        if (message === void 0) { message = "Bad Request"; }
        return new AppError({ message: message, code: 400, showUser: true, data: data });
    };
    AppError.Internal = function (message, data) {
        if (message === void 0) { message = "Internal Server Error"; }
        return new AppError({ message: message, code: 500, data: data });
    };
    return AppError;
}(Error));
exports.AppError = AppError;
