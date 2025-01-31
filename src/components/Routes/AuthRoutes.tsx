import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../Pages/Auth/LoginForm";
import RegisterFormStep1 from "../Pages/Auth/RegisterFormStep1";
import ResetPasswordForm from "../Pages/Auth/ResetPasswordForm";
import ResetPasswordCodeForm from "../Pages/Auth/ResetPasswordCodeForm";
import VerifyCodeForm from "../Pages/Auth/VerifyCodeForm";
import RegisterFormStep2 from "../Pages/Auth/RegisterFormStep2";

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
  
  userRegisterHook: (data:{
    login: string,
    email: string,
    password: string,
    username: string,
    gender: string,
    birthday: string,
    location: string,
    description: string,
    twitterUrl: string,
    linkedInUrl: string,
    gitHubUrl: string,
    personalWebsiteUrl: string
  }
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
}) => (
  <Routes>
    <Route
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
    />
    <Route
      path="/register/step1"
      element={
        <div className="flex justify-center m-5">
          <div className="flex flex-col items-center">
            <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
              <RegisterFormStep1/>
            </div>
          </div>
        </div>
      }
    />
    <Route
      path="/register/step2"
      element={
        <div className="flex justify-center m-5">
          <div className="flex flex-col items-center">
            <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
            <RegisterFormStep2
            userRegisterHook={(data:any) =>
              userRegisterHook(data)
            }
          />
            </div>
          </div>
        </div>
      }
    />
    <Route
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
    />
    <Route
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
    />
    <Route
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
    />
  </Routes>
);

export default AuthRoutes;
