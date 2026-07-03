import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
import { store } from '@/store/index';
import { logout } from '@/store/authSlice';
import { ThemeProviderBridge } from '@/app/components/ThemeProviderBridge';
import { ThemeInitializer } from '@/app/components/ThemeInitializer';

function AuthSessionSync() {
  useEffect(() => {
    const handleUnauthorized = () => {
      store.dispatch(logout());
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthSessionSync />
      <ThemeProviderBridge>
        <ThemeInitializer>
          <RouterProvider router={router} />
        </ThemeInitializer>
        <Toaster richColors position="top-right" />
      </ThemeProviderBridge>
    </Provider>
  );
}