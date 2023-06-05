import { appStore } from '../../model/redux/app';
import { AppStoreI, LanguageI } from '../../types/redux/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'app',
  initialState: appStore,
  reducers: {
    menuStatusToggle: (state: AppStoreI) => {
      state.menuStatus = !state.menuStatus;
    },
    searchModalStatusToggle: (state: AppStoreI) => {
      state.searchModalStatus = !state.searchModalStatus;
    },
    recipeLanguageStatusToggle: (state: AppStoreI) => {
      state.recipeLanguageStatus = !state.recipeLanguageStatus;
    },
    changeRateModalStatusToggle: (state: AppStoreI) => {
      state.changeRateModalStatus = !state.changeRateModalStatus;
    },
    setLanguages: (state: AppStoreI, action: PayloadAction<LanguageI[]>) => {
      state.languages = action.payload;
    },
  },
});

export const { setLanguages, menuStatusToggle, searchModalStatusToggle, changeRateModalStatusToggle, recipeLanguageStatusToggle } = profileSlice.actions;

export default profileSlice.reducer;