import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { recipeFormStore } from '../../model/redux/recipeForm';
import { RecipeFromStoreI, ActionI, StepIngredientI, MoveArgI, DefaultRecipeFormInfo } from '../../types/redux/recipeForm';

export const recipeFormSlice = createSlice({
  name: 'recipeForm',
  initialState: recipeFormStore,
  reducers: {
    resetRecipe: (): RecipeFromStoreI => {
      return recipeFormStore;
    },
    changeImage: (state: RecipeFromStoreI, action: PayloadAction<File>) => {
      state.image = action.payload;
    },
    addValue: (state: RecipeFromStoreI, action: PayloadAction<ActionI>): RecipeFromStoreI => {
      return {...state, [action.payload.key]: JSON.parse(JSON.stringify(action.payload.value))};
    },
    deleteStep: (state: RecipeFromStoreI, action: PayloadAction<number>): RecipeFromStoreI => {
      if(state.steps) {
        return {...state, steps: [...state.steps.filter((_: StepIngredientI, index: number) => index !== action.payload)]};
      } else {
        return state;
      }
    },
    moveStep: (state: RecipeFromStoreI, action: PayloadAction<MoveArgI>): RecipeFromStoreI => {
      if(state.steps) {
        const el = state.steps[action.payload.from];
        state.steps.splice(action.payload.from, 1);
        state.steps.splice(action.payload.to, 0, el);
      }
      return state;
    },
    addStep: (state: RecipeFromStoreI, action: PayloadAction<StepIngredientI>): RecipeFromStoreI => {
      if(state.steps) {
        return {...state, steps: [...state.steps, action.payload]};
      } else {
        return {...state, steps: [action.payload]};
      }
    },
    moveIngredient: (state: RecipeFromStoreI, action: PayloadAction<MoveArgI>): RecipeFromStoreI => {
      if(state.ingredients) {
        const el = state.ingredients[action.payload.from];
        state.ingredients.splice(action.payload.from, 1);
        state.ingredients.splice(action.payload.to, 0, el);
      }
      return state;
    },
    deleteIngredient: (state: RecipeFromStoreI, action: PayloadAction<number>): RecipeFromStoreI => {
      if(state.ingredients) {
        return {...state, ingredients: [...state.ingredients.filter((_: StepIngredientI, index: number) => index !== action.payload)]};
      } else {
        return state;
      }
    },
    addIngredient: (state: RecipeFromStoreI, action: PayloadAction<StepIngredientI>): RecipeFromStoreI => {
      if(state.ingredients) {
        return {...state, ingredients: [...state.ingredients, action.payload]};
      } else {
        return {...state, ingredients: [action.payload]};
      }
    },
    setRecipeForm: (state: RecipeFromStoreI, action: PayloadAction<RecipeFromStoreI>): RecipeFromStoreI => {
      return { ...state, ...action.payload};
    },
    setDefaultRecipeFormInfo: (state: RecipeFromStoreI, action: PayloadAction<DefaultRecipeFormInfo>): RecipeFromStoreI => {
      return { ...state, ...action.payload};
    },
  },
});

export const { setDefaultRecipeFormInfo, changeImage, moveIngredient, moveStep, resetRecipe, addStep, addValue, deleteStep, addIngredient, deleteIngredient, setRecipeForm } = recipeFormSlice.actions;

export default recipeFormSlice.reducer;