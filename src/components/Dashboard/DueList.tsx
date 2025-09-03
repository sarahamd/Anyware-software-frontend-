// src/components/Dashboard/DueList.tsx
import React, { useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';

import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

export default function DueList() {
  const quizzes = useAppSelector(state => state.quizzes.list);
  const now = Date.now();

  const topQuizzes = useMemo(() => {
    return [...quizzes]
      .sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
      .slice(0, 3);
  }, [quizzes]);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">What's due</Typography>
        <Link
          to="/quizzes"
          style={{ color: '#0e7c86', cursor: 'pointer', textDecoration: 'none', fontSize: '0.875rem', fontWeight:"bold" }}
        >
          All
        </Link>
      </Box>

      {topQuizzes.length ? (
        topQuizzes.map(({ id, title, questionCount, semester, dueDate }) => {
          const due = dueDate ? new Date(dueDate) : null;
          const isOverdue = due ? due.getTime() < now : false;
          const dueLabel = due
            ? `${isOverdue ? 'Overdue' : 'Due'}: ${due.toLocaleString()}`
            : 'No due date';

          const isQuiz = true; // Assuming all items are quizzes for now; could add a type field later

          return (
            <Paper
              key={id}
              variant="outlined"
              sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: '#f9f9f9' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                {isQuiz ? (
                  <QuizIcon color="primary" />
                ) : (
                  <AssignmentIcon color="primary" />
                )}
                <Typography variant="subtitle1">{title}</Typography>
              </Box>

              {semester && (
                <Typography variant="body2" color="text.secondary">
                  Course: {semester}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {questionCount} question{questionCount !== 1 ? 's' : ''}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: isOverdue ? 'error.main' : 'text.secondary', mb: 2, display: 'block' }}
              >
                {dueLabel}
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                {isQuiz ? 'Start Quiz' : 'Solve Assignment'}
              </Button>
            </Paper>
          );
        })
      ) : (
        <Typography>No due items</Typography>
      )}
    </Paper>
  );
}
