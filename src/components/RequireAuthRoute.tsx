import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { fetchCurrentUser, markInitialized } from '../store/authSlice';
import { setToken } from '../api/apiClient';

export default function RequireAuthRoute() {
  const { loggedIn, initialized } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const bootstrapped = useRef(false);

  // 🔁 Bootstrap exactly once per app load
  useEffect(() => {
    if (bootstrapped.current) return;

    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      dispatch(fetchCurrentUser());
    } else {
      // mark initialized if no token
      dispatch(markInitialized());
    }

    bootstrapped.current = true;
  }, [dispatch]);

  if (!initialized) {
    return (
      <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
