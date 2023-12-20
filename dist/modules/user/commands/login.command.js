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
exports.loginCommand = void 0;
const exption_1 = require("../../../helpers/exption");
const Injection_service_1 = __importDefault(require("../../../services/Injection.service"));
const jwt_service_1 = require("../../../services/jwt.service");
const defualts_enum_1 = require("../../../typings/enums/defualts.enum");
const httpExceptions_1 = require("../../../typings/enums/httpExceptions");
class LoginCommand {
    constructor() {
        this.userRepository = Injection_service_1.default.getRepository('UserRepository');
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findByEmail(email);
            if (!user)
                throw new exption_1.HttpException(httpExceptions_1.exceptionMap.userNotFound);
            if (!user.comparePassword(password))
                throw new exption_1.HttpException(httpExceptions_1.exceptionMap.wrongPasswordOrUSerName);
            const accesToken = (0, jwt_service_1.getAccessToken)({ id: user.id, type: defualts_enum_1.ROLE_ENUM.user });
            let newRefreshToken = (0, jwt_service_1.getRefreshToken)({
                id: user.id,
                type: defualts_enum_1.ROLE_ENUM.user,
            });
            const refresTokens = user.tokens.filter(token => token.tokenType === defualts_enum_1.TOKEN_TYPES.refreshToken);
            if (refresTokens.length > 5) {
                yield this.userRepository.deleteToken(refresTokens[0]._id, user.id);
            }
            yield this.userRepository.createToken(user.id, { tokenType: defualts_enum_1.TOKEN_TYPES.refreshToken,
                token: newRefreshToken,
            });
            return {
                token: accesToken,
                refreshToken: newRefreshToken,
                user,
            };
        });
    }
}
exports.loginCommand = new LoginCommand();
//# sourceMappingURL=login.command.js.map