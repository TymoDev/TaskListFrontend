import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({
  handleRegisterSubmit,
}: {
  handleRegisterSubmit: (username: string, email: string, password: string) => Promise<{ status: number; error?: string; }>;
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordProp, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const result = await handleRegisterSubmit(username,email, passwordProp); 
    if (result.status === 200) {
      navigate("/home");
    } else {
      console.error(result.error || "Login failed");
    }
  };
  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Create your account</h2>
         <form onSubmit={handleSubmit}>
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
          value={passwordProp}
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
          onClick={() => navigate("/login")} // Перехід до логіну
          className="text-blue-600 hover:underline"
        >
          Back to login
        </button>
      </div>
    </div>
    </div>
  );
};

export default RegisterForm;
