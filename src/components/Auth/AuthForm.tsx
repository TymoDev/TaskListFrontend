import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tryAuthUser } from "../../Requests/User/UserRequest";
interface AuthFormProps {
  onSubmitLogin: (
    email: string,
    password: string
  ) => Promise<{ status: number; error?: string }>;
  onSubmitRegister: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ status: number; error?: string }>;
}

const AuthForm = ({ onSubmitLogin, onSubmitRegister }: AuthFormProps) => {
  const navigate = useNavigate();
  const [isInLoginForm, setIsLoginForm] = useState(true);
  const [isInResetPasswordForm, setPasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const checkUserStatus = async () => {
    const result = await tryAuthUser();
    if (result.success) {
      console.log(`User status: ${result.status} - Authorized`);
      navigate("/home");
    }
  };
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await onSubmitLogin(login, password);
      checkUserStatus();
      if (result.status !== 200) {
        throw new Error(result.error || "An unexpected error occurred.");
      }
      navigate("/home");
      setLogin("");
      setPassword("");
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      checkUserStatus();
      const result = await onSubmitRegister(username, login, password);
      navigate("/home");
      if (result.status !== 200) {
        throw new Error(result.error || "An unexpected error occurred.");
      }

      setUsername("");
      setLogin("");
      setPassword("");
      setRepeatPassword("");
      setErrorMessage(null);
      setIsLoginForm(true);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };
  const handleResetPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {isInLoginForm ? (
          <>
            {isInResetPasswordForm ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Reset your password
                </h2>
                <form onSubmit={handleResetPasswordSubmit}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600">
                    Reset password
                  </button>
                </form>
                <div className="text-sm text-center mt-4">
                  <button
                    onClick={() => {
                      setPasswordForm(false);
                      setIsLoginForm(true);
                    }}
                    className="text-blue-600 hover:underline">
                    Back to login
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Log in to your account
                </h2>
                <form onSubmit={handleLoginSubmit}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Username or email
                  </label>
                  <input
                    type="text"
                    id="login"
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
                    value={password}
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
                    onClick={() => setIsLoginForm(false)}
                    className="text-blue-600 hover:underline mr-2">
                    Create account
                  </button>
                  ·
                  <button
                    onClick={() => setPasswordForm(true)}
                    className="text-blue-600 hover:underline ml-2">
                    Forgot password
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create your account
            </h2>
            <form onSubmit={handleRegisterSubmit}>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <button
                type="submit"
                className="bg-purple-500 text-white py-2 px-4 w-full rounded-md hover:bg-purple-600">
                Register
              </button>
            </form>
            <div className="text-sm text-center mt-4">
              <button
                onClick={() => setIsLoginForm(true)}
                className="text-blue-600 hover:underline">
                Back to login
              </button>
            </div>
          </>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
