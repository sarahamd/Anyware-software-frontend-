import React, { useEffect, useState } from 'react';
import { Grid, Box, Paper, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAnnouncements, deleteAnnouncement, Announcement } from '../../store/announcementsSlice';
import AnnouncementFormDialog from '../../components/Announcements/AnnouncementFormDialog';

export default function AnnouncementsPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.announcements);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleEdit = (a: Announcement) => {
    setEditing(a);
    setDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this announcement?')) return;
    await dispatch(deleteAnnouncement(id)).unwrap();
  };

  return (
    <Grid container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
        <Typography variant="h5">Announcements</Typography>
        <IconButton onClick={handleCreate}><AddIcon /></IconButton>
      </Box>

      <Paper sx={{ p: 2, width: '100%' }}>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {!list.length && <Typography>No announcements yet.</Typography>}
        <List>
          {list.map(a => (
            <React.Fragment key={a._id ?? a.title}>
              <ListItem>
                <ListItemText primary={a.title} secondary={`${a.user || ''} - ${a.description}`} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(a)} edge="end"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(a._id)} edge="end"><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <AnnouncementFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initial={editing}
      />
    </Grid>
  );
}
