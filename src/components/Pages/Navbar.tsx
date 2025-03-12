import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthHook } from "../Hooks/User/userAuthHook";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };
  const { userLogoutHook } = userAuthHook();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Task Manager</div>
        <div className="flex gap-6 items-center relative">
          <button
            onClick={() => navigate("/home/template/tasklist")}
            className="hover:underline text-white">
            Home
          </button>
          <button
            onClick={() => navigate("home/template/select")}
            className="hover:underline text-white">
            Choose template
          </button>
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="hover:underline text-white flex items-center gap-2">
              Profile
              <svg
                className={`w-4 h-4 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md">
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                  View Profile
                </button>
                <button
                  onClick={() => handleNavigate("/profile/settings/basicInfo")}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                  Account Settings
                </button>
                <button
                  onClick={async () => {
                    await userLogoutHook();
                    navigate("/auth/login");
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
