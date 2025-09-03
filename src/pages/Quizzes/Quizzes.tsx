import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchQuizzes, deleteQuiz, createQuiz, updateQuiz } from '../../store/quizzesSlice';
import QuizFormDialog from '../../components/Quizzes/QuizFormDialog';
import { Quiz } from '../../store/quizzesSlice';

export default function QuizzesPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.quizzes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Quiz | null>(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (q: Quiz) => {
    setEditing(q);
    setDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this quiz?')) return;
    await dispatch(deleteQuiz(id)).unwrap();
  };

  const handleSubmit = async (data: Quiz) => {
    if (editing?._id) {
      await dispatch(updateQuiz({ id: editing._id, ...data })).unwrap();
    } else {
      await dispatch(createQuiz(data)).unwrap();
    }
    setDialogOpen(false);
  };

  return (
    <Grid container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
        <Typography variant="h5">Quizzes</Typography>
        <IconButton onClick={handleOpenCreate}><AddIcon /></IconButton>
      </Box>

      <Paper sx={{ p: 2, width: '100%' }}>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {!list.length && <Typography>No quizzes yet.</Typography>}
        <List>
          {list.map(q => (
            <React.Fragment key={q._id ?? q.name}>
              <ListItem>
                <ListItemText 
                  primary={q.name} 
                  secondary={`${q.course || ''} - ${q.semester || ''}`} 
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleOpenEdit(q)} edge="end"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(q._id)} edge="end"><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <QuizFormDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onSubmit={handleSubmit} 
        initial={editing || undefined} 
      />
    </Grid>
  );
}
