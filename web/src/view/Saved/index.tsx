import React, { ReactElement } from 'react';
import LoaderWrapper from '../reusable/Loader';
import RecipesList from '../reusable/RecipesList';
import { useGetSavedRecipes } from '../../controller/hooks/recipes';

export default function SavedRecipes(): ReactElement {
  const { data, isLoading, isError } = useGetSavedRecipes();

  return (
    <main className='container'>
      <LoaderWrapper 
        errorStatus={isError} 
        loadingStatus={isLoading}
      >
        <RecipesList 
          data={data} 
          title='Your saved recipes'
        />
      </LoaderWrapper>
    </main>
  );
}