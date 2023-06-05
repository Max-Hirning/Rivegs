import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import LoaderWrapper from '../reusable/Loader';
import RecipesList from '../reusable/RecipesList';
import { RootState } from '../../types/redux/store';
import RecipeTypesComponent from './RecipeTypesComponent';
import { SearchConfigI } from '../../types/redux/searchConfig';
import { useSearchRecipes } from '../../controller/hooks/recipes';
import PaginationButtonsComponent from './PaginationButtonsComponent';

export default function MainPage(): ReactElement {
  const { data, isLoading, isError } = useSearchRecipes();
  const searchConfig: SearchConfigI = useSelector((state: RootState) => state.searchConfig);

  return (
    <main className="container d-flex flex-column align-items-center">
      <RecipeTypesComponent/>
      <PaginationButtonsComponent 
        rightButtonDisableStatus={!(!(data?.length%8) && data?.length > 0 && !isLoading)} 
        leftButtonDisableStatus={!(data?.length > 0 && !isLoading && searchConfig.page !== 1)}
      />
      <LoaderWrapper 
        errorStatus={isError} 
        loadingStatus={isLoading}
      >
        <RecipesList 
          data={data} 
          title='Recipes'
          searchPermission={true}
        />
      </LoaderWrapper>
    </main>
  );
}
