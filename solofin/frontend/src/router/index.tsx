import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MainLayout } from '../components/layout/MainLayout';
import LazyLoader from '../components/LazyLoader';
import NotFoundPage from '../components/NotFoundPage';
import ErrorPage from '@pages/ErrorPage';


// Protected
const DashboardPage = lazy(() => import('../pages/DashboardPage'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage code="Oops!" title="Beklenmedik Hata" message="Bir şeyler ters gitti." />,
    children: [
      {
        index: true,
        element:<div>Anasayfa</div>
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage/>
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LazyLoader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
  path: '*',
    element: <ErrorPage /> // Varsayılan olarak 404 modunda çalışır
  }
]);