import { useNavigate } from "react-router-dom";
import { User } from "../../Models/UserModel";
import UserProfile from "./ProfileHeader";

const ProfileSettings = ({ userProfile }: { user: User, userProfile: UserProfile }) => {
  const navigate = useNavigate();


  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 px-10 shadow-lg">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-gray-600 flex-shrink-0"></div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{userProfile.username}</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="bg-white shadow rounded-lg p-6">
          <ul className="space-y-4">
            <li>
              <button
                className="w-full text-left font-semibold text-blue-500 hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/basic-info")}
              >
                Basic Info
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/points")}
              >
                Points
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/account")}
              >
                Account
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/lab")}
              >
                Lab
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/privacy")}
              >
                Privacy
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/notifications")}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/billing")}
              >
                Billing
              </button>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded transition"
                onClick={() => handleNavigate("/orders")}
              >
                Orders
              </button>
            </li>
          </ul>
        </aside>

        <section className="bg-white shadow rounded-lg p-6 lg:col-span-3">
          <h2 className="text-xl font-bold mb-4 text-center">Basic Info</h2>
          <div className="space-y-4">
            {[
              { label: "Name", value: userProfile.username },
              { label: "Gender", value: userProfile.gender || "Not provided" },
              { label: "Location", value: userProfile.location || "Not provided"},
              { label: "Birthday", value: userProfile.birthday || "Not provided"},
              { label: "Summary", value: userProfile.description || "Not provided"},
              { label: "Website", value: userProfile.personalWebsiteUrl || "Not provided"},
              { label: "Github", value: userProfile.gitHubUrl || "Not provided"},
              { label: "LinkedIn", value: userProfile.linkedInUrl || "Not provided"},
              { label: "X (formerly Twitter)", value: userProfile.twitterUrl || "Not provided"},
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
