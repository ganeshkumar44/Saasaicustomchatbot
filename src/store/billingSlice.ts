import { createSlice } from '@reduxjs/toolkit';
import { fetchUserBillingPlans } from '@/store/billingThunk';
import type { BillingState } from '@/types/billing.types';

const initialState: BillingState = {
  billingData: null,
  loading: false,
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    clearBillingError: (state) => {
      state.error = null;
    },
    resetBillingState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBillingPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBillingPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.billingData = action.payload.data;
      })
      .addCase(fetchUserBillingPlans.rejected, (state, action) => {
        state.loading = false;
        state.billingData = null;
        state.error = action.payload ?? 'Failed to load billing plans.';
      });
  },
});

export const { clearBillingError, resetBillingState } = billingSlice.actions;
export default billingSlice.reducer;
