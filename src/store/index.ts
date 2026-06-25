import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
