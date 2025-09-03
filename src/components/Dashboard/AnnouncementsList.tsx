import React from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Link } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

const staticUsers = [
  {
    name: 'Mr. Ahmed Mostafa',
    course: 'Math 101',
    avatar: '/avatars/ahmed.png', // you can put your static images in public/avatars
  },
  {
    name: 'Mrs. Salma Ahmed',
    course: 'Physics 02',
    avatar: '/avatars/salma.png',
  },
  {
    name: 'School management',
    course: 'Management',
    avatar: '/avatars/school.png',
  },
  {
    name: 'Events Manager',
    course: 'Events',
    avatar: '/avatars/events.png',
  },
];

export default function AnnouncementsList() {
  const { list, status } = useAppSelector(s => s.announcements);

  if (status === 'loading') {
    return <Typography>Loading announcements...</Typography>;
  }

  if (!list.length) {
    return <Paper sx={{ p: 2 }}><Typography>No announcements</Typography></Paper>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Announcements</Typography>
        <Link href="#" sx={{ color: 'primary.main', fontSize: '0.875rem', textDecoration: 'none' }}>All</Link>
      </Box>

      <List>
        {list.map((a, index) => {
          const user = staticUsers[index % staticUsers.length]; // rotate through static users
          return (
            <React.Fragment key={a._id ?? a.title}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {user.course}
                      </Typography>
                      {" — "}{a.description}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
}
