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
exports.UserModel = exports.TodoModel = exports.TokenModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Injection_service_1 = __importDefault(require("../../../services/Injection.service"));
const defualts_enum_1 = require("../../../typings/enums/defualts.enum");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    expiresIn: { type: String, required: true },
    tokenType: { type: String, enum: Object.values(defualts_enum_1.TOKEN_TYPES), required: true },
});
exports.TokenModel = mongoose_1.default.model('Token', tokenSchema);
const todoSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
exports.TodoModel = mongoose_1.default.model('Todo', todoSchema);
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [tokenSchema], // Array of Token documents
    todos: [todoSchema], // Array of Todo documents
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const hashedPassword = yield bcrypt_1.default.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt_1.default.compare(candidatePassword, this.password);
            return match;
        }
        catch (error) {
            return false;
        }
    });
};
exports.UserModel = mongoose_1.default.model('users', userSchema);
Injection_service_1.default.registerModel('users', exports.UserModel);
//# sourceMappingURL=user.model.js.map