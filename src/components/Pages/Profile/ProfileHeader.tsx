import React, { useEffect } from "react";
import { User } from "../../../Models/UserModel";
import { getUser } from "../../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ user }: { user: User }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          await dispatch(getUser()).unwrap();
          console.log("fetching users ProfileHeader");
        } catch {
          navigate("/login");
        }
      };

      fetchUser();
    }
  }, [dispatch, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex items-center gap-6 mb-6">
      <img
      //  src={user.avatar}
      // alt={`${user.Username}'s avatar`}
      // className="w-24 h-24 rounded-full border"
      />
      <div>
        <h1 className="text-2xl font-bold">{user.Username}</h1>
        <p className="text-gray-500">{user.Email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
