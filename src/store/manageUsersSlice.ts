import { createSlice } from '@reduxjs/toolkit';
import {
  getManageUsersLoginHistory,
  getUserDetails,
  getUsers,
  updateUser,
  updateUserStatus,
} from '@/store/manageUsersThunk';
import type { ManageUsersState } from '@/types/manageUsers.types';
import { MANAGE_LOGIN_HISTORY_PAGE_SIZE } from '@/utils/loginHistory';
import { MANAGE_USERS_PAGE_SIZE } from '@/utils/manageUsers';

const initialState: ManageUsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  detailsLoading: false,
  updating: false,
  statusUpdating: false,
  pagination: {
    page: 1,
    perPage: MANAGE_USERS_PAGE_SIZE,
    totalRecords: 0,
    totalPages: 0,
  },
  loginHistory: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      perPage: MANAGE_LOGIN_HISTORY_PAGE_SIZE,
      totalRecords: 0,
      totalPages: 0,
    },
  },
  error: null,
};

const manageUsersSlice = createSlice({
  name: 'manageUsers',
  initialState,
  reducers: {
    clearManageUsersError: (state) => {
      state.error = null;
    },
    clearManageLoginHistoryError: (state) => {
      state.loginHistory.error = null;
    },
    clearSelectedManageUser: (state) => {
      state.selectedUser = null;
      state.error = null;
    },
    resetManageUsersState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          perPage: action.payload.perPage,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload ?? 'Failed to load users.';
      })
      .addCase(getUserDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.error = null;
        state.selectedUser = action.payload.data;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.selectedUser = null;
        state.error = action.payload ?? 'Failed to load user details.';
      })
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.error = null;
        state.users = state.users.map((user) =>
          user.user_id === action.payload.data.user_id ? action.payload.data : user,
        );

        if (state.selectedUser?.user_id === action.payload.data.user_id) {
          state.selectedUser = {
            ...state.selectedUser,
            first_name: action.payload.data.first_name,
            last_name: action.payload.data.last_name,
            full_name: action.payload.data.full_name,
            email: action.payload.data.email,
            mobile: action.payload.data.mobile,
            company: action.payload.data.company,
            website: action.payload.data.website,
            language: action.payload.data.language,
            profile_image: action.payload.data.profile_image,
            role: action.payload.data.role,
            account_status: action.payload.data.account_status,
            email_verified: action.payload.data.email_verified,
            mobile_verified: action.payload.data.mobile_verified,
            total_chatbots: action.payload.data.total_chatbots,
            updated_at: action.payload.data.updated_at,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update user.';
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.statusUpdating = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.statusUpdating = false;
        state.error = null;
        state.users = state.users.map((user) =>
          user.user_id === action.payload.userId
            ? { ...user, account_status: action.payload.accountStatus }
            : user,
        );

        if (state.selectedUser?.user_id === action.payload.userId) {
          state.selectedUser = {
            ...state.selectedUser,
            account_status: action.payload.accountStatus,
          };
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.error = action.payload ?? 'Failed to update user status.';
      })
      .addCase(getManageUsersLoginHistory.pending, (state) => {
        state.loginHistory.loading = true;
        state.loginHistory.error = null;
      })
      .addCase(getManageUsersLoginHistory.fulfilled, (state, action) => {
        state.loginHistory.loading = false;
        state.loginHistory.error = null;
        state.loginHistory.items = action.payload.data;
        state.loginHistory.pagination = {
          page: action.payload.page,
          perPage: action.payload.perPage,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getManageUsersLoginHistory.rejected, (state, action) => {
        state.loginHistory.loading = false;
        state.loginHistory.items = [];
        state.loginHistory.error =
          action.payload ?? 'Failed to load login history.';
      });
  },
});

export const {
  clearManageUsersError,
  clearManageLoginHistoryError,
  clearSelectedManageUser,
  resetManageUsersState,
} = manageUsersSlice.actions;

export default manageUsersSlice.reducer;
