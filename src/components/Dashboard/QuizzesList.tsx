import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export default function QuizzesList() {
  const quizzes = useSelector((s: RootState) => s.quizzes.list);

  if (!quizzes.length) {
    return <Paper sx={{ p: 2 }}><Typography>No quizzes for this semester.</Typography></Paper>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Quizzes</Typography>
      <List>
        {quizzes.map(q => (
          <ListItem key={q._id}>
            <ListItemText primary={q.title} secondary={q.dueDate ? `Due: ${new Date(q.dueDate).toLocaleString()}` : ''}/>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
