import { configureStore } from '@reduxjs/toolkit';
import accountSettingsReducer from '@/store/accountSettingsSlice';
import authReducer from '@/store/authSlice';
import chatbotReducer from '@/store/chatbotSlice';
import chatbotSettingsReducer from '@/store/chatbotSettingsSlice';
import chatHistoryReducer from '@/store/chatHistorySlice';
import dashboardAnalyticsReducer from '@/store/dashboardAnalyticsSlice';
import dashboardReducer from '@/store/dashboardSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';
import themeReducer from '@/store/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accountSettings: accountSettingsReducer,
    chatbot: chatbotReducer,
    chatbotSettings: chatbotSettingsReducer,
    chatHistory: chatHistoryReducer,
    dashboardAnalytics: dashboardAnalyticsReducer,
    dashboard: dashboardReducer,
    forgotPassword: forgotPasswordReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
