"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = __importDefault(require("../../../middlewares/validation"));
exports.login = [
    // username must be an email
    (0, express_validator_1.body)("email")
        .isEmail()
        .normalizeEmail({
        gmail_lowercase: true,
        yahoo_lowercase: true,
        outlookdotcom_lowercase: true,
        icloud_lowercase: true,
    })
        .withMessage("invalid email"),
    // password must be at least 5 chars long
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 chars long")
        .optional({ nullable: true, checkFalsy: true })
        .trim(),
    validation_1.default,
];
exports.refreshToken = [
    (0, express_validator_1.body)("refreshToken").isString().withMessage("invalid refreshToken"),
    validation_1.default,
];
//# sourceMappingURL=auth.validation.js.map