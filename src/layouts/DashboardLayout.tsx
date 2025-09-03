import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = () => setMobileOpen(true);
  const handleMobileClose = () => setMobileOpen(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />
      <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
        <Header onMobileMenuOpen={handleMobileOpen} />
        <Box component="main" sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
