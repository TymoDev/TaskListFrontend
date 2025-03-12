import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserProfile,
  UserProfileUpdateImage,
} from "../../Models/UserProfileModel";
import { fetchUserProfile } from "../../Requests/Task/User/UserProfileRequest";
import { UserUpdateImage } from "../../Requests/Task/User/UserRequestUpdate";

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  fetchUserProfile
);
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  UserUpdateImage
);

type UserProfileState = {
  userProfile: UserProfile | null;
  isLoadingUserProfile: boolean;
  errorUserProfile: string | null;
};

const initialState: UserProfileState = {
  userProfile: null,
  isLoadingUserProfile: false,
  errorUserProfile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoadingUserProfile = true;
        state.errorUserProfile = null;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.isLoadingUserProfile = false;
          state.userProfile = action.payload;
          state.errorUserProfile = null;
        }
      )
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoadingUserProfile = false;
        state.userProfile = null;
        state.errorUserProfile =
          action.error.message || "Failed to fetch user profile";
      });
    builder.addCase(
      updateProfileImage.fulfilled,
      (state, action: PayloadAction<UserProfileUpdateImage>) => {
        if (state.userProfile) {
          state.userProfile.profileImageUrl = action.payload.url;
        }
      }
    )
    .addCase(updateProfileImage.rejected, (state, action) => {
      console.log("Error during updating");
    });
  },
});

export const {} = userProfileSlice.actions;
export default userProfileSlice.reducer;
