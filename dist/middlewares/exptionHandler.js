"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const customCode = error.customCode || "500";
    return res.status(status).json({
        status,
        message,
        customCode,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=exptionHandler.js.map