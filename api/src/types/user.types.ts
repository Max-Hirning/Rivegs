export interface UserI {
	email: string;
	login?: string;
	avatar?: string;
	password: string;
	avatarId?: string;
	savedRecipes?: string[];
}

export interface ChangeUserI {
	login: string;
	avatar?: string;
	avatarId?: string;
}