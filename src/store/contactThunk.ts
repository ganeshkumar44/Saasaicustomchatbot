import { createAsyncThunk } from '@reduxjs/toolkit';
import { submitContact } from '@/services/contact.service';
import type { ContactRequest } from '@/types/landing.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface SubmitContactPayload {
  message: string;
}

export const submitContactThunk = createAsyncThunk<
  SubmitContactPayload,
  ContactRequest,
  { rejectValue: string }
>('contact/submit', async (payload, { rejectWithValue }) => {
  try {
    const response = await submitContact(payload);
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
