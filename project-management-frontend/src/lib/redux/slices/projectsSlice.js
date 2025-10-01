import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProject: null,
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
});

export const { setCurrentProject, clearCurrentProject } = projectsSlice.actions;
export default projectsSlice.reducer;
