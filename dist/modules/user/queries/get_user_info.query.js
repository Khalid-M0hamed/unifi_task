"use strict";
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
exports.getUserInfoQuery = void 0;
const Injection_service_1 = __importDefault(require("../../../services/Injection.service"));
const Injection_service_2 = __importDefault(require("../../../services/Injection.service"));
const user_repository_1 = require("../repositories/user.repository");
class GetUserInfoQuery {
    constructor() {
        this.userRepository = Injection_service_2.default.getRepository('UserRepository');
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.userRepository.create({username:"x", password:"xxx",email:"300" ,todos:[{completed:true,task:"x"}]})
            return yield this.userRepository.findById(id);
        });
    }
}
Injection_service_1.default.registerRepository('UserRepository', new user_repository_1.UserRepository());
exports.getUserInfoQuery = new GetUserInfoQuery();
//# sourceMappingURL=get_user_info.query.js.map