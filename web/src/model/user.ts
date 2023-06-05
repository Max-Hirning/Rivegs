import { UserSignInFormI, UserSignUpFormI } from '../types/user';

export const userSignInFrom: UserSignInFormI = {
  email: null,
  password: null,
};

export const userSignUpFrom: UserSignUpFormI = {
  login: null,
  ...userSignInFrom,
};