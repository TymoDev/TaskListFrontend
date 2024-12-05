import { useState } from "react";

interface AuthFormProps {
  onSubmitLogin: (email: string, password: string) => Promise<{ status: number; error?: string }>;
  onSubmitRegister: (username: string, email: string, password: string) => Promise<{ status: number; error?: string }>;
}

const AuthForm = ({ onSubmitLogin, onSubmitRegister }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await onSubmitLogin(email, password);

      if (result.status !== 200) {
        throw new Error(result.error || "An unexpected error occurred.");
      }

      setEmail("");
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
      const result = await onSubmitRegister(username, email, password);

      if (result.status !== 200) {
        throw new Error(result.error || "An unexpected error occurred.");
      }


      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setErrorMessage(null);
      setIsLogin(true); 
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {isLogin ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Log in to your account</h2>
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Username or email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="bg-red-500 text-white py-2 px-4 w-full rounded-md hover:bg-red-600"
              >
                Log in
              </button>
            </form>
            <div className="text-sm text-center mt-4">
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline mr-2"
              >
                Create account
              </button>
              ·
              <a href="#" className="text-blue-600 hover:underline ml-2">
                Forgot password
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Create your account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="bg-purple-500 text-white py-2 px-4 w-full rounded-md hover:bg-purple-600"
              >
                Register
              </button>
            </form>
            <div className="text-sm text-center mt-4">
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
              >
                Back to login
              </button>
            </div>
          </>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
