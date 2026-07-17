import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import {
  clearAccountSettingsError,
  clearAccountSettingsSuccess,
  resetAccountSettingsState,
} from '@/store/accountSettingsSlice';
import {
  selectAccountSettingsError,
  selectAccountSettingsSuccess,
  selectAccountSettingsSuccessMessage,
  selectActivateLoading,
  selectDeactivateLoading,
  selectDeleteLoading,
  selectPasswordUpdating,
  selectProfileLoading,
  selectProfileUpdating,
  selectRemoveProfilePictureLoading,
  selectUserDetails,
} from '@/store/accountSettingsSelectors';
import {
  activateUserAccount,
  deactivateUserAccount,
  deleteUserAccount,
  fetchUserDetails,
  removeProfilePicture,
  updateUserPassword,
  updateUserProfile,
} from '@/store/accountSettingsThunk';
import type {
  ActivateAccountRequest,
  DeleteAccountRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
} from '@/types/account.types';

export function useAccountSettings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userDetails = useAppSelector(selectUserDetails);
  const profileLoading = useAppSelector(selectProfileLoading);
  const profileUpdating = useAppSelector(selectProfileUpdating);
  const passwordUpdating = useAppSelector(selectPasswordUpdating);
  const loadingRemoveAvatar = useAppSelector(selectRemoveProfilePictureLoading);
  const activateLoading = useAppSelector(selectActivateLoading);
  const deactivateLoading = useAppSelector(selectDeactivateLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const success = useAppSelector(selectAccountSettingsSuccess);
  const error = useAppSelector(selectAccountSettingsError);
  const successMessage = useAppSelector(selectAccountSettingsSuccessMessage);

  const getUserDetails = useCallback(
    () => dispatch(fetchUserDetails()),
    [dispatch],
  );

  const updateProfile = useCallback(
    async (payload: UpdateUserRequest) => {
      dispatch(clearAccountSettingsError());
      const result = await dispatch(updateUserProfile(payload));

      if (updateUserProfile.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      const errorMessage =
        result.payload ?? 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
      return result;
    },
    [dispatch],
  );

  const updatePassword = useCallback(
    async (payload: UpdatePasswordRequest) => {
      dispatch(clearAccountSettingsError());
      const result = await dispatch(updateUserPassword(payload));

      if (updateUserPassword.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(clearAccountSettingsSuccess());
        return result;
      }

      const errorMessage =
        result.payload ?? 'Failed to update password. Please try again.';
      toast.error(errorMessage);
      return result;
    },
    [dispatch],
  );

  const activateAccount = useCallback(
    async (payload: ActivateAccountRequest) => {
      dispatch(clearAccountSettingsError());
      const result = await dispatch(activateUserAccount(payload));

      if (activateUserAccount.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      const errorMessage =
        result.payload ?? 'Failed to activate account. Please try again.';
      toast.error(errorMessage);
      return result;
    },
    [dispatch],
  );

  const deactivateAccount = useCallback(async () => {
    dispatch(clearAccountSettingsError());
    const result = await dispatch(deactivateUserAccount());

    if (deactivateUserAccount.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(logout());
      navigate('/signin');
      return result;
    }

    const errorMessage =
      result.payload ?? 'Failed to deactivate account. Please try again.';
    toast.error(errorMessage);
    return result;
  }, [dispatch, navigate]);

  const deleteAccount = useCallback(
    async (payload: DeleteAccountRequest) => {
      dispatch(clearAccountSettingsError());
      const result = await dispatch(deleteUserAccount(payload));

      if (deleteUserAccount.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(logout());
        navigate('/signin');
        return result;
      }

      const errorMessage =
        result.payload ?? 'Failed to delete account. Please try again.';
      toast.error(errorMessage);
      return result;
    },
    [dispatch, navigate],
  );

  const removeProfilePictureAction = useCallback(async () => {
    dispatch(clearAccountSettingsError());
    const result = await dispatch(removeProfilePicture());

    if (removeProfilePicture.fulfilled.match(result)) {
      toast.success(result.payload.message);
      return result;
    }

    const errorMessage =
      result.payload ?? 'Failed to remove profile picture. Please try again.';
    toast.error(errorMessage);
    return result;
  }, [dispatch]);

  const clearError = useCallback(
    () => dispatch(clearAccountSettingsError()),
    [dispatch],
  );

  const resetState = useCallback(
    () => dispatch(resetAccountSettingsState()),
    [dispatch],
  );

  return {
    userDetails,
    profileLoading,
    profileUpdating,
    passwordUpdating,
    loadingRemoveAvatar,
    activateLoading,
    deactivateLoading,
    deleteLoading,
    success,
    error,
    successMessage,
    getUserDetails,
    updateProfile,
    updatePassword,
    activateAccount,
    deactivateAccount,
    deleteAccount,
    removeProfilePicture: removeProfilePictureAction,
    clearError,
    resetState,
  };
}
