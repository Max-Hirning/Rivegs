import env from 'react-dotenv';
import axios, { AxiosError } from 'axios';
import { SearchConfigI } from '../../types/redux/searchConfig';
import { ChangeRecipeRateArgI, DeleteRecipeArgI, EditRecipeArgI } from '../../types/api/recipes';

class RecipeAPI {
  constructor(protected url: string) {}

  async getLanguages() {
    try {
      const response = await axios.get(`${this.url}/languages`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getRecipe(recipeId: string) {
    try {
      const response = await axios.get(`${this.url}/recipe/${recipeId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getAuthorsRecipes(id: string) {
    try {
      const response = await axios.get(`${this.url}/author/${id}`);
      return response.data;
    }
    catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async createRecipe(recipe: FormData) {
    try {
      const response = await axios.post(this.url, recipe);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getSavedRecipes(ids: string[]) {
    try {
      const response = await axios.get(`${this.url}/saved-recipes`, {params: { savedRecipes: ids.join(',') }});
      return response.data;
    }
    catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async getEditRecipe(recipeId: string) {
    try {
      const response = await axios.get(`${this.url}/edit-recipe/${recipeId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async editRecipe({ recipeId, recipe }: EditRecipeArgI) {
    try {
      const response = await axios.put(`${this.url}/${recipeId}`, recipe);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
  
  async deleteRecipe({ recipeId, imgId }: DeleteRecipeArgI) {
    try {
      const response = await axios.delete(`${this.url}/${recipeId}`, {params: { imgId }});
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async searchRecipes({ type, page, additionalConfig }: SearchConfigI) {
    try {
      const response = await axios.get(this.url, {
        params: {
          type, page, ...additionalConfig
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async changeRecipeRate({ recipeId, newRating }: ChangeRecipeRateArgI) {
    try {
      const response = await axios.put(`${this.url}/rating/${recipeId}`, { newRating });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export default new RecipeAPI(env.Recipes_URL);