import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { userAuthHook } from "../Hooks/User/userAuthHook";
import { resetPassword } from "../Requests/Task/User/UserResetPasswordRequest";
import { useResetPasswordLogic } from "../Pages/Auth/ResetPasswordLogicParent";
import { useUserPasswordReset } from "../Hooks/User/userUpdateHook";
import LayoutNavbar from "../Layouts/LayoutNavbar";

const AuthRoutes = lazy(() => import("../Routes/AuthRoutes"));
const ProfileRoutes = lazy(() => import("../Routes/ProfileRoutes"));
const TemplateRoutes = lazy(() => import("../Routes/TemplateRoutes"));

const AppRoutes: React.FC = () => {
  const { userLogginHook, userRegisterHook } = userAuthHook();
  const { resetPasswordCodeHook, verifyCodeUserHook } = resetPassword();
  const { email, setEmail } = useResetPasswordLogic();
  const { resetPasswordHook } = useUserPasswordReset();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<LayoutNavbar />}>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/profile/*" element={<ProfileRoutes />} />
          <Route path="/home/template/*" element={<TemplateRoutes />} />
        </Route>

        <Route element={<LayoutNavbar hideNavbar />}>
          <Route
            path="/auth/*"
            element={
              <AuthRoutes
                email={email}
                setEmail={setEmail}
                resetPasswordHook={resetPasswordHook}
                resetPasswordCodeHook={resetPasswordCodeHook}
                verifyCodeUserHook={verifyCodeUserHook}
                userLogginHook={userLogginHook}
                userRegisterHook={userRegisterHook}
              />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
