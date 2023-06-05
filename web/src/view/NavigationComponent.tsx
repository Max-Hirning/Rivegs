import MainPage from './Main';
import RecipePage from './Recipe';
import SavedRecipes from './Saved';
import ErrorPage from './ErrorPage';
import ProfilePage from './Profile';
import SignInPage from './Auth/SignInPage';
import SignUpPage from './Auth/SignUpPage';
import React, { ReactElement } from 'react';
import CreateRecipePage from './CreateEdit';
import ErrorRoutePage from './ErrorRoutePage';
import { Route, Routes } from 'react-router-dom';

export default function NavigationComponent(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<ErrorRoutePage/>} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/saved-recipes" element={<SavedRecipes />} />
      <Route path="/recipe/:recipeId" element={<RecipePage />} />
      <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/edit-recipe/:recipeId" element={<CreateRecipePage />} />
    </Routes>
  );
}
