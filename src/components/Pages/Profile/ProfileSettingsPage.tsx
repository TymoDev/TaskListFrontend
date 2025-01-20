import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    // Редагування профілю
    navigate("/profile/edit");
  };

  const handleLogout = () => {
    // Логіка виходу
    
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleEditProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit Profile
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSettings;