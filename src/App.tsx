import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Container from "./components/Container";
import { resetPassword } from "./components/Requests/Task/User/UserResetPasswordRequest";
import ProfilePage from "./components/Pages/Profile/ProfilePage";
import ProfileSettings from "./components/Pages/Profile/ProfileSettingsPage";
import { userAuth } from "./components/Hooks/User/userAuthHook";
import { useUserPasswordReset } from "./components/Hooks/User/userUpdateHook";
import { useResetPasswordLogic } from "./components/Pages/Auth/ResetPasswordLogicParent";
import SummaryContainer from "./components/Pages/Home/Sumary/SummaryContainer";
import Input from "./components/Pages/Home/Task/Input";
import TasksContainer from "./components/Pages/Home/Task/TaskContainer";
import Navbar from "./components/Pages/Navbar";
import LoginForm from "./components/Pages/Auth/LoginForm";
import RegisterForm from "./components/Pages/Auth/RegisterForm";
import ResetPasswordForm from "./components/Pages/Auth/ResetPasswordForm";
import ResetPasswordCodeForm from "./components/Pages/Auth/ResetPasswordCodeForm";
import VerifyCodeForm from "./components/Pages/Auth/VerifyCodeForm";

function App() {
  const { userLogginHook, userRegisterHook } = userAuth();
  const { resetPasswordCodeHook, verifyCodeUserHook } = resetPassword();
  const { email, setEmail } = useResetPasswordLogic();
  const { resetPasswordHook } = useUserPasswordReset();

  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/home"} replace />} />
      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                  <SummaryContainer />
                  <Container>
                    <Input />
                  </Container>
                  <TasksContainer />
                </div>
              </div>
            </div>
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Navbar />
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                  <ProfilePage />
                </div>
              </div>
            </div>
          </>
        }
      />
      <Route
        path="/profile/settings"
        element={
          <>
            <Navbar />
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                  <ProfileSettings />
                </div>
              </div>
            </div>
          </>
        }
      />
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
}

export default App;
