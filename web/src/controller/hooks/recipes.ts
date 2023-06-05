import recipeAPI from '../api/recipes';
import { setLanguages } from '../redux/app';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileStoreI } from '../../types/redux/profile';
import { setFlashMessageConfig } from '../redux/flashMessage';
import { SearchConfigI } from '../../types/redux/searchConfig';
import { RecipeFromStoreI } from '../../types/redux/recipeForm';
import { AppDispatch, RootState } from '../../types/redux/store';
import { resetRecipe, setRecipeForm } from '../redux/recipeForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ChangeRecipeRateArgI, DeleteRecipeArgI, EditRecipeArgI } from '../../types/api/recipes';

export function useChangeRate() {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['change-rate-recipe'], (arg: ChangeRecipeRateArgI) => recipeAPI.changeRecipeRate(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      queryClient.invalidateQueries(['recipe']);
    },
  });
}

export function useEditRecipe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const { language }: RecipeFromStoreI = useSelector((state: RootState) => state.recipeForm);

  return useMutation(['edit-recipe'], (arg: EditRecipeArgI) => recipeAPI.editRecipe(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      navigate('/');
      dispatch(resetRecipe());
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      queryClient.invalidateQueries(['recipes']);
      localStorage.setItem('recipe_language', language);
    },
  });
}

export function useCreateRecipe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const { language }: RecipeFromStoreI = useSelector((state: RootState) => state.recipeForm);

  return useMutation(['create-recipe'], (arg: FormData) => recipeAPI.createRecipe(arg), {
    onError: (message: string) => {
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      navigate('/');
      dispatch(resetRecipe());
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      queryClient.invalidateQueries(['recipes']);
      localStorage.setItem('recipe_language', language);
    },
  });
}

export function useDeleteRecipe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['delete-recipe'], (arg: DeleteRecipeArgI) => recipeAPI.deleteRecipe(arg), {
    onError: (message: string) => {
      navigate('/');
      dispatch(setFlashMessageConfig({
        message,
        status: 'danger',
        visibilityStatus: true,
      }));
    },
    onSuccess: (message: string) => {
      navigate('/');
      dispatch(setFlashMessageConfig({
        message,
        status: 'success',
        visibilityStatus: true,
      }));
      queryClient.invalidateQueries(['recipes']);
    },
  });
}

export function useGetLanguages() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['languages'], () => recipeAPI.getLanguages(), {
    onError: () => {
      navigate('/error');
    },
    onSuccess: (result) => {
      if(result) dispatch(setLanguages(result));
    }
  });
}

export function useGetEditRecipe() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return useMutation(['edit-recipe'], async (id: string) => recipeAPI.getEditRecipe(id), {
    onError: () => {
      navigate('/error');
    },
    onSuccess: (recipeDataForEdit) => {
      if(recipeDataForEdit) {
        delete recipeDataForEdit._id;
        dispatch(setRecipeForm(recipeDataForEdit));
      }
    },
  });
}

export function useSearchRecipes() {
  const searchConfig: SearchConfigI = useSelector((state: RootState) => state.searchConfig);

  return useQuery(['recipes', searchConfig], () => recipeAPI.searchRecipes(searchConfig));
}

export function useGetSavedRecipes() {
  const { savedRecipes }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  return useQuery(['saved-recipes'], () => recipeAPI.getSavedRecipes(savedRecipes));
}

export function useGetAuthorsRecipes() {
  const { _id }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  return useQuery(['authors-recipes'], () => recipeAPI.getAuthorsRecipes(_id));
}

export function useGetRecipe(recipeId: string) {
  return useQuery(['recipe'], () => recipeAPI.getRecipe(recipeId));
}