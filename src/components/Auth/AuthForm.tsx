import { useState } from "react";
import AuthBar from "./AuthBar";
import ErrorModal from "../../ErrorModals/RegisterLoginErrorModal"; // Імпортуємо ErrorModal

interface AuthFormProps {
  onSubmitLogin: (username: string, email: string, password: string) => Promise<{ status: number; error?: string }>;
  onSubmitRegister: (username: string, email: string, password: string) => Promise<{ status: number; error?: string }>;
}

const AuthForm = ({ onSubmitLogin, onSubmitRegister }: AuthFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let result;
      if (isLogin) {
        result = await onSubmitLogin(username, email, password);
      } else {
        result = await onSubmitRegister(username, email, password);
      }

      if (result.status !== 200) {
        throw new Error(result.error || "An unexpected error occurred.");
      }

      setIsModalOpen(false);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setIsModalOpen(false); 
      setErrorMessage(error.message || "An unexpected error occurred."); 
    }
  };

  return (
    <div>
      <AuthBar
        onLoginClick={() => {
          setIsLogin(true);
          setIsModalOpen(true);
        }}
        onRegisterClick={() => {
          setIsLogin(false);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 w-full rounded-md"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-blue-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage(null)} 
        />
      )}
    </div>
  );
};

export default AuthForm;