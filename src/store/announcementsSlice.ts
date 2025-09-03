import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../api/apiClient';
import { ISuccessResponse } from '@/store/response.types';

export type Announcement = {
  _id?: string;
  title: string;
  description: string;
  course?: string;
  semester?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
};

type State = {
  list: Announcement[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: State = { list: [], status: 'idle', error: null };

// -------------------- Thunks --------------------
export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetch',
  async () => {
    const res = await apiGet<ISuccessResponse<Announcement[]>>('/announcements');
    return res.data; // unwrap the data array
  }
);

export const createAnnouncement = createAsyncThunk(
  'announcements/create',
  async (payload: Announcement) => {
    const res = await apiPost<ISuccessResponse<Announcement>>('/announcements', payload);
    return res.data; // unwrap created announcement
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/update',
  async (payload: Announcement & { id: string }) => {
    const res = await apiPut<ISuccessResponse<Announcement>>(`/announcements/${payload.id}`, payload);
    return res.data; // unwrap updated announcement
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/delete',
  async (id: string) => {
    await apiDelete(`/announcements/${id}`);
    return id; // return id to remove from state
  }
);

// -------------------- Slice --------------------
const slice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    addLocalAnnouncement(state, action: PayloadAction<Announcement>) {
      state.list.unshift(action.payload);
    },
    removeLocalAnnouncement(state, action: PayloadAction<string>) {
      state.list = state.list.filter(a => a._id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAnnouncements.pending, state => { state.status = 'loading'; })
      .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<Announcement[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load announcements';
      })

      .addCase(createAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.list = state.list.map(a => (a._id === action.payload._id ? action.payload : a));
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(a => a._id !== action.payload);
      });
  }
});

export const { addLocalAnnouncement, removeLocalAnnouncement } = slice.actions;
export default slice.reducer;
