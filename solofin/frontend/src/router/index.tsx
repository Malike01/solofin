import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MainLayout } from '../components/layout/MainLayout';
import LazyLoader from '../components/LazyLoader';
import NotFoundPage from '../components/NotFoundPage';


// Protected
const DashboardPage = lazy(() => import('../pages/DashboardPage'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
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
]);