export interface ActionI {
  type: string;
  payload: {
    key: string;
    value: string;
  }
}

export interface UserSignInFormI {
  email: string|null;
  password: string|null;
}

export interface NewProfileLocalDataI {
  login?: string;
  avatar?: string;
  avatarId?: string;
}

export interface UserSignUpFormI extends UserSignInFormI {
  login: string|null;
}