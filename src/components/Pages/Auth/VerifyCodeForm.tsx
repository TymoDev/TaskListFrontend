import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../Modals/ErrorModal";

const VerifyCodeForm = ({
  onSubmit,
  email,
}: {
  onSubmit: (
    Email: string,
    Code: number
  ) => Promise<{ status: number; error?: string }>;
  email: string;
}) => {
  const [resetCode, setResetCode] = useState<string>("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const codeAsNumber = parseInt(resetCode, 5);
    if (!isNaN(codeAsNumber)) {
      const result = await onSubmit(email, codeAsNumber);
      if (result.status === 200) {
        navigate("/auth/password/reset");
      } else {
        setResetCode("");
        setModalMessage("You entered the wrong code");
        setIsModalOpen(true);
        
      }
    } else {
      console.error("Invalid reset code format");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          navigate("/auth/password/code");
        }}
        message={modalMessage}
      />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify reset code
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="resetCode"
            className="block text-sm font-medium text-gray-700 mb-1">
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
            className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodeForm;
