/*import { useState } from "react";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

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

  const forms = {
    login: (
      <>
      <LoginForm
      email={email}
      passwordProp={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLoginSubmit={handleLoginSubmit}
      >
      </LoginForm>
      </>
    ),
    register: (
      <>
        <RegisterForm
        username={username}
        email={email}
        passwordProp={password}
        repeatPassword={repeatPassword}
        handleRegisterSubmit={handleRegisterSubmit}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        >
          
        </RegisterForm>
      </>
    ),
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {forms[isLogin ? "login" : "register"]}
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
*/