"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const httpExceptions_1 = require("../../../typings/enums/httpExceptions");
const exption_1 = require("../../../helpers/exption");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation = __importStar(require("../validation/auth.validation"));
const response_1 = require("../../../helpers/response");
const defualts_enum_1 = require("../../../typings/enums/defualts.enum");
const has_role_1 = require("../../../middlewares/has_role");
const queries_1 = require("../queries");
const commands_1 = require("../commands");
const jwt_service_1 = require("../../../services/jwt.service");
class AuthController {
    //track next  guest user id  to save as guest user username
    static get Instance() {
        return this._instance ? this._instance : (this._instance = new this());
    }
    constructor() {
        this.path = "";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path + "/login", validation.login, this.login.bind(this));
        this.router.post(this.path + "/refresh-token", validation.refreshToken, this.refreshToken.bind(this));
        this.router.get(this.path + "/currentUser", [(0, has_role_1.hasRole)([defualts_enum_1.ROLE_ENUM.user])], this.currentUser.bind(this));
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                return yield commands_1.loginCommand.execute(email, password);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    currentUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield queries_1.getUserInfoQuery.execute((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                if (!user)
                    throw new exption_1.HttpException(httpExceptions_1.exceptionMap.forbiddenAccess);
                return (0, response_1.success)(res, {
                    user,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = jsonwebtoken_1.default.verify(req.body.refreshToken, process.env.REFRESH_JWT_SECRET);
                let refreshToken = yield queries_1.getUserTokensQuery.execute(payload.id, req.body.refreshToken);
                if (!refreshToken)
                    throw new exption_1.HttpException(httpExceptions_1.exceptionMap.forbiddenAccess);
                let newRefreshToken = jsonwebtoken_1.default.sign({ id: payload.id, type: payload.type }, process.env.REFRESH_JWT_SECRET, {
                    expiresIn: defualts_enum_1.DEFULAT_VARIABLES.jwtRefreshExpireIn,
                });
                yield commands_1.createUserTokenCommand.execute(payload.id, {
                    token: newRefreshToken,
                    tokenType: defualts_enum_1.TOKEN_TYPES.refreshToken
                });
                let accessToken = (0, jwt_service_1.getAccessToken)({ id: payload.id, type: payload.type });
                return (0, response_1.success)(res, {
                    refreshToken: newRefreshToken,
                    token: accessToken,
                });
            }
            catch (err) {
                if (!(err === null || err === void 0 ? void 0 : err.customCode))
                    return next(new exption_1.HttpException(httpExceptions_1.exceptionMap.forbiddenAccess));
                return next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map