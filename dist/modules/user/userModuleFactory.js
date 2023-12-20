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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouteFactory = exports.registerDependancies = void 0;
const Injection_service_1 = __importDefault(require("../../services/Injection.service"));
const controllers = __importStar(require("./controllars"));
const express_1 = require("express");
const repositories_1 = require("./repositories");
const registerDependancies = () => {
    Injection_service_1.default.registerRepository('UserRepository', repositories_1.UserRepository);
};
exports.registerDependancies = registerDependancies;
const userRouteFactory = () => {
    let router = (0, express_1.Router)();
    for (let property in controllers) {
        router.use(controllers[property].Instance.router);
    }
    return router;
};
exports.userRouteFactory = userRouteFactory;
//# sourceMappingURL=userModuleFactory.js.map