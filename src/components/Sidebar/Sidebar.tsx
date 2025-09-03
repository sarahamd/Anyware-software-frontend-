import React from 'react';
import {
  Box,
  List,
  Typography,
  Avatar,
  Drawer,
  IconButton,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import QuizIcon from '@mui/icons-material/Quiz';
import CloseIcon from '@mui/icons-material/Close';
import SidebarItem from './SidebarItem';

type Props = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

const drawerWidth = 240;

function SidebarContent() {
  return (
    <>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>C</Avatar>
        <Typography variant="h6">Coligo</Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      <List sx={{ flex: 1 }}>
        <SidebarItem to="/dashboard" label="Dashboard" icon={<HomeIcon />} />
        <SidebarItem to="/announcements" label="Announcements" icon={<AnnouncementIcon />} />
        <SidebarItem to="/quizzes" label="Quizzes" icon={<QuizIcon />} />
      </List>

      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Typography variant="caption">v1.0</Typography>
      </Box>
    </>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }: Props) {
  return (
    <>
      {/* Permanent drawer for md+ */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: '100vh',
          bgcolor: 'primary.main',
          backgroundImage: 'linear-gradient(to top, #3c8399, #124b68)',
          color: 'white',
          display: { xs: 'none', md: 'flex' }, // hidden on mobile
          flexDirection: 'column',
          position: 'sticky',
          top: 0
        }}
      >
        <SidebarContent />
      </Box>

      {/* Temporary drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'primary.main',
            backgroundImage: 'linear-gradient(to top, #3c8399, #124b68)',
            color: 'white'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onMobileClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <SidebarContent />
      </Drawer>
    </>
  );
}
