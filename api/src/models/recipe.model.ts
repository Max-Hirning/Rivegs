import { model, Schema } from 'mongoose';
import { CreateRecipeI } from '../types/recipe.types';

const recipe = new Schema({
	type: { type: String, required: true },
	image: { type: String, required: true },
	imgId: { type: String, required: true },
	title: { type: String, required: true },
	steps: { type: [Object], required: true },
	authorId: { type: String, required: true },
	language: { type: String, required: true },
	authorLogin: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [Object], required: true },
	rate: { type: Number, required: false, default: 3 },
});

export default model<CreateRecipeI>(`Recipes`, recipe);