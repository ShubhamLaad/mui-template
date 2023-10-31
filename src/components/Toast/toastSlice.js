import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toastMsg: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastMsg: (state, action) => {
      state.toastMsg = action.payload;
    },
  },
});

export const { setToastMsg } = toastSlice.actions;
export default toastSlice.reducer;
