import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTask: null,
  filters: {
    status: 'all',
    assignedTo: 'all',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { status: 'all', assignedTo: 'all' };
    },
  },
});

export const { setCurrentTask, clearCurrentTask, setFilters, clearFilters } = tasksSlice.actions;
export default tasksSlice.reducer;