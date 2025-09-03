import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Quiz } from '@/store/quizzesSlice';

interface QuizFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quizData: Quiz) => void;
  initial?: Quiz;
}

export default function QuizFormDialog({ open, onClose, onSubmit, initial }: QuizFormProps) {
  const { control, handleSubmit, reset, watch } = useForm<Quiz>({
    defaultValues: initial || {
      name: '',
      course: '',
      semester: '',
      dueDate: '',
      questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }],
    },
  });

  const { fields: questions, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (initial) reset(initial);
    else
      reset({
        name: '',
        course: '',
        semester: '',
        dueDate: '',
        questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }],
      });
  }, [initial, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{initial ? 'Edit Quiz' : 'Create Quiz'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Quiz Name" fullWidth margin="dense" />}
            />
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => <TextField {...field} label="Course" fullWidth margin="dense" />}
            />
          </Grid>

          {/* Semester */}
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="semester"
              control={control}
              render={({ field }) => <TextField {...field} label="Semester" fullWidth margin="dense" />}
            />
          </Grid>

          {/* Due Date */}
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => {
                // format ISO string to yyyy-MM-dd
                const formattedValue = field.value
                  ? field.value.split('T')[0]
                  : '';
                return (
                  <TextField
                    {...field}
                    value={formattedValue}
                    type="date"
                    label="Due Date"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => field.onChange(e.target.value)} // keep RHF updated
                  />
                );
              }}
            />
          </Grid>
        </Grid>


        <Typography variant="h6" sx={{ mt: 2 }}>
          Questions
        </Typography>

        {questions.map((q, index) => (
          <Accordion key={q.id} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Question {index + 1}</Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                }}
                sx={{ ml: 'auto' }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              {/* Question Text */}
              <Controller
                name={`questions.${index}.questionText` as const}
                control={control}
                render={({ field }) => <TextField {...field} label="Question Text" fullWidth margin="dense" />}
              />

              {/* Options */}
              <Controller
                name={`questions.${index}.options.0` as const}
                control={control}
                render={({ field }) => <TextField {...field} label="Option 1" fullWidth margin="dense" />}
              />
              <Controller
                name={`questions.${index}.options.1` as const}
                control={control}
                render={({ field }) => <TextField {...field} label="Option 2" fullWidth margin="dense" />}
              />
              <Controller
                name={`questions.${index}.options.2` as const}
                control={control}
                render={({ field }) => <TextField {...field} label="Option 3" fullWidth margin="dense" />}
              />
              <Controller
                name={`questions.${index}.options.3` as const}
                control={control}
                render={({ field }) => <TextField {...field} label="Option 4" fullWidth margin="dense" />}
              />

              {/* Correct Answer Index */}
              <Controller
                name={`questions.${index}.correctAnswerIndex` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Correct Answer Index (0-3)"
                    fullWidth
                    margin="dense"
                    inputProps={{ min: 0, max: 3 }}
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
        ))}

        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={() =>
            append({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 })
          }
          sx={{ mt: 1 }}
        >
          Add Question
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {initial ? 'Update Quiz' : 'Save Quiz'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
