import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

export default function SidebarItem({ to, label, icon }: Props) {
  const location = useLocation();

  // active detection, supports hash links
  const isActive = (() => {
    const [path, hash] = to.split('#');
    return location.pathname === path && location.hash === (hash ? `#${hash}` : '');
  })();

  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      selected={isActive}
      sx={{
        px: 3,
        py: 1.2,
        color: 'white',
        mb: 0.5,
        borderRadius: 1,
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.1)'
        },
        '&.Mui-selected': {
          bgcolor: 'rgba(255,255,255,0.2)',
          fontWeight: 600
        }
      }}
    >
      {icon && <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
