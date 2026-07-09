import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserBillingPlans } from '@/services/billing.service';
import type { UserBillingData } from '@/types/billing.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchUserBillingPlansPayload {
  message: string;
  data: UserBillingData;
}

export const fetchUserBillingPlans = createAsyncThunk<
  FetchUserBillingPlansPayload,
  void,
  { rejectValue: string }
>('billing/fetchUserBillingPlans', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserBillingPlans();
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
