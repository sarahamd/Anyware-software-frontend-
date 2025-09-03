import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../api/apiClient';
import { setToken } from '../api/apiClient';
import { useLocation, useNavigate } from 'react-router-dom';

export type User = {
    _id?: string,
    name?: string,
    email?: string,
    avatar?: string,
    haveFullControl?: boolean,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
};

type AuthState = {
  loggedIn: boolean;
  token?: string | null;
  user?: User | null;
  status: 'idle'|'loading'|'failed'|'succeeded';
  error?: string | null;
  initialized: boolean;
};

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
};

/** Endpoints:
 * POST /auth/login { email, password } -> { token, user }
 * POST /auth/signup { name, email, password } -> { token, user }
 * GET  /auth/getCurrentAdmin -> { user }
 */

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email?: string; password?: string }, { rejectWithValue }) => {
    try {
      const res = await apiPost<{ token: string; user: User }>('/auth/login', payload);
      // ✅ persist token immediately so subsequent calls include it
      setToken(res.token);
      localStorage.setItem('token', res.token);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await apiPost<{ token: string; user: User }>('/auth/signup', payload);
      setToken(res.token);
      window.location.href = "/login"
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/getCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGet<{ admin: User }>('/auth/getCurrentAdmin');
      return res.admin;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user');
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.initialized = true; // we're done, just unauthenticated
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loggedIn = true;
      state.initialized = true;
    },
    // ✅ allows bootstrappers to mark auth as checked when no token
    markInitialized(state) {
      state.initialized = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loggedIn = true;
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message;
        state.initialized = true;
      })

      .addCase(registerUser.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = false;
        state.initialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message;
        state.initialized = true;
      })

      .addCase(fetchCurrentUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.loggedIn = true;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.status = 'failed';
        state.initialized = true; // even if invalid token
      });
  }
});

export const { logout, setUser, markInitialized } = slice.actions;
export default slice.reducer;
