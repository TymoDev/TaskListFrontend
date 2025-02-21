import ProfileSettings from "../Pages/Profile/ProfileSettingsPage";
import ProfileHeader from "../Pages/Profile/ProfileHeader";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useFetchUserAndProfile } from "../Hooks/User/UserProfileGetHook";

const ProfileRoutes: React.FC = () => {
  const { user, userProfile } = useFetchUserAndProfile();
  const { errorUser } = useSelector((state: RootState) => state.user);

  const { errorUserProfile } = useSelector(
    (state: RootState) => state.userProfile
  );

  if (errorUser || errorUserProfile)
    return <div>Error: {errorUser || errorUserProfile}</div>;

  if (!user || !userProfile) return <div>No user data available.</div>;

  if (!user || !userProfile) return <div>Loading...</div>;
  return (
    <Routes>
      <Route
        path="/"
        element={<ProfileHeader user={user} userProfile={userProfile} />}
      />
      <Route path="/settings" element={<ProfileSettings user={user} userProfile={userProfile} />} />
    </Routes>
  );
};

export default ProfileRoutes;
