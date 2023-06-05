"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./API/user.routes"));
const recipe_routes_1 = __importDefault(require("./API/recipe.routes"));
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.get(`/`, (_req, res) => {
            res.send(`API Running`);
        });
        this.app.use(`/api/users`, user_routes_1.default);
        this.app.use(`/api/recipes`, recipe_routes_1.default);
    }
}
exports.default = AppRouter;
//# sourceMappingURL=index.js.map