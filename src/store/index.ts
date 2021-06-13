import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import studySlice from './slices/studySlice';

const store = configureStore({
  reducer: {
    study: studySlice
  },
  middleware: getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;