import { createSlice } from '@reduxjs/toolkit';
import {
  activateUserAccount,
  deactivateUserAccount,
  deleteUserAccount,
  fetchUserDetails,
  updateUserPassword,
  updateUserProfile,
  removeProfilePicture,
} from '@/store/accountSettingsThunk';
import type { AccountSettingsState } from '@/types/account.types';

const initialState: AccountSettingsState = {
  userDetails: null,
  profileLoading: false,
  profileUpdating: false,
  passwordUpdating: false,
  removeProfilePictureLoading: false,
  activateLoading: false,
  deactivateLoading: false,
  deleteLoading: false,
  success: false,
  error: null,
  successMessage: null,
};

const accountSettingsSlice = createSlice({
  name: 'accountSettings',
  initialState,
  reducers: {
    clearAccountSettingsError: (state) => {
      state.error = null;
    },
    clearAccountSettingsSuccess: (state) => {
      state.success = false;
      state.successMessage = null;
    },
    resetAccountSettingsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.userDetails = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.profileLoading = false;
        state.error =
          action.payload ?? 'Failed to load user details. Please try again.';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.profileUpdating = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileUpdating = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileUpdating = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to update profile. Please try again.';
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.passwordUpdating = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.passwordUpdating = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.passwordUpdating = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to update password. Please try again.';
      })
      .addCase(activateUserAccount.pending, (state) => {
        state.activateLoading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        state.activateLoading = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(activateUserAccount.rejected, (state, action) => {
        state.activateLoading = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to activate account. Please try again.';
      })
      .addCase(deactivateUserAccount.pending, (state) => {
        state.deactivateLoading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deactivateUserAccount.fulfilled, (state, action) => {
        state.deactivateLoading = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(deactivateUserAccount.rejected, (state, action) => {
        state.deactivateLoading = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to deactivate account. Please try again.';
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.deleteLoading = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to delete account. Please try again.';
      })
      .addCase(removeProfilePicture.pending, (state) => {
        state.removeProfilePictureLoading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(removeProfilePicture.fulfilled, (state, action) => {
        state.removeProfilePictureLoading = false;
        state.success = true;
        state.successMessage = action.payload.message;
        state.error = null;
        if (state.userDetails) {
          state.userDetails.profile_image = null;
        }
      })
      .addCase(removeProfilePicture.rejected, (state, action) => {
        state.removeProfilePictureLoading = false;
        state.success = false;
        state.error =
          action.payload ?? 'Failed to remove profile picture. Please try again.';
      });
  },
});

export const {
  clearAccountSettingsError,
  clearAccountSettingsSuccess,
  resetAccountSettingsState,
} = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;
