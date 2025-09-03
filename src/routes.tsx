import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardPage from './pages/Dashboard/Dashboard';
import AnnouncementsPage from './pages/Announcements/Announcements';
import QuizzesPage from './pages/Quizzes/Quizzes';
import RequireAuthRoute from './components/RequireAuthRoute';
import RequireGuestRoute from './components/RequireGuestRoute';
import DashboardLayout from './layouts/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public (only for guests) */}
      <Route element={<RequireGuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected */}
      <Route element={<RequireAuthRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
        </Route>
      </Route>

      {/* Fallback → redirect to dashboard (guard will redirect to /login if unauthenticated) */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
}
