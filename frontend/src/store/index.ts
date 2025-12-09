import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

