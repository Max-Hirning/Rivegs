import { Link } from 'react-router-dom';
import { useIsMutating } from 'react-query';
import MenuIcon from './assets/icons/MenuIcon';
import MenuComponent from './view/MenuComponent';
import LoaderWrapper from './view/reusable/Loader';
import { useGetUser } from './controller/hooks/user';
import { ProfileStoreI } from './types/redux/profile';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from './view/reusable/FlashMessage';
import { menuStatusToggle } from './controller/redux/app';
import { AppDispatch, RootState } from './types/redux/store';
import NavigationComponent from './view/NavigationComponent';
import { useGetLanguages } from './controller/hooks/recipes';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

export default function AppComponent(): ReactElement {
  const getUser = useGetUser();
  const getLanguages = useGetLanguages();
  const dispatch: AppDispatch = useDispatch();
  const [isAuth, setIsAut] = useState<boolean>(false);
  const deleteUserLoadingStatus = useIsMutating({ mutationKey: ['delete-user'] });
  const { login, savedRecipes }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  useMemo(() => {
    setIsAut(login?.length > 0); 
  }, [login, savedRecipes]);

  useEffect(() => {
    const result = localStorage.getItem('user');
    if(result) getUser.mutate(result);
    getLanguages.mutate();
  }, []);

  const openMenu = (): void => {
    dispatch(menuStatusToggle());
  };

  const getActionEl = (): ReactElement => {
    if(isAuth) {
      return (
        <button className='btn' onClick={openMenu}>
          <MenuIcon width={30} height={30} color="black"/>
        </button>
      );
    } else {
      return <Link to="sign-in" className="fs-5 mb-0 text-decoration-none text-body">Sign in</Link>;
    }
  };

  return (
    <LoaderWrapper
      errorStatus={false}
      loadingStatus={Boolean(deleteUserLoadingStatus) || getLanguages.isLoading}
    >
      <>
        <FlashMessage />
        <header className="top-0 shadow-sm p-3 mb-4 bg-body-tertiary d-flex justify-content-between p-3 align-items-center px-5">
          <Link 
            to="/" 
            className="fs-1 mb-0 text-decoration-none text-body"
          >Cook well</Link>
          {getActionEl()}
        </header>
        <MenuComponent/>
        <NavigationComponent/>
      </>
    </LoaderWrapper>
  );
}