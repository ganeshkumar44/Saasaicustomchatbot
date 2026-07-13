import { createAsyncThunk } from '@reduxjs/toolkit';
import { submitWebsiteFeedback } from '@/services/feedback.service';
import type {
  CreateFeedbackRequest,
  CreateFeedbackSuccessResponse,
} from '@/types/feedback.types';
import { getApiErrorMessage } from '@/utils/apiError';

export const submitFeedbackThunk = createAsyncThunk<
  CreateFeedbackSuccessResponse,
  CreateFeedbackRequest,
  { rejectValue: string }
>('feedback/submit', async (payload, { rejectWithValue }) => {
  try {
    return await submitWebsiteFeedback(payload);
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
