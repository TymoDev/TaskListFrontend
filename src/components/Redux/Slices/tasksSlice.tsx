import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../Models/TasksModel";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../Requests/Task/Task/TaskRequestHttp";
export const getUserTasks = createAsyncThunk("tasks/getUserTasks", fetchTasks);
export const createUserTasks = createAsyncThunk(
  "tasks/createUserTasks",
  createTask
);
export const updateUserTasks = createAsyncThunk(
  "tasks/updateUserTasks",
  updateTask
);
export const deleteUserTasks = createAsyncThunk(
  "tasks/deleteUserTasks",
  deleteTask
);

// Type for the initial state
type TaskState = Task[];

// Initial state with some example tasks
const initialState: TaskState = [];

const tasksSlice = createSlice({
  name: "tasks", // Name of the slice
  initialState, // Initial state for the slice
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          // console.log("fedched tasks successfully");
          // console.log(action.payload);
          return action.payload;
        }
      )
      .addCase(getUserTasks.pending, (state) => {
        //console.log("Loading tasks...");
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        //console.error("Failed to fetch tasks:", action.error.message);
      });

    builder.addCase(
      createUserTasks.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const newState = [...state, action.payload];
        //console.log(JSON.stringify(state,null,2),JSON.stringify(action.payload,null,2));
        return newState;
      }
    );
    builder.addCase(
      updateUserTasks.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        /* console.log({
          state: JSON.stringify(state, null, 2),
          payload: JSON.stringify(action.payload, null, 2),
          index,
        });*/

        state[index].taskStatus = action.payload.taskStatus;
      }
    );
    builder.addCase(
      deleteUserTasks.fulfilled,
      (state, action: PayloadAction<{ id: string }>) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
    );
  },
});
export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
