"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeUpload = exports.avatarUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const avatarStorage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        const imageName = `AVATAR${Date.now()}${node_path_1.default.extname(file.originalname)}`;
        cb(null, imageName);
        return imageName;
    }
});
const recipeStorage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        const imageName = `RECIPE${Date.now()}${node_path_1.default.extname(file.originalname)}`;
        cb(null, imageName);
        return imageName;
    }
});
exports.avatarUpload = (0, multer_1.default)({
    storage: avatarStorage
});
exports.recipeUpload = (0, multer_1.default)({
    storage: recipeStorage
});
//# sourceMappingURL=upload.middleware.js.map