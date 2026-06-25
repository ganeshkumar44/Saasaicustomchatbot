import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import chatbotReducer from '@/store/chatbotSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
