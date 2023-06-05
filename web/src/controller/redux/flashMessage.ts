import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { flashMessageStore } from '../../model/redux/flashMessage';
import { FlashMessageStoreI } from '../../types/redux/flashMessage';

export const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState: flashMessageStore,
  reducers: {
    setFlashMessageConfig: (_, action: PayloadAction<FlashMessageStoreI>): FlashMessageStoreI => {
      return action.payload;
    },
    toogleVisibilityStatus: (state: FlashMessageStoreI, action: PayloadAction<boolean>): FlashMessageStoreI => {
      state.visibilityStatus = action.payload;
      return state;
    },
  },
});

export const { setFlashMessageConfig, toogleVisibilityStatus } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;