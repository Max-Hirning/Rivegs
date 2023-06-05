import Image from 'react-bootstrap/Image';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../reusable/Loader';
import ChangeRateModal from './ChangeRateModal';
import { ParamsI } from '../../types/navigation';
import Accordion from 'react-bootstrap/Accordion';
import DeleteEditComponent from './DeleteEditComponent';
import { useIsFetching, useIsMutating } from 'react-query';
import { useGetRecipe } from '../../controller/hooks/recipes';
import RateSaveUnSaveComponent from './RateSaveUnSaveComponent';
import SetpsIngredientsValuesComponent from './SetpsIngredientsValues';

export default function RecipePage(): ReactElement {
  const { recipeId } = useParams<ParamsI>();
  const recipe = useGetRecipe(recipeId as string);
  const getRecipeLoadingStatus = useIsFetching({ queryKey: ['recipe'] });
  const deleteRecipeLoadingStatus = useIsMutating({ mutationKey: ['delete-recipe'] });
  const changeRateRecipeLoadingStatus = useIsMutating({ mutationKey: ['change-rate-recipe'] });
  const saveUnSaveRecipeLoadingStatus = useIsMutating({ mutationKey: ['save-unsave-recipe'] });

  return (
    <LoaderWrapper
      errorStatus={recipe.isError || !recipeId}
      loadingStatus={Boolean(getRecipeLoadingStatus || deleteRecipeLoadingStatus || saveUnSaveRecipeLoadingStatus || changeRateRecipeLoadingStatus)}
    >
      <main className="container mb-5">
        <DeleteEditComponent 
          imgId={recipe.data?.imgId}
          authorId={recipe.data?.authorId}
        />
        <Image 
          thumbnail={true}
          alt="recipe image" 
          className="m-auto"
          src={recipe.data?.image}
          style={{ width: '100%', display: 'block', maxWidth: '540px' }}
        />
        <div className="container mt-3">
          <div className="d-flex justify-content-between">
            <p 
              role="button" 
              className="fs-6" 
            >Author: {recipe.data?.authorLogin}</p>
            <RateSaveUnSaveComponent rate={recipe.data?.rate}/>
            <ChangeRateModal rate={recipe.data?.rate}/>
          </div>
          <p className="fs-5 fw-bold">{recipe.data?.title}</p>
          <p className="fs-5">{recipe.data?.description}</p>
        </div>
        <Accordion defaultActiveKey="0">
          <SetpsIngredientsValuesComponent
            id="ingredients"
            title="Ingredients"
            data={recipe.data?.ingredients || []}
          />
          <SetpsIngredientsValuesComponent
            id="steps"
            title="Steps"
            data={recipe.data?.steps || []}
          />
        </Accordion>
      </main>
    </LoaderWrapper>
  );
}
