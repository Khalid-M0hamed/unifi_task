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
exports.updateUserCommand = void 0;
const Injection_service_1 = __importDefault(require("../../../services/Injection.service"));
class UpdateUserCommand {
    constructor() {
        this.userRepository = Injection_service_1.default.getRepository('UserRepository');
    }
    execute(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            const existingUser = yield this.userRepository.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }
            // Update the user object
            const updatedUser = Object.assign(Object.assign({}, existingUser.toObject()), updates);
            // Save the updated user to the database
            const result = yield this.userRepository.update(userId, updatedUser);
            return result;
        });
    }
}
exports.updateUserCommand = new UpdateUserCommand();
//# sourceMappingURL=update_user.command.js.map