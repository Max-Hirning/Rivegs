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
exports.UserController = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_services_1 = __importDefault(require("../services/user.services"));
const recipe_services_1 = __importDefault(require("../services/recipe.services"));
class UserController {
    constructor(userService, recipeService) {
        this.userService = userService;
        this.recipeService = recipeService;
    }
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id)
                return this.userService.get(req.params.id);
            throw `Be sure that you get all necessary data`;
        });
    }
    signIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.email && req.body.password) {
                return this.userService.signIn({
                    email: req.body.email,
                    password: req.body.password,
                });
            }
            throw `Be sure that you get all necessary data`;
        });
    }
    signUp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.email && req.body.login && req.body.password) {
                return this.userService.signUp({
                    email: req.body.email,
                    login: req.body.login,
                    password: req.body.password,
                });
            }
            throw `Be sure that you get all necessary data`;
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                let deletingResult;
                yield this.deleteRecipesImages(req.params.id);
                yield this.recipeService.deleteAuthorsRecipes(req.params.id);
                if (req.query.avatarId) {
                    deletingResult = yield this.deleteUserAvatar(JSON.parse(JSON.stringify(req.query.avatarId)));
                }
                else {
                    deletingResult = `ok`;
                }
                if (deletingResult === `ok`) {
                    return this.userService.delete(req.params.id);
                }
                throw (`During deleting happened error`);
            }
            throw `Be sure that you get all necessary data`;
        });
    }
    changeProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let avatar = undefined, avatarId = undefined;
            if (req.file) {
                let deletingResult;
                if (req.query.avatarId) {
                    deletingResult = yield this.deleteUserAvatar(JSON.parse(JSON.stringify(req.query.avatarId)));
                }
                else {
                    deletingResult = `ok`;
                }
                if (deletingResult === `ok`) {
                    const result = yield this.setUserAvatar(req.file.path);
                    avatarId = result.avatarId;
                    avatar = result.avatar;
                }
                else {
                    throw (`During changing profile happened error`);
                }
            }
            if (req.body.login) {
                yield this.recipeService.changeManyRecipes(req.params.id, req.body.login);
            }
            return this.userService.changeProfile(req.params.id, {
                avatar: avatar,
                avatarId: avatarId,
                login: req.body.login,
            });
        });
    }
    saveUnsaveRecipe(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id && req.body.savedRecipes)
                return this.userService.saveUnsaveRecipe(req.params.id, req.body.savedRecipes);
            throw `Be sure that you get all necessary data`;
        });
    }
    //Local functions
    setUserAvatar(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.uploader.upload(path, { folder: `recipe-app/avatars` });
            return { avatar: result === null || result === void 0 ? void 0 : result.secure_url, avatarId: result === null || result === void 0 ? void 0 : result.public_id };
        });
    }
    deleteRecipesImages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.api.resources({ type: `upload`, prefix: `recipe-app/recipes/${id}` });
            if (result.resources.length > 0) {
                yield cloudinary_1.default.v2.api.delete_resources_by_prefix(`recipe-app/recipes/${id}`);
                yield cloudinary_1.default.v2.api.delete_folder(`recipe-app/recipes/${id}`);
            }
        });
    }
    deleteUserAvatar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.uploader.destroy(id);
            return result.result;
        });
    }
}
exports.UserController = UserController;
const userController = new UserController(new user_services_1.default(), new recipe_services_1.default());
exports.default = userController;
//# sourceMappingURL=user.controller.js.map