import RecipeModel from '../models/recipe.model';
import { CreateRecipeI, EditRecipeI, SearchOptionsI } from '../types/recipe.types';

class RecipeServices {
	async delete(id: string) {
		await RecipeModel.deleteOne({_id: id});
		return(`Recipe was deleted`);
	}

	async getOneRecipeById(id: string) {
		const result = await RecipeModel.findOne({_id: id}, [`rate`, `title`, `image`, `description`, `steps`, `ingredients`, `authorLogin`, `authorId`, `imgId`, `language`]);
		if(!result) throw `No recipe was founded`;
		return result;
	}

	async getOneEditRecipeById(id: string) {
		const result = await RecipeModel.findOne({_id: id}, [`type`, `title`, `image`, `description`, `steps`, `ingredients`, `authorLogin`, `authorId`, `imgId`, `language`]);
		if(!result) throw `No recipe was founded`;
		return result;
	}

	async getSavedRecipes(ids: string[]) {
		const result = await RecipeModel.find({_id: ids}, [`title`, `authorLogin`, `image`, `rate`]);
		return(result);
	}

	async getByAuthor(id: string) {
		const result = await RecipeModel.find({authorId: id}, [`title`, `authorLogin`, `image`, `rate`]);
		return(result);
	}

	async deleteAuthorsRecipes(id: string) {
		await RecipeModel.deleteMany({authorId: id});
		return(`Recipes were deleted`);
	}

	async post(recipe: CreateRecipeI) {
		await RecipeModel.create({...recipe});
		return(`Recipe was saved`);
	}

	async changeRating(id: string, rating: number) {
		await RecipeModel.updateOne({ _id: id }, {rate: rating});
		return(`Recipes rate was changed`);
	}
	
	async put(id: string, recipe: EditRecipeI) {
		await RecipeModel.updateOne({ _id: id }, recipe);
		return(`Recipe was changed`);
	}

	async changeManyRecipes(id: string, authorLogin: string) {
		await RecipeModel.updateMany({ authorId: id }, { authorLogin: authorLogin });
		return(`Recipes were changed`);
	}

	async get(page: string|undefined, searchOptions: SearchOptionsI) {
		let result;

		if(page) {
			result = await RecipeModel.find(searchOptions, [`title`, `authorLogin`, `image`, `rate`]).skip((+page - 1) * 10).limit(10);
		} else {
			result = await RecipeModel.find(searchOptions, [`title`, `authorLogin`, `image`, `rate`]);
		}

		return(result);
	}
}

export default RecipeServices;