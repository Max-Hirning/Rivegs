import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import RecipeLanguage from './RecipeLanguage';
import LoaderWrapper from '../reusable/Loader';
import { ParamsI } from '../../types/navigation';
import { LanguageI } from '../../types/redux/app';
import { recipeTypes } from '../../model/recipes';
import { useDispatch, useSelector } from 'react-redux';
import InputComponent from '../reusable/InputComponent';
import ImageUploadComponent from './ImageUploadComponent';
import { AppDispatch, RootState } from '../../types/redux/store';
import StepsIngredientsComponent from './StepsIngredientsComponent';
import { recipeLanguageStatusToggle } from '../../controller/redux/app';
import { MoveArgI, StepIngredientI } from '../../types/redux/recipeForm';
import { setFlashMessageConfig } from '../../controller/redux/flashMessage';
import React, { ReactElement, useEffect, MouseEvent, ChangeEvent, useState } from 'react';
import { useCreateRecipe, useEditRecipe, useGetEditRecipe } from '../../controller/hooks/recipes';
import { addStep, addValue, deleteStep, addIngredient, deleteIngredient, moveIngredient, moveStep, setDefaultRecipeFormInfo } from '../../controller/redux/recipeForm';

export default function CreateRecipePage(): ReactElement {
  const editRecipe = useEditRecipe();
  const getRecipe = useGetEditRecipe();
  const createRecipe = useCreateRecipe();
  const { recipeId } = useParams<ParamsI>();
  const dispatch: AppDispatch = useDispatch();
  const [language, setLanguage] = useState<undefined|LanguageI>(undefined);
  const { recipeForm, profile, app }: RootState = useSelector((state: RootState) => state);

  useEffect(() => {
    const res = localStorage.getItem('language');
    if(res) setLanguage(JSON.parse(res)); 
  }, [recipeForm.language]);

  useEffect(() => {
    if(recipeId) {
      getRecipe.mutate(recipeId);
    } else {
      let res = localStorage.getItem('recipe_language');
      if(!res) {
        res = 'gb';
      }
      dispatch(setDefaultRecipeFormInfo({
        language: res,
        authorId: profile._id,
        authorLogin: profile.login,
        type: recipeTypes[0].toLowerCase(),
      }));
    }
  }, [recipeId, profile._id, profile.login]);

  const checkRecipeForm = (): boolean => {
    return Boolean(
      recipeForm.image &&
      recipeForm.type.length > 0 &&
      recipeForm.title.length > 0 &&
      recipeForm.steps.length > 0 &&
      recipeForm.language.length > 0 &&
      recipeForm.authorId.length > 0 &&
      recipeForm.authorLogin.length > 0 &&
      recipeForm.description.length > 0 &&
      recipeForm.ingredients.length > 0
    );
  };

  const convertToFormData = (): FormData => {
    const formData: FormData = new FormData();

    formData.append('image', recipeForm.image as File);
    formData.append('type', recipeForm.type as string);
    formData.append('title', recipeForm.title as string);
    formData.append('language', recipeForm.language as string);
    formData.append('steps', JSON.stringify(recipeForm.steps));
    formData.append('authorId', recipeForm.authorId as string);
    formData.append('authorLogin', recipeForm.authorLogin as string);
    formData.append('description', recipeForm.description as string);
    formData.append('ingredients', JSON.stringify(recipeForm.ingredients));
    (recipeForm.imgId) && formData.append('imgId', recipeForm.imgId as string);

    return formData;
  };

  const openRecipeLanguageModal = (): void => {
    dispatch(recipeLanguageStatusToggle());
  };

  const save = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    
    if (checkRecipeForm()) {
      if(recipeId) {
        editRecipe.mutate({recipeId, recipe: convertToFormData()});
      } else {
        createRecipe.mutate(convertToFormData());
      }
    } else {
      dispatch(
        setFlashMessageConfig({
          status: 'danger',
          visibilityStatus: true,
          message: 'All fields must be filled out',
        })
      );
    }
  };

  const saveRecipeType = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(addValue({ key: 'type', value: e.target.value }));
  };

  return (
    <LoaderWrapper 
      errorStatus={false} 
      loadingStatus={getRecipe.isLoading || editRecipe.isLoading || createRecipe.isLoading}
    >
      <main className="container d-flex flex-column align-content-center">
        <div className="container d-flex flex-column align-items-center">
          <p className="fs-3 mb-0 text-center">{(recipeId) ? 'Edit' : 'Create'} recipe</p>
          <img 
            role='button'
            style={{ width: '5rem' }}
            onClick={openRecipeLanguageModal}
            src={language?.flag || app.languages[0].flag}
            alt={language?.code || app.languages[0].code}
          />
          <RecipeLanguage/>
        </div>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="col-8 mb-3">
            <ImageUploadComponent/>
          </Form.Group>
          <Form.Group className="col-8 mb-3">
            <InputComponent
              id="title"
              type="text"
              title="Recipe title"
              value={recipeForm.title || ''}
              onChangeFunc={(value: string): void => {
                dispatch(addValue({ key: 'title', value }));
              }}
            />
          </Form.Group>
          <Form.Group className="col-8 mb-3">
            <InputComponent
              type="text"
              id="description"
              title="Recipe description"
              value={recipeForm.description || ''}
              onChangeFunc={(value: string): void => {
                dispatch(addValue({ key: 'description', value }));
              }}
            />
          </Form.Group>
          <Form.Group className="col-8 mb-3">
            <Form.Label>Recipe type</Form.Label>
            <Form.Select onChange={saveRecipeType}>
              {recipeTypes.map((el: string): ReactElement => {
                return <option key={el.toLowerCase()} value={el.toLowerCase()} >{el}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-8 mb-3">
            <StepsIngredientsComponent
              id="ingredients"
              title="Recipe ingredients"
              secondButtonText="Add ingredients"
              data={recipeForm.ingredients || []}
              deleteValue={(id: number): void => {
                dispatch(deleteIngredient(id));
              }}
              moveValue={(arg: MoveArgI): void => {
                dispatch(moveIngredient(arg));
              }}
              addValue={(value: StepIngredientI): void => {
                dispatch(addIngredient(value));
              }}
            />
          </Form.Group>
          <Form.Group className="col-8 mb-3">
            <StepsIngredientsComponent
              id="steps"
              multiple={true}
              title="Recipe steps"
              secondButtonText="Add steps"
              data={recipeForm.steps || []}
              deleteValue={(id: number): void => {
                dispatch(deleteStep(id));
              }}
              moveValue={(arg: MoveArgI): void => {
                dispatch(moveStep(arg));
              }}
              addValue={(value: StepIngredientI): void => {
                dispatch(addStep(value));
              }}
            />
          </Form.Group>
          <Button 
            type="submit"
            onClick={save} 
            className='my-4'
            variant="primary" 
          >Save</Button>
        </Form>
      </main>
    </LoaderWrapper>
  );
}
