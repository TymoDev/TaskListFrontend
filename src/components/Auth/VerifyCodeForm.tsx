import React from "react";

interface VerifyCodeFormProps {
  resetCode: string;
  setResetCode: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const VerifyCodeForm = ({ resetCode, setResetCode, onSubmit }: VerifyCodeFormProps) => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">Verify reset code</h2>
    <form onSubmit={onSubmit}>
      <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
        Enter the 5-digit code sent to your email
      </label>
      <input
        type="text"
        id="resetCode"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600"
      >
        Verify
      </button>
    </form>
  </>
);

export default VerifyCodeForm;
