import { User } from "../../Models/UserModel";

const ProfileHeader = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-black">{user.username}</h1>
        <p className="text-base text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
