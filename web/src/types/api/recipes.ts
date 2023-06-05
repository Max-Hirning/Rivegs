export interface EditRecipeArgI {
	recipe: FormData;
	recipeId: string;
}

export interface DeleteRecipeArgI {
	imgId: string;
	recipeId: string;
}

export interface ChangeRecipeRateArgI {
	newRating: number;
	recipeId: string;
}