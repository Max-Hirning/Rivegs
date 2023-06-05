"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    login: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    password: { type: String, required: true },
    avatarId: { type: String, required: false },
    savedRecipes: { type: [String], required: false },
});
exports.default = (0, mongoose_1.model)(`Users`, user);
//# sourceMappingURL=user.model.js.map