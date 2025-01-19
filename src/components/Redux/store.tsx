import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice"; // Import the tasksSlice reducer
import userReducer from "./Slices/userSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
