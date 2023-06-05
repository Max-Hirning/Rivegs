export interface ActionI {
  key: string;
  value: string;
}

export interface MoveArgI {
  to: number;
  from: number;
}

export interface StepIngredientI {
  id: string;
  value: string;
  isTitle: boolean;
}

export interface DefaultRecipeFormInfo {
  type: string;
  language: string;
  authorId: string;
  authorLogin: string;
}

export interface RecipeFromStoreI extends DefaultRecipeFormInfo {
  title: string;
  imgId?: string;
  image: File|null;
  language: string;
  description: string;
  steps: StepIngredientI[];
  ingredients: StepIngredientI[];
}