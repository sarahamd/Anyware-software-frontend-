import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Button, Container, TextField, Typography, Paper, 
  Divider, Link 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../store/authSlice';

type Form = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ 
    defaultValues: { email: '', password: '' } 
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login to Your Account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2, mt: 2 }}>
          <TextField 
            label="Email" 
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <TextField 
            label="Password" 
            type="password" 
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          
          <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
            Login
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>
        
        <Box textAlign="center">
          <Typography variant="body2" sx={{ mb: 2 }}>
            Don't have an account yet?
          </Typography>
          <Button 
            component={RouterLink}
            to="/register"
            variant="outlined"
            fullWidth
          >
            Create New Account
          </Button>
        </Box>
        
      </Paper>
    </Container>
  );
}