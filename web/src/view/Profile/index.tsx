import ProfileForm from './ProfileForm';
import { useIsMutating } from 'react-query';
import React, { ReactElement } from 'react';
import LoaderWrapper from '../reusable/Loader';
import RecipesList from '../reusable/RecipesList';
import { useGetAuthorsRecipes } from '../../controller/hooks/recipes';

export default function Profile(): ReactElement {
  const { data, isLoading, isError } = useGetAuthorsRecipes();
  const changeProfileLoadingStatus = useIsMutating({ mutationKey: ['change-user-profile'] });

  return (
    <LoaderWrapper 
      errorStatus={false} 
      loadingStatus={Boolean(changeProfileLoadingStatus)}
    >
      <main className='container'>
        <ProfileForm/>
        <div className='container'>
          <LoaderWrapper 
            errorStatus={isError} 
            loadingStatus={isLoading}
          >
            <RecipesList 
              data={data} 
              title='Your recipes'
            />
          </LoaderWrapper>
        </div>
      </main>
    </LoaderWrapper>
  );
}