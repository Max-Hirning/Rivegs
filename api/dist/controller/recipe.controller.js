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
exports.RecipeController = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const languages_1 = __importDefault(require("../models/languages"));
const recipe_services_1 = __importDefault(require("../services/recipe.services"));
class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    getLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            return languages_1.default;
        });
    }
    get(req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = {
                type: (_a = req.query.type) === null || _a === void 0 ? void 0 : _a.toString(),
            };
            const page = (_b = req.query.page) === null || _b === void 0 ? void 0 : _b.toString();
            if (req.query.rate)
                searchOptions.rate = (_c = req.query.rate) === null || _c === void 0 ? void 0 : _c.toString();
            if (req.query.title)
                searchOptions.title = (_d = req.query.title) === null || _d === void 0 ? void 0 : _d.toString();
            if (req.query.language)
                searchOptions.language = JSON.parse(JSON.stringify(req.query.language));
            if (searchOptions.type)
                return this.recipeService.get(page, searchOptions);
            throw `Be sure that you get all necessary data`;
        });
    }
    put(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = undefined, imgId = undefined;
            if (req.file) {
                let deletingResult;
                if (req.body.imgId) {
                    deletingResult = yield this.deleteRecipeImage(req.body.imgId);
                }
                else {
                    deletingResult = `ok`;
                }
                if (deletingResult === `ok`) {
                    const result = yield this.setRecipeImage(req.file.path, req.body.authorId);
                    img = result.img;
                    imgId = result.imgId;
                }
                else {
                    throw `During changing recipe happened error`;
                }
            }
            return this.recipeService.put(req.params.id, {
                image: img,
                imgId: imgId,
                type: req.body.type,
                title: req.body.title,
                language: req.body.language,
                authorLogin: req.body.authorLogin,
                description: req.body.description,
                steps: (req.body.steps) ? JSON.parse(req.body.steps) : req.body.steps,
                ingredients: (req.body.ingredients) ? JSON.parse(req.body.ingredients) : req.body.ingredients,
            });
        });
    }
    post(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = undefined, imgId = undefined;
            if (req.file) {
                const result = yield this.setRecipeImage(req.file.path, req.body.authorId);
                img = result.img;
                imgId = result.imgId;
            }
            if (img && imgId) {
                return this.recipeService.post({
                    image: img,
                    imgId: imgId,
                    type: req.body.type,
                    title: req.body.title,
                    language: req.body.language,
                    authorId: req.body.authorId,
                    authorLogin: req.body.authorLogin,
                    description: req.body.description,
                    steps: JSON.parse(req.body.steps),
                    ingredients: JSON.parse(req.body.ingredients),
                });
            }
            throw `Error with image, perhaps it's too large`;
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.imgId && req.params.id) {
                const result = yield this.deleteRecipeImage(JSON.parse(JSON.stringify(req.query.imgId)));
                if (result === `ok`) {
                    return this.recipeService.delete(req.params.id);
                }
                else {
                    throw `During deleting happened error`;
                }
            }
            throw `Be sure that you get all necessary data`;
        });
    }
    getByAuthor(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id)
                return this.recipeService.getByAuthor(req.params.id);
            throw `Be sure that you get all necessary data`;
        });
    }
    changeRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id && req.body.newRating)
                return this.recipeService.changeRating(req.params.id, req.body.newRating);
            throw `Be sure that you get all necessary data`;
        });
    }
    getSavedRecipes(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.savedRecipes)
                return this.recipeService.getSavedRecipes(JSON.parse(JSON.stringify(req.query.savedRecipes)).split(`,`));
            throw `Be sure that you get all necessary data`;
        });
    }
    getOneRecipeById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id)
                return this.recipeService.getOneRecipeById(req.params.id);
            throw `Be sure that you get all necessary data`;
        });
    }
    getOneEditRecipeById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id)
                return this.recipeService.getOneEditRecipeById(req.params.id);
            throw `Be sure that you get all necessary data`;
        });
    }
    //Local functions
    deleteRecipeImage(imgId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.uploader.destroy(imgId);
            return result.result;
        });
    }
    setRecipeImage(path, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.uploader.upload(path, { folder: `recipe-app/recipes/${authorId}` });
            return { img: result === null || result === void 0 ? void 0 : result.secure_url, imgId: result === null || result === void 0 ? void 0 : result.public_id };
        });
    }
}
exports.RecipeController = RecipeController;
const recipeController = new RecipeController(new recipe_services_1.default());
exports.default = recipeController;
//# sourceMappingURL=recipe.controller.js.map