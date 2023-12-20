"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
function success(res, data = {}, status = 200) {
    return res.status(status).json(data);
}
exports.success = success;
//# sourceMappingURL=response.js.map