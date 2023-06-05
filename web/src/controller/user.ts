import { UserSignInFormI, ActionI, UserSignUpFormI } from '../types/user';

export function userSignInFormReducer(state: UserSignInFormI, action: ActionI): UserSignInFormI {
  switch (action.type) {
  case 'addValue':
    return {...state, [action.payload.key]: action.payload.value};
  default:
    return state;
  }
}

export function userSignUpFormReducer(state: UserSignUpFormI, action: ActionI): UserSignUpFormI {
  switch (action.type) {
  case 'addValue':
    return {...state, [action.payload.key]: action.payload.value};
  default:
    return state;
  }
}