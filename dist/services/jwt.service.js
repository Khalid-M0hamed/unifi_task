"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.getRefreshToken = void 0;
const defualts_enum_1 = require("../typings/enums/defualts.enum");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const refreshjwtSecret = process.env.REFRESH_JWT_SECRET;
function getRefreshToken(payload) {
    let refreshToken = jsonwebtoken_1.default.sign(payload, refreshjwtSecret, {
        expiresIn: defualts_enum_1.DEFULAT_VARIABLES.jwtRefreshExpireIn,
    });
    return refreshToken;
}
exports.getRefreshToken = getRefreshToken;
function getAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: defualts_enum_1.DEFULAT_VARIABLES.jwtExpireIn,
    });
}
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=jwt.service.js.map