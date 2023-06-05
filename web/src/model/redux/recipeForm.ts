import { RecipeFromStoreI } from '../../types/redux/recipeForm';

export const recipeFormStore: RecipeFromStoreI = {
  type: '',
  title: '',
  steps: [],
  image: null,
  authorId: '',
  language: 'en',
  authorLogin: '',
  description: '',
  ingredients: [],
};