import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  activateAccount as activateAccountService,
  deactivateAccount as deactivateAccountService,
  deleteAccount as deleteAccountService,
  getUserDetails as getUserDetailsService,
  updatePassword as updatePasswordService,
  updateUserDetails as updateUserDetailsService,
} from '@/services/account.service';
import type {
  ActivateAccountRequest,
  DeleteAccountRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
  UserDetails,
} from '@/types/account.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface UserDetailsPayload {
  message: string;
  data: UserDetails;
}

interface MessagePayload {
  message: string;
}

export const fetchUserDetails = createAsyncThunk<
  UserDetailsPayload,
  void,
  { rejectValue: string }
>('accountSettings/fetchUserDetails', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserDetailsService();
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateUserProfile = createAsyncThunk<
  MessagePayload,
  UpdateUserRequest,
  { rejectValue: string }
>('accountSettings/updateProfile', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await updateUserDetailsService(payload);
    await dispatch(fetchUserDetails());
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateUserPassword = createAsyncThunk<
  MessagePayload,
  UpdatePasswordRequest,
  { rejectValue: string }
>('accountSettings/updatePassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await updatePasswordService(payload);
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const activateUserAccount = createAsyncThunk<
  MessagePayload,
  ActivateAccountRequest,
  { rejectValue: string }
>('accountSettings/activateAccount', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await activateAccountService(payload);
    await dispatch(fetchUserDetails());
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const deactivateUserAccount = createAsyncThunk<
  MessagePayload,
  void,
  { rejectValue: string }
>('accountSettings/deactivateAccount', async (_, { rejectWithValue }) => {
  try {
    const response = await deactivateAccountService();
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const deleteUserAccount = createAsyncThunk<
  MessagePayload,
  DeleteAccountRequest,
  { rejectValue: string }
>('accountSettings/deleteAccount', async (payload, { rejectWithValue }) => {
  try {
    const response = await deleteAccountService(payload);
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
