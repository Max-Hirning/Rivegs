import env from 'react-dotenv';
import axios, { AxiosError } from 'axios';
import { ChangedUserArgI, SaveRecipesArgI, DeleteUserArgI } from '../../types/api/user';
import { UserSignInFormI, UserSignUpFormI } from '../../types/user';

class UserAPI {
  constructor(protected url: string) {}

  async getUser(id: string) {
    try {
      const response = await axios.get(`${this.url}/${id}`);
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async signIn(user: UserSignInFormI) {
    try {
      const response = await axios.post(`${this.url}/sign-in`, user);
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async signUp(user: UserSignUpFormI) {
    try {
      const response = await axios.post(`${this.url}/sign-up`, user);
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async deleteUser({ userId, avatarId }: DeleteUserArgI) {
    try {
      const response = await axios.delete(`${this.url}/${userId}`, { params: { avatarId } });
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async changeUser({ id, user, avatarId }: ChangedUserArgI) {
    try {
      const response = await axios.put(`${this.url}/${id}`, user, { params: { avatarId } });
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async saveUnsaveRecipe({ id, savedRecipes }: SaveRecipesArgI) {
    try {
      const response = await axios.put(`${this.url}/recipes/${id}`, { savedRecipes });
      return response.data;
    } catch(error: unknown) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export default new UserAPI(env.User_URL);