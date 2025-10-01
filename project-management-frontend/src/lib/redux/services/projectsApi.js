import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/lib/utils/constants';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
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
  tagTypes: ['Projects', 'ProjectMembers'],
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => '/projects',
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation({
      query: (projectData) => ({
        url: '/projects',
        method: 'POST',
        body: projectData, // { name, description }
      }),
      invalidatesTags: ['Projects'],
    }),
    addMemberToProject: builder.mutation({
      query: ({ projectId, user_id }) => ({
        url: `/projects/${projectId}/members`,
        method: 'POST',
        body: { user_id },
      }),
      invalidatesTags: ['ProjectMembers', 'Projects'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useAddMemberToProjectMutation,
} = projectsApi;