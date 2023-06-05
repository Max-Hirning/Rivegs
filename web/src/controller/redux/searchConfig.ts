import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchConfigStore } from '../../model/redux/searchConfig';
import { AdditionalConfigI, SearchConfigI } from '../../types/redux/searchConfig';

export const searchConfigSlice = createSlice({
  name: 'searchConfig',
  initialState: searchConfigStore,
  reducers: {
    incrementCurrentPage: (state: SearchConfigI) => {
      state.additionalConfig = undefined;
      state.page += 1;
    },
    decrementCurrentPage: (state: SearchConfigI) => {
      state.additionalConfig = undefined;
      state.page -= 1;
    },
    setRecipeType: (state: SearchConfigI, action: PayloadAction<string>) => {
      state.additionalConfig = undefined;
      state.type = action.payload;
    },
    setSearchConfig: (_: SearchConfigI, action: PayloadAction<SearchConfigI>): SearchConfigI => {
      return action.payload;
    },
    setAdditionalConfig: (state: SearchConfigI, action: PayloadAction<AdditionalConfigI|undefined>) => {
      state.additionalConfig = action.payload;
    },
  },
});

export const { setAdditionalConfig, incrementCurrentPage, decrementCurrentPage, setRecipeType, setSearchConfig } = searchConfigSlice.actions;

export default searchConfigSlice.reducer;