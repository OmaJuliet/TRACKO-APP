import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types'; 

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<{ index: number; updatedTask: Task }>) => {
      state.tasks[action.payload.index] = action.payload.updatedTask;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});


export const { loadTasks, addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
