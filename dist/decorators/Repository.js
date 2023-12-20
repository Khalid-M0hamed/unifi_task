"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const Injection_service_1 = __importDefault(require("../services/Injection.service"));
function Repository(name) {
    return function (target) {
        Injection_service_1.default.registerRepository(name, target);
    };
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map