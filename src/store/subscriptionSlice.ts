import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchChatbotSubscriptionUsage } from '@/store/subscriptionThunk';
import type { SubscriptionState } from '@/types/subscription.types';

const initialState: SubscriptionState = {
  loading: false,
  error: null,
  plan: null,
  limits: null,
  usage: null,
  playgroundMessagingDisabled: false,
  playgroundLimitMessage: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    setPlaygroundMessagingDisabled: (
      state,
      action: PayloadAction<{ disabled: boolean; message?: string | null }>,
    ) => {
      state.playgroundMessagingDisabled = action.payload.disabled;
      state.playgroundLimitMessage = action.payload.disabled
        ? (action.payload.message ?? state.playgroundLimitMessage)
        : null;
    },
    clearPlaygroundMessagingLimit: (state) => {
      state.playgroundMessagingDisabled = false;
      state.playgroundLimitMessage = null;
    },
    resetSubscriptionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotSubscriptionUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatbotSubscriptionUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usage = action.payload;
        state.limits = action.payload.limits;
        state.plan = action.payload.limits.plan_name;

        const unlimited = action.payload.limits.playground_message_unlimited;
        const limit = action.payload.limits.playground_message_limit;
        if (
          !unlimited &&
          limit !== null &&
          action.payload.playground_messages_used >= limit
        ) {
          state.playgroundMessagingDisabled = true;
          state.playgroundLimitMessage =
            'You have reached your Playground message limit for this chatbot.';
        }
      })
      .addCase(fetchChatbotSubscriptionUsage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? 'Failed to load subscription usage. Please try again.';
      });
  },
});

export const {
  clearSubscriptionError,
  setPlaygroundMessagingDisabled,
  clearPlaygroundMessagingLimit,
  resetSubscriptionState,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
