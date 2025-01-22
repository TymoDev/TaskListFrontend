import ProfileHeader from "./ProfileHeader";
import React, { useEffect } from "react";
import { getUser } from "../../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          await dispatch(getUser()).unwrap();
          //console.log("Fetching user in ProfileHeader");
        } catch {
          navigate("/auth/login");
        }
      };
      fetchUser();
    } else {
      //console.log("User from Redux:", user); 
    }
  }, [dispatch, user, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available.</div>;

  return (
      <ProfileHeader user={user} />
  );
};

export default ProfilePage;
