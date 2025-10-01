import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/lib/utils/constants';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getProjectTasks: builder.query({
      query: (projectId) => `/projects/${projectId}/tasks`,
      providesTags: (result, error, projectId) => [{ type: 'Tasks', id: projectId }],
    }),
    createTask: builder.mutation({
      query: ({ projectId, taskData }) => ({
        url: `/projects/${projectId}/tasks`,
        method: 'POST',
        body: taskData, // { title, description, status, due_date, assigned_to }
      }),
      invalidatesTags: (result, error, { projectId }) => [{ type: 'Tasks', id: projectId }],
    }),
    updateTask: builder.mutation({
      query: ({ projectId, taskId, taskData }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: 'PUT',
        body: taskData, // { status } or full
      }),
      invalidatesTags: (result, error, { projectId }) => [{ type: 'Tasks', id: projectId }],
    }),
    deleteTask: builder.mutation({
      query: ({ projectId, taskId }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: 'DELETE',
        // No body
      }),
      invalidatesTags: (result, error, { projectId }) => [{ type: 'Tasks', id: projectId }],
    }),
  }),
});

export const {
  useGetProjectTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;