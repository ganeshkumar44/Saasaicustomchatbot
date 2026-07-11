import { configureStore } from '@reduxjs/toolkit';
import accountSettingsReducer from '@/store/accountSettingsSlice';
import authReducer from '@/store/authSlice';
import chatbotReducer from '@/store/chatbotSlice';
import chatbotSettingsReducer from '@/store/chatbotSettingsSlice';
import chatHistoryReducer from '@/store/chatHistorySlice';
import dashboardAnalyticsReducer from '@/store/dashboardAnalyticsSlice';
import dashboardReducer from '@/store/dashboardSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';
import manageUsersReducer from '@/store/manageUsersSlice';
import billingReducer from '@/store/billingSlice';
import knowledgebaseUploadReducer from '@/store/knowledgebaseUploadSlice';
import playgroundReducer from '@/store/playgroundSlice';
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
    manageUsers: manageUsersReducer,
    billing: billingReducer,
    knowledgebaseUpload: knowledgebaseUploadReducer,
    playground: playgroundReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
