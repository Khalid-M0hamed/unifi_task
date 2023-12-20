"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(exception, message) {
        super(message || exception.message);
        this.customCode = exception.customCode;
        this.status = exception.status;
    }
}
exports.HttpException = HttpException;
class ValidationError extends Error {
    constructor(errors) {
        let errorsMessages = "";
        errors = errors.array();
        for (var i = 0; i < errors.length; i++) {
            errorsMessages += errors[i].msg + "\\n";
        }
        super(errorsMessages);
        this.customCode = "VE400";
        this.status = 400;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=exption.js.map