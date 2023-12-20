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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = require("../models/");
class UserRepository {
    constructor() {
        this.model = models_1.UserModel;
    }
    // Find all documents
    findAll() {
        return this.model.find();
    }
    // Find a document by ID
    findById(id) {
        return this.model.findById(id);
    }
    // Create a new document
    create(data) {
        return this.model.create(data);
    }
    // Update a document by ID
    update(id, updates) {
        return this.model.findByIdAndUpdate(id, updates, { new: true });
    }
    // Delete a document by ID
    delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    addTodo(userId, todo) {
        return this.model.findByIdAndUpdate(userId, { $push: { todos: todo } }, { new: true });
    }
    //  Get user Todo List
    findTodosById(userId) {
        return this.model.findById(userId).select('todos');
    }
    findUserToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ 'tokens.userId': userId, 'tokens.token': token }, { 'tokens.$': 1 }).exec();
            if (user && user.tokens && user.tokens.length > 0) {
                return user.tokens[0].token;
            }
            else {
                return null;
            }
        });
    }
    deleteToken(id, userId) {
        return this.model.updateOne({ 'tokens.userId': userId }, { $pull: { tokens: { _id: id } } });
    }
    createToken(userId, token) {
        try {
            return this.model.findOneAndUpdate({ _id: userId }, { $push: { tokens: token } });
        }
        catch (error) {
            throw error;
        }
    }
    findByEmail(email) {
        try {
            return this.model.findOne({ email });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map