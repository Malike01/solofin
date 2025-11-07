import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userInfo = useAuth();

  if (!userInfo.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};