import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../Modals/ErrorModal";

const RegisterFormStep1 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setModalMessage("Passwords do not match!");
      setIsModalOpen(true);
      return;
    }
    navigate("/auth/register/step2", { state: formData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create your account
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-700 mb-1">
            Login
          </label>
          <input
            type="text"
            id="login"
            value={formData.login}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Your email address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700 mb-1">
            Repeat password
          </label>
          <input
            type="password"
            id="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 w-full rounded-md hover:bg-red-600">
            Next
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-blue-600 hover:underline">
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormStep1;
