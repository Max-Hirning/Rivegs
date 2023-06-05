import { Request } from 'express';
import cloudinary from "cloudinary";
import languages from "../models/languages";
import { SearchOptionsI } from "../types/recipe.types";
import RecipeServices from '../services/recipe.services';

export class RecipeController {
	constructor(private recipeService: RecipeServices) {}

	async getLanguages() {
		return languages;
	}

	async get(req: Request) {
		const searchOptions: SearchOptionsI = {
			type: req.query.type?.toString(),
		};
		const page = req.query.page?.toString();
		if(req.query.rate) searchOptions.rate = req.query.rate?.toString();
		if(req.query.title) searchOptions.title = req.query.title?.toString();
		if(req.query.language) searchOptions.language = JSON.parse(JSON.stringify(req.query.language));

		if(searchOptions.type) return this.recipeService.get(page, searchOptions);

		throw `Be sure that you get all necessary data`;
	}

	async put(req: Request) {
		let img = undefined, imgId = undefined;

		if(req.file) {
			let deletingResult: string;
			
			if(req.body.imgId) {
				deletingResult = await this.deleteRecipeImage(req.body.imgId);
			} else {
				deletingResult = `ok`;
			}

			if(deletingResult === `ok`) {
				const result = await this.setRecipeImage(req.file.path, req.body.authorId);
				img = result.img;
				imgId = result.imgId;
			} else {
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
	}

	async post(req: Request) {
		let img = undefined, imgId = undefined;

		if(req.file) {
			const result = await this.setRecipeImage(req.file.path, req.body.authorId);
			img = result.img;
			imgId = result.imgId;
		}

		if(img && imgId) {
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
	}

	async delete(req: Request) {
		if(req.query.imgId && req.params.id) {
			const result = await this.deleteRecipeImage(JSON.parse(JSON.stringify(req.query.imgId)));
			if(result === `ok`) {
				return this.recipeService.delete(req.params.id);
			} else {
				throw `During deleting happened error`;
			}
		}
		throw `Be sure that you get all necessary data`;
	}

	async getByAuthor (req: Request) {
		if(req.params.id) return this.recipeService.getByAuthor(req.params.id);
		throw `Be sure that you get all necessary data`;
	}

	async changeRating(req: Request) {
		if(req.params.id && req.body.newRating) return this.recipeService.changeRating(req.params.id, req.body.newRating);
		throw `Be sure that you get all necessary data`;
	}

	async getSavedRecipes(req: Request) {
		if(req.query.savedRecipes) return this.recipeService.getSavedRecipes(JSON.parse(JSON.stringify(req.query.savedRecipes)).split(`,`));
		throw `Be sure that you get all necessary data`;
	}

	async getOneRecipeById(req: Request) {
		if(req.params.id) return this.recipeService.getOneRecipeById(req.params.id);
		throw `Be sure that you get all necessary data`;
	}

	async getOneEditRecipeById(req: Request) {
		if(req.params.id) return this.recipeService.getOneEditRecipeById(req.params.id);
		throw `Be sure that you get all necessary data`;
	}


	//Local functions

	private async deleteRecipeImage(imgId: string) {
		const result = await cloudinary.v2.uploader.destroy(imgId);
		return result.result;
	}

	private async setRecipeImage(path: string, authorId: string) {
		const result = await cloudinary.v2.uploader.upload(path, {folder: `recipe-app/recipes/${authorId}`});
		return { img: result?.secure_url, imgId: result?.public_id};
	}
}

const recipeController = new RecipeController(new RecipeServices());

export default recipeController;