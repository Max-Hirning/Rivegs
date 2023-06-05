import userAPI from '../api/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../types/redux/store';
import { ProfileStoreI } from '../../types/redux/profile';
import { useMutation, useQueryClient } from 'react-query';
import { setFlashMessageConfig } from '../redux/flashMessage';
import { UserSignUpFormI, UserSignInFormI } from '../../types/user';
import { ChangedUserArgI, DeleteUserArgI, SaveRecipesArgI } from '../../types/api/user';
import { changeProfileValue, changeSavedRecipes, clearProfile, setProfile } from '../redux/profile';

export function useSignUp() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['sign-up'], (user: UserSignUpFormI) => userAPI.signUp(user), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      navigate('/sign-in');
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
    },
  });
}

export function useSignIn() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['sign-in'], (user: UserSignInFormI) => userAPI.signIn(user), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: ProfileStoreI) => {
      navigate('/');
      dispatch(setProfile(message));
      localStorage.setItem('user', message._id);
    },
  });
}

export function useGetUser() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['user'], (id: string) => userAPI.getUser(id), {
    onError: () => {
      navigate('/error');
    },
    onSuccess: (user: ProfileStoreI) => {
      dispatch(setProfile(user));
    },
  });
}

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  
  return useMutation(['delete-user'], (arg: DeleteUserArgI) => userAPI.deleteUser(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      navigate('/');
      dispatch(clearProfile());
      localStorage.removeItem('user');
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      queryClient.invalidateQueries(['recipes']);
    },
  });
}

export function useSaveUnSaveRecipe() {
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['save-unsave-recipe'], (arg: SaveRecipesArgI) => userAPI.saveUnsaveRecipe(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string, { savedRecipes }: SaveRecipesArgI) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      dispatch(changeSavedRecipes(savedRecipes));
    },
  });
}

export function useChangeUserProfile() {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['change-user-profile'], (arg: ChangedUserArgI) => userAPI.changeUser(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string|null, { newProfileLocalData }: ChangedUserArgI) => {
      dispatch(setFlashMessageConfig({
        status: 'success',
        visibilityStatus: true,
        message: 'Changes were saved',
      }));
      queryClient.invalidateQueries(['authors-recipes']);
      dispatch(changeProfileValue({ ...newProfileLocalData, avatarId: message ? message : undefined }));
    },
  });
}