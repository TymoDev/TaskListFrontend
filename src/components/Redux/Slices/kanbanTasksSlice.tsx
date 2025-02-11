import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskKanbanModel } from "../../Models/TaskKanbanModel";
import {
  createKanbanTask,
  deleteKanbanTask,
  fetchKanbanTasks,
} from "../../Requests/Task/Task/TaskKanbanRequestHttp";

export const getUserKanbanTasks = createAsyncThunk(
  "tasks/getUserKanbanTasks",
  fetchKanbanTasks
);

export const createUserKanbanTask = createAsyncThunk(
  "tasks/createUserKanbanTasks",
  createKanbanTask
);

export const deleteUserKanbanTasks = createAsyncThunk(
  "tasks/deteleUserKanbanTasks",
  deleteKanbanTask
);

/*export const updateUserTasks = createAsyncThunk(
  "tasks/updateUserTasks",
  updateTask
);*/

type TaskState = TaskKanbanModel[];

const initialState: TaskState = [];

const kanbanTasksSlice = createSlice({
  name: "kanbanTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserKanbanTasks.fulfilled,
        (state, action: PayloadAction<TaskKanbanModel[]>) => {
          // console.log("fedched tasks successfully");
          // console.log(action.payload);
          return action.payload;
        }
      )
      .addCase(getUserKanbanTasks.pending, (state) => {
        //console.log("Loading tasks...");
      })
      .addCase(getUserKanbanTasks.rejected, (state, action) => {
        //console.error("Failed to fetch tasks:", action.error.message);
      });

    builder.addCase(
      createUserKanbanTask.fulfilled,
      (state, action: PayloadAction<TaskKanbanModel>) => {
        const newState = [...state, action.payload];
        //console.log(JSON.stringify(state,null,2),JSON.stringify(action.payload,null,2));
        return newState;
      }
    );
    builder.addCase(
      deleteUserKanbanTasks.fulfilled,
      (state, action: PayloadAction<{ id: string }>) => {
        const index = state.findIndex(
          (task) => task.taskId === action.payload.id
        );
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
    );
  },
});
export const {} = kanbanTasksSlice.actions;
export default kanbanTasksSlice.reducer;

/*
builder.addCase(
      updateUserTasks.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        /* console.log({
          state: JSON.stringify(state, null, 2),
          payload: JSON.stringify(action.payload, null, 2),
          index,
        });*/

//  state[index].taskStatus = action.payload.taskStatus;
// }
//);
//  builder.addCase(
// deleteUserTasks.fulfilled,
//  (state, action: PayloadAction<{ id: string }>) => {
//   const index = state.findIndex((task) => task.id === action.payload.id);
//  if (index !== -1) {
//    state.splice(index, 1);
//  }
//  }
// );
