import appReducer from './app';
import profileReducer from './profile';
import recipeFormReducer from './recipeForm';
import searchConfigReducer from './searchConfig';
import flashMessageReducer from './flashMessage';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    recipeForm: recipeFormReducer,
    searchConfig: searchConfigReducer,
    flashMessage: flashMessageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});