"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_ENUM = exports.TOKEN_TYPES = exports.DEFULAT_VARIABLES = void 0;
var DEFULAT_VARIABLES;
(function (DEFULAT_VARIABLES) {
    DEFULAT_VARIABLES["password"] = "123456789";
    DEFULAT_VARIABLES["jwtExpireIn"] = "15min";
    DEFULAT_VARIABLES["jwtRefreshExpireIn"] = "30day";
})(DEFULAT_VARIABLES || (exports.DEFULAT_VARIABLES = DEFULAT_VARIABLES = {}));
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES[TOKEN_TYPES["verificationToken"] = 1] = "verificationToken";
    TOKEN_TYPES[TOKEN_TYPES["refreshToken"] = 2] = "refreshToken";
    TOKEN_TYPES[TOKEN_TYPES["forgetPasswordToken"] = 3] = "forgetPasswordToken";
})(TOKEN_TYPES || (exports.TOKEN_TYPES = TOKEN_TYPES = {}));
var ROLE_ENUM;
(function (ROLE_ENUM) {
    ROLE_ENUM[ROLE_ENUM["admin"] = 1] = "admin";
    ROLE_ENUM[ROLE_ENUM["user"] = 2] = "user";
})(ROLE_ENUM || (exports.ROLE_ENUM = ROLE_ENUM = {}));
//# sourceMappingURL=defualts.enum.js.map