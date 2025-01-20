import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "../Pages/Auth/LoginForm";
import RegisterForm from "../Pages/Auth/RegisterForm";
import ResetPasswordForm from "../Pages/Auth/ResetPasswordForm";
import ResetPasswordCodeForm from "../Pages/Auth/ResetPasswordCodeForm";
import VerifyCodeForm from "../Pages/Auth/VerifyCodeForm";

interface AuthRoutesProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  resetPasswordHook: (email: string, password: string) => void;
  resetPasswordCodeHook: (
    email: string
  ) => Promise<{ status: number; error?: string }>;
  verifyCodeUserHook: (
    email: string,
    code: number
  ) => Promise<{ status: number; error?: string }>;
  userLogginHook: (
    email: string,
    password: string
  ) => Promise<{ status: number; error?: string }>;
  userRegisterHook: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ status: number; error?: string }>;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({
  email,
  setEmail,
  resetPasswordHook,
  resetPasswordCodeHook,
  verifyCodeUserHook,
  userLogginHook,
  userRegisterHook,
}) => [
  <Route
    key="login"
    path="/login"
    element={
      <div className="flex justify-center m-5">
        <div className="flex flex-col items-center">
          <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <LoginForm handleLoginSubmit={userLogginHook} />
          </div>
        </div>
      </div>
    }
  />,
  <Route
    key="register"
    path="/register"
    element={
      <div className="flex justify-center m-5">
        <div className="flex flex-col items-center">
          <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <RegisterForm handleRegisterSubmit={userRegisterHook} />
          </div>
        </div>
      </div>
    }
  />,
  <Route
    key="password-reset"
    path="/password/reset"
    element={
      <div className="flex justify-center m-5">
        <div className="flex flex-col items-center">
          <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <ResetPasswordForm
              email={email}
              resetPasswordSubmit={resetPasswordHook}
            />
          </div>
        </div>
      </div>
    }
  />,
  <Route
    key="password-code"
    path="/password/code"
    element={
      <div className="flex justify-center m-5">
        <div className="flex flex-col items-center">
          <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <ResetPasswordCodeForm
              email={email}
              setEmail={setEmail}
              resetPasswordSubmit={resetPasswordCodeHook}
            />
          </div>
        </div>
      </div>
    }
  />,
  <Route
    key="verify-code"
    path="/verify/code"
    element={
      <div className="flex justify-center m-5">
        <div className="flex flex-col items-center">
          <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <VerifyCodeForm email={email} onSubmit={verifyCodeUserHook} />
          </div>
        </div>
      </div>
    }
  />,
];

export default AuthRoutes;
