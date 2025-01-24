import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../Redux/Slices/userSlice";
import { getUserProfile } from "../Redux/Slices/userProfileSlice";

export const useFetchUserAndProfile = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const { userProfile } = useSelector((state: RootState) => state.userProfile);
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
  
    return { user, userProfile };
  };