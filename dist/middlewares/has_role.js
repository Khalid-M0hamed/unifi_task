"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
const httpExceptions_1 = require("../typings/enums/httpExceptions");
const exption_1 = require("../helpers/exption");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets = process.env.JWT_SECRET;
function hasRole(roles) {
    return function (req, res, next) {
        try {
            if (!req.headers.authorization)
                throw new exption_1.HttpException(httpExceptions_1.exceptionMap.invalidAccessToken);
            let token = req.headers.authorization;
            token = token.toString();
            let payload = jsonwebtoken_1.default.verify(token, secrets);
            if (!payload)
                throw new exption_1.HttpException(httpExceptions_1.exceptionMap.invalidAccessToken);
            req.user = payload;
            for (let role of roles) {
                if (payload.type == role)
                    return next();
            }
            return next(new exption_1.HttpException(httpExceptions_1.exceptionMap.forbiddenAccess));
        }
        catch (err) {
            if (err instanceof exption_1.HttpException && err.customCode)
                return next(err);
            return next(new exption_1.HttpException(httpExceptions_1.exceptionMap.invalidAccessToken));
        }
    };
}
exports.hasRole = hasRole;
//# sourceMappingURL=has_role.js.map