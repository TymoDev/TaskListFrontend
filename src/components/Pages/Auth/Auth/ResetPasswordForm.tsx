import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = ({
  email,
  resetPasswordSubmit,
}: {
  email: string;
  resetPasswordSubmit: (email: string, password: string) => void;
}) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (newPassword !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setError("");
    resetPasswordSubmit(email, newPassword);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Set a new password
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            required
          />

          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1">
            Repeat password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600">
            Reset Password
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline">
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
