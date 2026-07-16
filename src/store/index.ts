import { configureStore } from '@reduxjs/toolkit';
import accountSettingsReducer from '@/store/accountSettingsSlice';
import authReducer from '@/store/authSlice';
import chatbotReducer from '@/store/chatbotSlice';
import chatbotSettingsReducer from '@/store/chatbotSettingsSlice';
import chatHistoryReducer from '@/store/chatHistorySlice';
import chatbotAnalyticsReducer from '@/store/chatbotAnalyticsSlice';
import dashboardAnalyticsReducer from '@/store/dashboardAnalyticsSlice';
import dashboardReducer from '@/store/dashboardSlice';
import forgotPasswordReducer from '@/store/forgotPasswordSlice';
import manageUsersReducer from '@/store/manageUsersSlice';
import billingReducer from '@/store/billingSlice';
import knowledgebaseUploadReducer from '@/store/knowledgebaseUploadSlice';
import playgroundReducer from '@/store/playgroundSlice';
import pricingReducer from '@/store/pricingSlice';
import invoiceReducer from '@/store/invoiceSlice';
import subscriptionReducer from '@/store/subscriptionSlice';
import feedbackReducer from '@/store/feedbackSlice';
import chatbotPromptReducer from '@/store/chatbotPromptSlice';
import themeReducer from '@/store/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accountSettings: accountSettingsReducer,
    chatbot: chatbotReducer,
    chatbotSettings: chatbotSettingsReducer,
    chatHistory: chatHistoryReducer,
    chatbotAnalytics: chatbotAnalyticsReducer,
    dashboardAnalytics: dashboardAnalyticsReducer,
    dashboard: dashboardReducer,
    forgotPassword: forgotPasswordReducer,
    manageUsers: manageUsersReducer,
    billing: billingReducer,
    knowledgebaseUpload: knowledgebaseUploadReducer,
    playground: playgroundReducer,
    pricing: pricingReducer,
    invoice: invoiceReducer,
    subscription: subscriptionReducer,
    feedback: feedbackReducer,
    chatbotPrompt: chatbotPromptReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
