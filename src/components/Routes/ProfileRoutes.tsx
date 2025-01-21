import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../Pages/Profile/ProfilePage";
import ProfileSettings from "../Pages/Profile/ProfileSettingsPage";

const ProfileRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <ProfilePage />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/settings"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <ProfileSettings />
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default ProfileRoutes;
