import { Outlet } from 'react-router';
import { BillingWorkInProgress } from '@/app/pages/BillingWorkInProgress';
import { ENABLE_BILLING_PAGE } from '@/config/featureFlags';

/**
 * Gates all /dashboard/billing/* routes behind a temporary WIP screen until
 * the real payment gateway is enabled via ENABLE_BILLING_PAGE.
 */
export function BillingRoute() {
  if (!ENABLE_BILLING_PAGE) {
    return <BillingWorkInProgress />;
  }

  return <Outlet />;
}
