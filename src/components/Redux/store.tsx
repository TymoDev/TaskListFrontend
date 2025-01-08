import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice'; // Import the tasksSlice reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Add the tasks reducer
  },
});


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
