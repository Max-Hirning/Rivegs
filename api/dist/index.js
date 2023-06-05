"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const app = (0, express_1.default)();
const router = new routes_1.default(app);
cloudinary_1.default.config({
    api_key: process.env.APIKEY,
    cloud_name: process.env.CLOUDNAME,
    api_secret: process.env.APISECRET,
});
app.use(body_parser_1.default.json());
app.use(`/assets`, express_1.default.static(`assets`));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
(0, connectDB_1.default)();
router.init();
app.listen(process.env.PORT, () => console.log(`${process.env.STARTMESSAGE}${process.env.PORT}`));
//# sourceMappingURL=index.js.map