export interface ProfileStoreI {
  _id: string;
  login: string;
  avatar?: string;
  avatarId?: string;
  savedRecipes: string[];
}