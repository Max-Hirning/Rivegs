import "dotenv/config";
import cors from "cors";
import express from "express";
import AppRouter from "./routes";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";

const app = express();
const router = new AppRouter(app);

(cloudinary as any).config({
	api_key: process.env.APIKEY,
	cloud_name: process.env.CLOUDNAME,
	api_secret: process.env.APISECRET,
});

app.use(bodyParser.json());
app.use(`/assets`, express.static(`assets`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectDB();
router.init();

app.listen(process.env.PORT, (): void => console.log(`${process.env.STARTMESSAGE}${process.env.PORT}`));