import React from "react";

interface ResetPasswordFormProps {
  email: string;
  setEmail: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSwitchToLogin: () => void;
}

const ResetPasswordForm = ({ email, setEmail, onSubmit, onSwitchToLogin }: ResetPasswordFormProps) => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">Reset your password</h2>
    <form onSubmit={onSubmit}>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
        className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
      >
        Send reset code
      </button>
    </form>
    <div className="text-sm text-center mt-4">
      <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
        Back to login
      </button>
    </div>
  </>
);

export default ResetPasswordForm;
