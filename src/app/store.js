import { configureStore } from '@reduxjs/toolkit';
import { brancheSliceAPI } from '../features/branch/brancheSliceAPI';
import { storeSliceApi } from '../features/store/storeSliceAPI';
import toastReducer from '../components/Toast/toastSlice';
import { preloginSliceAPI } from '../features/prelogin/preloginSliceAPI';
import { userSlice } from '../features/slices/userSlice';
import { homeSliceAPI } from '../features/home/homeSliceAPI';
import { forgotPassSliceAPI } from '../features/forgot-pass/forgotPassSliceAPI';
import { resetPassSliceAPI } from '../features/reset-pass/resetPassSliceAPI';
import { registrationSliceAPI } from '../features/registration/registrationSliceAPI';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    userSession: userSlice.reducer,
    [storeSliceApi.reducerPath]: storeSliceApi.reducer,
    [brancheSliceAPI.reducerPath]: brancheSliceAPI.reducer,
    [preloginSliceAPI.reducerPath]: preloginSliceAPI.reducer,
    [homeSliceAPI.reducerPath]: homeSliceAPI.reducer,
    [forgotPassSliceAPI.reducerPath]: forgotPassSliceAPI.reducer,
    [resetPassSliceAPI.reducerPath]: resetPassSliceAPI.reducer,
    [registrationSliceAPI.reducerPath]: registrationSliceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      storeSliceApi.middleware,
      brancheSliceAPI.middleware,
      preloginSliceAPI.middleware,
      homeSliceAPI.middleware,
      forgotPassSliceAPI.middleware,
      resetPassSliceAPI.middleware,
      registrationSliceAPI.middleware
    );
  },
});
