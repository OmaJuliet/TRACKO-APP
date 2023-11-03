// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer, { loadTasks } from './taskSlice';

// const store = configureStore({
//   reducer: {
//     tasks: taskReducer,
//   },
// });

// const storedTasks = localStorage.getItem('tasks');
// if (storedTasks) {
//   const parsedTasks = JSON.parse(storedTasks);
//   store.dispatch(loadTasks(parsedTasks)); 
// }

// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
// });

// export type RootState = ReturnType<typeof store.getState>;
// export default store;


import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { loadTasks } from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

if (typeof window !== 'undefined') {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const parsedTasks = JSON.parse(storedTasks);
    store.dispatch(loadTasks(parsedTasks));
  }

  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export default store;
