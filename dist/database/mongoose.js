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
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_seeder_1 = require("./seeders/user.seeder");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
class Database {
    static get Instance() {
        if (!Database._instance)
            Database._instance = new Database();
        return Database._instance;
    }
    constructor() { }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbConnectionString = process.env.DB_CONNECTION_STRING;
                if (!dbConnectionString) {
                    console.error('DB_CONNECTION_STRING is not defined');
                    process.exit(1);
                }
                return mongoose_1.default
                    .connect(dbConnectionString)
                    .then(() => {
                    console.log('Connected to the database');
                    (0, user_seeder_1.seedUsers)();
                })
                    .catch((error) => {
                    console.error('Error connecting to the database:', error);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=mongoose.js.map