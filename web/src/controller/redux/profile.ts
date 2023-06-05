import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NewProfileLocalDataI } from '../../types/user';
import { profileStore } from '../../model/redux/profile';
import { ProfileStoreI } from '../../types/redux/profile';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileStore,
  reducers: {
    clearProfile: (): ProfileStoreI => {
      return profileStore;
    },
    changeSavedRecipes: (state: ProfileStoreI, action: PayloadAction<string[]>) => {
      state.savedRecipes = action.payload;
    },
    setProfile: (_: ProfileStoreI, action: PayloadAction<ProfileStoreI>): ProfileStoreI => {
      return action.payload;
    },
    changeProfileValue: (state: ProfileStoreI, action: PayloadAction<NewProfileLocalDataI>): ProfileStoreI => {
      return { ...state, ...action.payload };
    },
  },
});

export const { clearProfile, setProfile, changeProfileValue, changeSavedRecipes } = profileSlice.actions;

export default profileSlice.reducer;