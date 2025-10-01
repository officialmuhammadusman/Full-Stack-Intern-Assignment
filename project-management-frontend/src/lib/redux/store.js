import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { projectsApi } from './services/projectsApi';
import { tasksApi } from './services/tasksApi';
import { usersApi } from './services/usersApi';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      projectsApi.middleware,
      tasksApi.middleware,
      usersApi.middleware
    ),
});