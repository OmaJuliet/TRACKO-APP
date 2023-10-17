import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { loadTasks } from './taskSlice';
// import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    // app: appReducer,
  },
});

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  const parsedTasks = JSON.parse(storedTasks);
  store.dispatch(loadTasks(parsedTasks)); 
}

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
});

export type RootState = ReturnType<typeof store.getState>;
export default store;