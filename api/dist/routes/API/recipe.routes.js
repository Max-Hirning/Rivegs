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
const recipe_controller_1 = __importDefault(require("../../controller/recipe.controller"));
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const try_catch_middleware_1 = __importDefault(require("../../middlewares/try.catch.middleware"));
const router = (0, express_1.Router)();
router.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.get(req)); }));
router.delete(`/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.delete(req)); }));
router.get(`/languages`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.getLanguages()); }));
router.get(`/author/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.getByAuthor(req)); }));
router.put(`/rating/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.changeRating(req)); }));
router.get(`/recipe/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.getOneRecipeById(req)); }));
router.get(`/saved-recipes/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.getSavedRecipes(req)); }));
router.get(`/edit-recipe/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.getOneEditRecipeById(req)); }));
router.post(`/`, upload_middleware_1.recipeUpload.single(`image`), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.post(req)); }));
router.put(`/:id`, upload_middleware_1.recipeUpload.single(`image`), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, try_catch_middleware_1.default)(req, res, recipe_controller_1.default.put(req)); }));
exports.default = router;
//# sourceMappingURL=recipe.routes.js.map