import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Announcement, createAnnouncement, updateAnnouncement } from '../../store/announcementsSlice';

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Announcement | null;
};

type Form = {
  title: string;
  description: string;
  course?: string;
  semester?: string;
};

export default function AnnouncementFormDialog({ open, onClose, initial }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(s => s.auth); // get current user ID

  const { control, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      title: '',
      description: '',
      course: '',
      semester: ''
    }
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title || '',
        description: initial.description || '',
        course: initial.course || '',
        semester: initial.semester || ''
      });
    } else {
      reset({ title: '', description: '', course: '', semester: '' });
    }
  }, [initial, reset]);

  const onSubmit = async (data: Form) => {
    try {
      const payload = {
        ...data,
        user: user?._id
      };

      if (initial?._id) {
        await dispatch(updateAnnouncement({ ...payload, id: initial._id } as any)).unwrap();
      } else {
        await dispatch(createAnnouncement(payload as any)).unwrap();
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? 'Edit Announcement' : 'Create Announcement'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <TextField {...field} label="Title" fullWidth margin="dense" />}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField {...field} label="Description" fullWidth multiline rows={4} margin="dense" />}
            />
          </Grid>
          <Grid size={{xs:12,md:6}}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => <TextField {...field} label="Course" fullWidth margin="dense" />}
            />
          </Grid>
          <Grid size={{xs:12,md:6}}>
            <Controller
              name="semester"
              control={control}
              render={({ field }) => <TextField {...field} label="Semester" fullWidth margin="dense" />}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {initial ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
