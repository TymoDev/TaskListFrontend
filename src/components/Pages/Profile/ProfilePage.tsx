/*import ProfileHeader from "./ProfileHeader";
import React, { useEffect } from "react";
import { getUser } from "../../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../Redux/Slices/userProfileSlice";

const ProfilePage = () => {
  const { user, isLoadingUser, errorUser } = useSelector(
    (state: RootState) => state.user
  );
  const { userProfile, isLoadingUserProfile, errorUserProfile } = useSelector(
    (state: RootState) => state.userProfile
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const fetchedUser = await dispatch(getUser()).unwrap();
        if (!userProfile) {
          await dispatch(getUserProfile(fetchedUser.id)).unwrap();
        }
      } catch {
        navigate("/auth/login");
      }
    };

    if (!user || !userProfile) {
      fetchUserAndProfile();
    }
  }, [dispatch, navigate, user, userProfile]);

  if (isLoadingUser || isLoadingUserProfile) return <div>Loading...</div>;
  if (errorUser || errorUserProfile)
    return <div>Error: {errorUser || errorUserProfile}</div>;
  if (!user || !userProfile) return <div>No user data available.</div>;

  return <ProfileHeader user={user} userProfile={userProfile} />;
};

export default ProfilePage;
*/