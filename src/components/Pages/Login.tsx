import React from "react";
import { userAuth } from "../../Hooks/userAuthRequest";
import AuthForm from "../Auth/AuthForm";


const Login: React.FC = () => {
  const { userLogginHook, userRegisterHook } = userAuth();
  
  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center">
        <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
          <AuthForm
            onSubmitLogin={userLogginHook}
            onSubmitRegister={userRegisterHook}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
