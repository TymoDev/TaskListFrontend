import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Models/UserModel";
import type { UserProfile, UserProfileUpdateImage } from "../../Models/UserProfileModel";
import { useDispatch } from "react-redux";
import { updateProfileImage } from "../../Redux/Slices/userProfileSlice";
import { AppDispatch } from "../../Redux/store";

const ProfileSettings = ({
  userProfile,
}: {
  user: User;
  userProfile: UserProfile;
}) => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      await dispatch(updateProfileImage(file));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to update image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 px-10 shadow-lg">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-600 flex-shrink-0 group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarInput"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            <label htmlFor="avatarInput" className="w-full h-full block">
              {userProfile.profileImageUrl ? (
                <img
                  src={userProfile.profileImageUrl}
                  alt="User Avatar"
                  className={`w-full h-full object-cover transition-opacity ${
                    isUploading ? "opacity-50" : ""
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs">{isUploading ? "Uploading..." : "Change photo"}</span>
              </div>
            </label>
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{userProfile.username}</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="bg-white shadow rounded-lg p-6">
          <ul className="space-y-4">
            {[
              { label: "Basic Info", path: "/basic-info" },
              { label: "Points", path: "/points" },
              { label: "Account", path: "/account" },
              { label: "Lab", path: "/lab" },
              { label: "Privacy", path: "/privacy" },
              { label: "Notifications", path: "/notifications" },
              { label: "Billing", path: "/billing" },
              { label: "Orders", path: "/orders" },
            ].map((item, index) => (
              <li key={index}>
                <button
                  className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition font-semibold text-blue-500"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="bg-white shadow rounded-lg p-6 lg:col-span-3">
          <h2 className="text-xl font-bold mb-4 text-center">Basic Info</h2>
          <div className="space-y-4">
            {[
              { label: "Name", value: userProfile.username },
              { label: "Gender", value: userProfile.gender || "Not provided" },
              { label: "Location", value: userProfile.location || "Not provided" },
              { label: "Birthday", value: userProfile.birthday || "Not provided" },
              { label: "Summary", value: userProfile.description || "Not provided" },
              { label: "Website", value: userProfile.personalWebsiteUrl || "Not provided" },
              { label: "Github", value: userProfile.gitHubUrl || "Not provided" },
              { label: "LinkedIn", value: userProfile.linkedInUrl || "Not provided" },
              { label: "X (formerly Twitter)", value: userProfile.twitterUrl || "Not provided" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium w-1/3 text-gray-600 text-center">{item.label}</span>
                <span className="w-1/3 text-center text-gray-800">{item.value}</span>
                <button className="text-blue-500">Edit</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;
