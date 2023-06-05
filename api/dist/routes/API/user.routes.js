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
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controller/user.controller"));
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const try_catch_middleware_1 = __importDefault(require("../../middlewares/try.catch.middleware"));
const router = (0, express_1.Router)();
router.get(`/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.get(req)); }));
router.delete(`/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.delete(req)); }));
router.post(`/sign-in`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.signIn(req)); }));
router.post(`/sign-up`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.signUp(req)); }));
router.put(`/recipes/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.saveUnsaveRecipe(req)); }));
router.put(`/:id`, upload_middleware_1.avatarUpload.single(`avatar`), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, user_controller_1.default.changeProfile(req)); }));
exports.default = router;
//# sourceMappingURL=user.routes.js.map