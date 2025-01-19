import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) return <div>No user data available.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <ProfileHeader user={user} />
    </div>
  );
};

export default ProfilePage;
