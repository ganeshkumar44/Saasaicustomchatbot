import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { router } from './routes';
import { store } from '@/store/index';
import { logout } from '@/store/authSlice';

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
      <ThemeProvider attribute="class" defaultTheme="dark">
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </Provider>
  );
}