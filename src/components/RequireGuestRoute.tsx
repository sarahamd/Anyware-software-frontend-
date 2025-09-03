import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireGuestRoute() {
  const { loggedIn } = useAppSelector(s => s.auth);

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
