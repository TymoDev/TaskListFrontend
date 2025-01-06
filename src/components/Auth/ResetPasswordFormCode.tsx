import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = ({
  email,
  setEmail,
  resetPasswordSubmit,
}: {
  email:string
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  resetPasswordSubmit: (
    email: string
  ) => Promise<{ status: number; error?: string }>;
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await resetPasswordSubmit(email);
    if (result.status === 200) {
      navigate("/verify/code");
    } else {
      console.error(result.error || "Reset password failed");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset your password
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600">
            Send reset code
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
