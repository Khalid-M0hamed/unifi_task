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
exports.seedUsers = void 0;
const models_1 = require("../../modules/user/models");
const usersData = [
    {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        todos: [
            { task: 'Task 1', completed: false },
            { task: 'Task 2', completed: true },
        ],
        tokens: []
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
        todos: [
            { task: 'Task 3', completed: false },
            { task: 'Task 4', completed: true },
        ],
        tokens: []
    },
];
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear existing users
            yield models_1.UserModel.deleteMany({});
            const userInstances = usersData.map(user => new models_1.UserModel(user));
            for (const userInstance of userInstances) {
                yield userInstance.save();
            }
            console.log('Database seeded successfully.');
        }
        catch (error) {
            console.error('Error seeding database:', error);
        }
    });
}
exports.seedUsers = seedUsers;
//# sourceMappingURL=user.seeder.js.map