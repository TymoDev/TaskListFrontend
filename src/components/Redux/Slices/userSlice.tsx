import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../../../Requests/User/UserGetRequest";
import { User } from "../../../Models/UserModel";

export const getUser = createAsyncThunk("tasks/getUserTasks", fetchUser);

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
