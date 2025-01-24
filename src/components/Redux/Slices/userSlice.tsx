import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../../Requests/Task/User/UserGetRequest";
import { User } from "../../Models/UserModel";

export const getUser = createAsyncThunk("user/getUser", fetchUser);

type UserState = {
  user: User | null;
  isLoadingUser: boolean;
  errorUser: string | null;
};

const initialState: UserState = {
  user: null,
  isLoadingUser: false,
  errorUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoadingUser = true;
        state.errorUser = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoadingUser = false;
        state.user = action.payload;
        state.errorUser = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.user = null;
        state.errorUser = action.error.message || "Failed to fetch user";
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
