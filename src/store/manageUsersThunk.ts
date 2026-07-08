import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getManageUsersLoginHistory as getManageUsersLoginHistoryService,
  getUserDetails as getUserDetailsService,
  getUsers as getUsersService,
  updateUser as updateUserService,
  updateUserStatus as updateUserStatusService,
} from '@/services/manageUsers.service';
import type {
  FetchManageLoginHistoryParams,
  ManageLoginHistoryItem,
} from '@/types/loginHistory.types';
import type {
  FetchManageUsersParams,
  ManageUserDetail,
  ManageUserListItem,
  UpdateManageUserRequest,
  UpdateManageUserStatusRequest,
} from '@/types/manageUsers.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchManageUsersPayload {
  message: string;
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
  data: ManageUserListItem[];
}

interface FetchManageUserDetailsPayload {
  message: string;
  data: ManageUserDetail;
}

interface UpdateManageUserPayload {
  message: string;
  data: ManageUserListItem;
}

interface UpdateManageUserStatusPayload {
  message: string;
  userId: number;
  accountStatus: ManageUserListItem['account_status'];
}

interface FetchManageLoginHistoryPayload {
  message: string;
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
  data: ManageLoginHistoryItem[];
}

export const getUsers = createAsyncThunk<
  FetchManageUsersPayload,
  FetchManageUsersParams,
  { rejectValue: string }
>('manageUsers/getUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await getUsersService(params);
    return {
      message: response.message,
      page: response.page,
      perPage: response.per_page,
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const getUserDetails = createAsyncThunk<
  FetchManageUserDetailsPayload,
  number,
  { rejectValue: string }
>('manageUsers/getUserDetails', async (userId, { rejectWithValue }) => {
  try {
    const response = await getUserDetailsService(userId);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk<
  UpdateManageUserPayload,
  { userId: number; payload: UpdateManageUserRequest },
  { rejectValue: string }
>('manageUsers/updateUser', async ({ userId, payload }, { rejectWithValue }) => {
  try {
    const response = await updateUserService(userId, payload);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateUserStatus = createAsyncThunk<
  UpdateManageUserStatusPayload,
  { userId: number; payload: UpdateManageUserStatusRequest },
  { rejectValue: string }
>('manageUsers/updateUserStatus', async ({ userId, payload }, { rejectWithValue }) => {
  try {
    const response = await updateUserStatusService(userId, payload);
    return {
      message: response.message,
      userId: response.user_id,
      accountStatus: response.account_status,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const getManageUsersLoginHistory = createAsyncThunk<
  FetchManageLoginHistoryPayload,
  FetchManageLoginHistoryParams,
  { rejectValue: string }
>('manageUsers/getManageUsersLoginHistory', async (params, { rejectWithValue }) => {
  try {
    const response = await getManageUsersLoginHistoryService(params);
    return {
      message: response.message,
      page: response.page,
      perPage: response.per_page,
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
