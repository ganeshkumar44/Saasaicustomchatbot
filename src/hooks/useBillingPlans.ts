import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearBillingError } from '@/store/billingSlice';
import {
  selectBillingData,
  selectBillingError,
  selectBillingLoading,
  selectBillingPlans,
  selectCurrentBillingPlan,
  selectCurrentBillingPlanName,
} from '@/store/billingSelectors';
import { fetchUserBillingPlans } from '@/store/billingThunk';

export function useBillingPlans() {
  const dispatch = useAppDispatch();
  const billingData = useAppSelector(selectBillingData);
  const plans = useAppSelector(selectBillingPlans);
  const currentPlan = useAppSelector(selectCurrentBillingPlan);
  const currentPlanName = useAppSelector(selectCurrentBillingPlanName);
  const loading = useAppSelector(selectBillingLoading);
  const error = useAppSelector(selectBillingError);

  const refresh = useCallback(() => {
    void dispatch(fetchUserBillingPlans());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearBillingError());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    billingData,
    plans,
    currentPlan,
    currentPlanName,
    loading,
    error,
    refresh,
    clearError,
  };
}
