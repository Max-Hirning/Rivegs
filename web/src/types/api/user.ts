import { NewProfileLocalDataI } from '../user';

export interface DeleteUserArgI {
	userId: string;
	avatarId?: string;
}

export interface ChangedUserArgI {
  id: string;
  user: FormData;
  avatarId?: string;
  newProfileLocalData: NewProfileLocalDataI
}

export interface SaveRecipesArgI {
  id: string;
  savedRecipes: string[];
}