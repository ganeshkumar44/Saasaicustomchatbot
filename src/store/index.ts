import { configureStore } from '@reduxjs/toolkit';
import accountSettingsReducer from '@/store/accountSettingsSlice';
import authReducer from '@/store/authSlice';
import chatbotReducer from '@/store/chatbotSlice';
import chatbotSettingsReducer from '@/store/chatbotSettingsSlice';
import dashboardAnalyticsReducer from '@/store/dashboardAnalyticsSlice';
import dashboardReducer from '@/store/dashboardSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accountSettings: accountSettingsReducer,
    chatbot: chatbotReducer,
    chatbotSettings: chatbotSettingsReducer,
    dashboardAnalytics: dashboardAnalyticsReducer,
    dashboard: dashboardReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
