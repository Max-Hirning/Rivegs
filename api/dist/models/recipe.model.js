"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipe = new mongoose_1.Schema({
    type: { type: String, required: true },
    image: { type: String, required: true },
    imgId: { type: String, required: true },
    title: { type: String, required: true },
    steps: { type: [Object], required: true },
    authorId: { type: String, required: true },
    language: { type: String, required: true },
    authorLogin: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [Object], required: true },
    rate: { type: Number, required: false, default: 3 },
});
exports.default = (0, mongoose_1.model)(`Recipes`, recipe);
//# sourceMappingURL=recipe.model.js.map