"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const exption_1 = require("../helpers/exption");
function validationMiddleware(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new exption_1.ValidationError(errors));
    }
    next();
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.js.map