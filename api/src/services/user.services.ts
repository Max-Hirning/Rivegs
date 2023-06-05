import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { UserI, ChangeUserI } from '../types/user.types';

class UserServices {
	async get(id: string) {
		const result = await UserModel.findOne({_id: id}, [`login`, `avatar`, `avatarId`, `savedRecipes`]);
		if(!result) {
			throw(`User doesn't exist`);
		}
		return result;
	}

	async delete(id: string) {
		await UserModel.deleteOne({_id: id});
		return `User was deleted`;
	}

	async signIn(user: UserI) {
		const {email, password} = user;
		const result = await UserModel.findOne({email: email}, [`login`, `avatar`, `avatarId`, `savedRecipes`, `password`]);

		if (!result) throw(`User not found`);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const isPassValid = bcrypt.compareSync(password, result.password!);
		if (!isPassValid) throw(`Invalid password`);

		return({
			_id: result._id,
			login: result.login,
			avatar: result.avatar,
			avatarId: result.avatarId,
			savedRecipes: result.savedRecipes,
		});
	}

	async signUp(user: UserI) {
		const {email, password, login} = user;
		const result = await UserModel.findOne({email: email});

		if (result) throw(`User with email: ${email} all ready existed`);

		const hashPassword = await bcrypt.hash(password, 5);
		await UserModel.create({ email: email, password: hashPassword, login: login });
		return(`User was created`);
	}

	async changeProfile(id: string, user: ChangeUserI) {
		await UserModel.updateOne({ _id: id }, user);
		return(user.avatarId || null);
	}

	async saveUnsaveRecipe(id: string, savedRecipes: string[]) {
		await UserModel.updateOne({ _id: id }, {savedRecipes: savedRecipes});
		return(`Changes were saved`);
	}
}

export default UserServices;