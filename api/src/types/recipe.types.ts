export interface RatingI {
	rate: number;
}

export interface imageFile {
	path: string;
	size: number;
	encoding: string;
	mimetype: string;
	filename: string;
	fieldname: string;
	destination: string;
	originalname: string;
}

export interface RecipeIngredientI {
	type: string;
	data: string;
}

export interface CreateRecipeI {
	type: string;
	title: string;
	rate?: number;
	image?: string;
	imgId?: string;
	steps: string[];
	authorId: string;
	language: string;
	description: string;
	authorLogin: string;
	ingredients: RecipeIngredientI[];
}

export interface EditRecipeI {
	type: string;
	title: string;
	imgId?: string;
	image?: string;
	steps: string[];
	language: string;
	description: string;
	authorLogin: string;
	ingredients: RecipeIngredientI[];
}

export interface SearchOptionsI {
	type?: string;
	rate?: string;
	title?: string;
	language?: string[];
	authorLogin?: string;
}