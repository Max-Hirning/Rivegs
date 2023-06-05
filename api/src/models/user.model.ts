import { model, Schema } from 'mongoose';
import { UserI } from '../types/user.types';

const user = new Schema({
	login: { type: String, required: true },
	email: { type: String, required: true },
	avatar: { type: String, required: false },
	password: { type: String, required: true },
	avatarId: { type: String, required: false },
	savedRecipes: {type: [String], required: false},
});

export default model<UserI>(`Users`, user);