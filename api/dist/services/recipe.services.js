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
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
class RecipeServices {
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.deleteOne({ _id: id });
            return (`Recipe was deleted`);
        });
    }
    getOneRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield recipe_model_1.default.findOne({ _id: id }, [`rate`, `title`, `image`, `description`, `steps`, `ingredients`, `authorLogin`, `authorId`, `imgId`, `language`]);
            if (!result)
                throw `No recipe was founded`;
            return result;
        });
    }
    getOneEditRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield recipe_model_1.default.findOne({ _id: id }, [`type`, `title`, `image`, `description`, `steps`, `ingredients`, `authorLogin`, `authorId`, `imgId`, `language`]);
            if (!result)
                throw `No recipe was founded`;
            return result;
        });
    }
    getSavedRecipes(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield recipe_model_1.default.find({ _id: ids }, [`title`, `authorLogin`, `image`, `rate`]);
            return (result);
        });
    }
    getByAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield recipe_model_1.default.find({ authorId: id }, [`title`, `authorLogin`, `image`, `rate`]);
            return (result);
        });
    }
    deleteAuthorsRecipes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.deleteMany({ authorId: id });
            return (`Recipes were deleted`);
        });
    }
    post(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.create(Object.assign({}, recipe));
            return (`Recipe was saved`);
        });
    }
    changeRating(id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.updateOne({ _id: id }, { rate: rating });
            return (`Recipes rate was changed`);
        });
    }
    put(id, recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.updateOne({ _id: id }, recipe);
            return (`Recipe was changed`);
        });
    }
    changeManyRecipes(id, authorLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield recipe_model_1.default.updateMany({ authorId: id }, { authorLogin: authorLogin });
            return (`Recipes were changed`);
        });
    }
    get(page, searchOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (page) {
                result = yield recipe_model_1.default.find(searchOptions, [`title`, `authorLogin`, `image`, `rate`]).skip((+page - 1) * 10).limit(10);
            }
            else {
                result = yield recipe_model_1.default.find(searchOptions, [`title`, `authorLogin`, `image`, `rate`]);
            }
            return (result);
        });
    }
}
exports.default = RecipeServices;
//# sourceMappingURL=recipe.services.js.map