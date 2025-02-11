import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ColumnModel } from "../../Models/TaskKanbanModel";
import {
  createColumn,
  deleteColumn,
  fetchColumns,
} from "../../Requests/Task/Task/TaskKanbanColumnRequestHttp";

export const getUserKanbanColumns = createAsyncThunk(
  "tasks/getUserKanbanColumns",
  fetchColumns
);
export const createUserKanbanColumns = createAsyncThunk(
  "tasks/createUserKanbanColumns",
  createColumn
);
export const deleteUserKanbanColumns = createAsyncThunk(
  "tasks/deleteUserKanbanColumns",
  deleteColumn
);

/*export const updateUserTasks = createAsyncThunk(
  "tasks/updateUserTasks",
  updateTask
);
export const deleteUserTasks = createAsyncThunk(
  "tasks/deleteUserTasks",
  deleteTask
);*/

// Type for the initial state
type TaskState = ColumnModel[];

// Initial state with some example tasks
const initialState: TaskState = [];

const kanbanColumnsSlice = createSlice({
  name: "kanbanColumns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserKanbanColumns.fulfilled,
        (state, action: PayloadAction<ColumnModel[]>) => {
          // console.log("fedched tasks successfully");
          // console.log(action.payload);
          return action.payload;
        }
      )
      .addCase(getUserKanbanColumns.pending, (state) => {
        //console.log("Loading tasks...");
      })
      .addCase(getUserKanbanColumns.rejected, (state, action) => {
        //console.error("Failed to fetch tasks:", action.error.message);
      });

    builder.addCase(
      createUserKanbanColumns.fulfilled,
      (state, action: PayloadAction<ColumnModel>) => {
        const newState = [...state, action.payload];
        //console.log(JSON.stringify(state,null,2),JSON.stringify(action.payload,null,2));
        return newState;
      }
    );
  },
});
export const {} = kanbanColumnsSlice.actions;
export default kanbanColumnsSlice.reducer;

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
