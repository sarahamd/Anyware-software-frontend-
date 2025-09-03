import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../api/apiClient';

type Props = {
  onMobileMenuOpen?: () => void;
};

export default function Header({ onMobileMenuOpen }: Props) {
  const name = useAppSelector((s) => s.auth.user?.name ?? 'User');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setToken(null);
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="sticky" color="transparent" sx={{ boxShadow: 'none', bgcolor: 'background.paper' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: { xs: 1, md: 0 },
          py: { xs: 1, md: 0 }
        }}
      >
        {/* Top row: menu button (mobile) + welcome (hidden on mobile) + icons */}
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMobileMenuOpen}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Welcome text: hidden on xs/sm */}
            <Typography variant="h6" sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
              Welcome {name},
            </Typography>
          </Box>

          {/* Icons group (always visible) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Inline search for md+ */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', bgcolor: 'grey.100', px: 1, borderRadius: 2 }}>
              <SearchIcon />
              <InputBase placeholder="Search…" sx={{ ml: 1 }} />
            </Box>

            <IconButton aria-label="mail">
              <Badge badgeContent={2} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton aria-label="notifications">
              <Badge badgeContent={1} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Avatar with menu */}
            <IconButton onClick={handleMenuOpen}>
              <Avatar alt={name} src="" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Mobile search: shown under icons on xs/sm */}
        <Box sx={{ width: '100%', display: { xs: 'block', md: 'none' } }}>
          <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 0.5, bgcolor: 'grey.100', borderRadius: 2 }}>
            <SearchIcon />
            <InputBase placeholder="Search…" sx={{ ml: 1, width: '100%' }} />
          </Paper>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
