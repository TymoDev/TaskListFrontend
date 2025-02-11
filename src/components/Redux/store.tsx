import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice";
import userReducer from "./Slices/userSlice";
import userProfileReducer from "./Slices/userProfileSlice";
import kanbanTasksReducer from "./Slices/kanbanTasksSlice";
import kanbanColumnsReducer from "./Slices/kanbanColumnsSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    kanbanTasks: kanbanTasksReducer,
    user: userReducer,
    userProfile: userProfileReducer,
    kanbanColumns: kanbanColumnsReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
