import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Button, Container, TextField, Typography, Paper, 
  Divider, Link, Alert 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { registerUser } from '../../store/authSlice';
import ImageUpload from '../../components/shared/ImageUpload';

type FormData = { 
  name: string; 
  email: string; 
  password: string; 
  confirmPassword: string;
  avatar?: string; 
};

export default function Register() {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', avatar: '' }
  });
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>('');

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      
      if (!data.avatar) {
        data.avatar = 'https://i.pravatar.cc/150?img=1';
      }
      
      await dispatch(registerUser(data)).unwrap();
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Create Account
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Join our community and start your journey
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
          {/* <ImageUpload 
            onUploadSuccess={(url) => setValue('avatar', url)} 
            label="Profile Picture (Optional)"
          /> */}

          <TextField 
            label="Full Name" 
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          
          <TextField 
            label="Email Address" 
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
            fullWidth
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
            fullWidth
          />
          
          <TextField 
            label="Confirm Password" 
            type="password" 
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?
          </Typography>
        </Divider>
        
        <Box textAlign="center">
          <Button 
            component={RouterLink}
            to="/login"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign In Instead
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}