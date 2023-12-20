"use strict";
// src/controllers/UserController.ts
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
exports.UserController = void 0;
const express_1 = require("express");
const queries_1 = require("../queries");
const commands_1 = require("../commands");
const has_role_1 = require("../../../middlewares/has_role");
const defualts_enum_1 = require("../../../typings/enums/defualts.enum");
const response_1 = require("../../../helpers/response");
const exption_1 = require("../../../helpers/exption");
const httpExceptions_1 = require("../../../typings/enums/httpExceptions");
class UserController {
    //track next  guest user id  to save as guest user username
    static get Instance() {
        return this._instance ? this._instance : (this._instance = new this());
    }
    constructor() {
        this.getUserInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield queries_1.getUserInfoQuery.execute(userId);
                return (0, response_1.success)(res, {
                    user,
                });
            }
            catch (error) {
                console.error(error);
                return next(error);
            }
        });
        this.getUserTodo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const todoList = yield queries_1.getUserTodoQuery.execute(userId);
                return (0, response_1.success)(res, {
                    todoList,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const deletedUser = yield commands_1.deleteUserCommand.execute(userId);
                if (!deletedUser) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                return (0, response_1.success)(res, {
                    deletedUser,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const updates = req.body;
            try {
                const updatedUser = yield commands_1.updateUserCommand.execute(userId, updates);
                if (!updatedUser) {
                    throw new exption_1.HttpException(httpExceptions_1.exceptionMap.userNotFound);
                }
                return (0, response_1.success)(res, {
                    updatedUser,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.addTodo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const todo = req.body;
            try {
                const todoList = yield commands_1.addTodoCommand.execute(userId, todo);
                if (!todoList) {
                    throw new exption_1.HttpException(httpExceptions_1.exceptionMap.userNotFound);
                }
                return (0, response_1.success)(res, {
                    todoList,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.path = "";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.put(this.path + "/:id", [(0, has_role_1.hasRole)([defualts_enum_1.ROLE_ENUM.admin, defualts_enum_1.ROLE_ENUM.user])], this.updateUser.bind(this));
        this.router.delete(this.path + "/:id", this.deleteUser.bind(this));
        this.router.get(this.path + "/:id", this.getUserInfo.bind(this));
        this.router.post(this.path + "/:id/todo", this.addTodo.bind(this));
        this.router.get(this.path + "/:id/todo", [(0, has_role_1.hasRole)([defualts_enum_1.ROLE_ENUM.user])], this.getUserTodo.bind(this));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map