import { User } from "../../Models/UserModel";
import type { UserProfile } from "../../Models/UserProfileModel";

const UserProfile = ({ user, userProfile }: { user: User, userProfile: UserProfile }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-8 w-full shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden bg-gray-300">
            {userProfile.profileImageUrl ? (
              <img
                src={userProfile.profileImageUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">Name</span>
              <button className="text-blue-500 hover:underline">
                {userProfile.username || "Not Provided"}
              </button>
            </li>
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">Location</span>
              <button className="text-blue-500 hover:underline">
                {userProfile.location || "Not Provided"}
              </button>
            </li>
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">Birthday</span>
              <button className="text-blue-500 hover:underline">
                {userProfile.birthday || "Not Provided"}
              </button>
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Links</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">Github</span>
              <a
                href={userProfile.gitHubUrl || "#"}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {userProfile.gitHubUrl || "Not Provided"}
              </a>
            </li>
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">LinkedIn</span>
              <a
                href={userProfile.linkedInUrl || "#"}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {userProfile.linkedInUrl || "Not Provided"}
              </a>
            </li>
            <li className="py-4 flex justify-between items-center">
              <span className="text-gray-600">Twitter</span>
              <a
                href={userProfile.twitterUrl || "#"}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {userProfile.twitterUrl || "Not Provided"}
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
