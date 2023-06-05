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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserServices {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.findOne({ _id: id }, [`login`, `avatar`, `avatarId`, `savedRecipes`]);
            if (!result) {
                throw (`User doesn't exist`);
            }
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.deleteOne({ _id: id });
            return `User was deleted`;
        });
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = user;
            const result = yield user_model_1.default.findOne({ email: email }, [`login`, `avatar`, `avatarId`, `savedRecipes`, `password`]);
            if (!result)
                throw (`User not found`);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const isPassValid = bcrypt_1.default.compareSync(password, result.password);
            if (!isPassValid)
                throw (`Invalid password`);
            return ({
                _id: result._id,
                login: result.login,
                avatar: result.avatar,
                avatarId: result.avatarId,
                savedRecipes: result.savedRecipes,
            });
        });
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, login } = user;
            const result = yield user_model_1.default.findOne({ email: email });
            if (result)
                throw (`User with email: ${email} all ready existed`);
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            yield user_model_1.default.create({ email: email, password: hashPassword, login: login });
            return (`User was created`);
        });
    }
    changeProfile(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.updateOne({ _id: id }, user);
            return (user.avatarId || null);
        });
    }
    saveUnsaveRecipe(id, savedRecipes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.updateOne({ _id: id }, { savedRecipes: savedRecipes });
            return (`Changes were saved`);
        });
    }
}
exports.default = UserServices;
//# sourceMappingURL=user.services.js.map