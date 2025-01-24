import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthHook } from "../../Hooks/User/userAuthHook";
import ErrorModal from "../../Modals/ErrorModal";

const LoginForm = ({
  handleLoginSubmit,
}: {
  handleLoginSubmit: (
    email: string,
    password: string
  ) => Promise<{ status: number; error?: string }>;
}) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [passwordProp, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { userVerifyAuthHook } = userAuthHook();

  useEffect(() => {
    const verifyAuth = async () => {
      const response = await userVerifyAuthHook(); // Виклик асинхронної функції
      if (response.status === 200) {
        navigate("/home/template/tasklist");
      }
    };
    verifyAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleLoginSubmit(login, passwordProp);
    if (result.status === 200) {
      navigate("/home/template/tasklist");
    } else {
      setLogin("");
      setPassword("");
      setModalMessage(result.error || "Login failed");
      setIsModalOpen(true);
    }
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
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Username or email
          </label>
          <input
            type="text"
            id="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
            value={passwordProp}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 w-full rounded-md hover:bg-red-600">
            Log in
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <button
            onClick={() => navigate("/auth/register")}
            className="text-blue-600 hover:underline mr-2">
            Create account
          </button>
          <button
            onClick={() => {
              navigate("/auth/password/code");
            }}
            className="text-blue-600 hover:underline mr-2">
            Forgot password
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;