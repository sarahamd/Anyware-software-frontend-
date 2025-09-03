import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import announcementsReducer from '../store/announcementsSlice';
import quizzesReducer from './quizzesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcements: announcementsReducer,
    quizzes: quizzesReducer
  },
  devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
