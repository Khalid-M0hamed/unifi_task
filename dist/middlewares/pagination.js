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
const exption_1 = require("../helpers/exption");
const httpExceptions_1 = require("../typings/enums/httpExceptions");
/**
 * A middleware to parse  request  header
 * Finds the username that made the request
 * checks if the player is confirmed and not deleted
 */
function PaginationMiddleware(req, res, next) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pagination = {};
            pagination.pagonationOptions = {};
            if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) && +((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) >= 0)
                pagination.pagonationOptions.limit = +((_c = req.query) === null || _c === void 0 ? void 0 : _c.limit);
            if (((_d = req.query) === null || _d === void 0 ? void 0 : _d.offset) && +((_e = req.query) === null || _e === void 0 ? void 0 : _e.offset) >= 0)
                pagination.pagonationOptions.offset = +((_f = req.query) === null || _f === void 0 ? void 0 : _f.offset);
            pagination.filters = {};
            for (let key in req.query) {
                pagination.filters[key.toString()] = req.query[key];
            }
            req.pagination = pagination;
        }
        catch (err) {
            if (err.customCode)
                return next(err);
            return next(new exption_1.HttpException(httpExceptions_1.exceptionMap.serverError));
        }
        next();
    });
}
exports.default = PaginationMiddleware;
//# sourceMappingURL=pagination.js.map