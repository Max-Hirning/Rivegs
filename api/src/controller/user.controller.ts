import { Request } from 'express';
import cloudinary from "cloudinary";
import UserServices from '../services/user.services';
import RecipeServices from '../services/recipe.services';

export class UserController {
	constructor(private userService: UserServices, private recipeService: RecipeServices) {}

	async get(req: Request) {
		if(req.params.id) return this.userService.get(req.params.id);
		throw `Be sure that you get all necessary data`;
	}

	async signIn(req: Request) {
		if(req.body.email && req.body.password) {
			return this.userService.signIn({
				email: req.body.email,
				password: req.body.password,
			});
		}
		throw `Be sure that you get all necessary data`;
	}

	async signUp(req: Request) {
		if(req.body.email && req.body.login && req.body.password) {
			return this.userService.signUp({
				email: req.body.email,
				login: req.body.login,
				password: req.body.password,
			});
		}
		throw `Be sure that you get all necessary data`;
	}

	async delete(req: Request) {
		if(req.params.id) {
			let deletingResult: string;
			await this.deleteRecipesImages(req.params.id);
			await this.recipeService.deleteAuthorsRecipes(req.params.id);

			if(req.query.avatarId) {
				deletingResult = await this.deleteUserAvatar(JSON.parse(JSON.stringify(req.query.avatarId)));
			} else {
				deletingResult = `ok`;
			}
		
			if(deletingResult === `ok`) {
				return this.userService.delete(req.params.id);
			}
			throw(`During deleting happened error`);
		}
		throw `Be sure that you get all necessary data`;
	}

	async changeProfile(req: Request) {
		let avatar = undefined, avatarId = undefined;

		if(req.file) {
			let deletingResult: string;

			if(req.query.avatarId) {
				deletingResult = await this.deleteUserAvatar(JSON.parse(JSON.stringify(req.query.avatarId)));
			} else {
				deletingResult = `ok`;
			}

			if(deletingResult === `ok`) {
				const result = await this.setUserAvatar(req.file.path);
				avatarId = result.avatarId;
				avatar = result.avatar;
			} else {
				throw(`During changing profile happened error`);
			}
		}

		if(req.body.login) {
			await this.recipeService.changeManyRecipes(req.params.id, req.body.login);
		}

		return this.userService.changeProfile(req.params.id, {
			avatar: avatar,
			avatarId: avatarId,
			login: req.body.login,
		});
	}

	async saveUnsaveRecipe(req: Request) {
		if(req.params.id && req.body.savedRecipes) return this.userService.saveUnsaveRecipe(req.params.id, req.body.savedRecipes);
		throw `Be sure that you get all necessary data`;
	}


	//Local functions

	private async setUserAvatar(path: string) {
		const result = await cloudinary.v2.uploader.upload(path, {folder: `recipe-app/avatars`});
		return { avatar: result?.secure_url, avatarId: result?.public_id };
	}

	private async deleteRecipesImages(id: string) {
		const result = await cloudinary.v2.api.resources({type: `upload`, prefix: `recipe-app/recipes/${id}`});
		if(result.resources.length > 0) {
			await cloudinary.v2.api.delete_resources_by_prefix(`recipe-app/recipes/${id}`);
			await cloudinary.v2.api.delete_folder(`recipe-app/recipes/${id}`);
		}
	}

	private async deleteUserAvatar(id: string): Promise<string> {
		const result = await cloudinary.v2.uploader.destroy(id);
		return result.result;
	}
}

const userController = new UserController(new UserServices(), new RecipeServices());

export default userController;