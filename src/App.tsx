import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Container from "./components/Container";
import Input from "./components/Pages/Auth/Home/Task/Input";
import { userAuth } from "./Hooks/User/userAuthHook";
import { resetPassword } from "./Requests/User/UserResetPasswordRequest";
import { useUserPasswordReset } from "./Hooks/User/userUpdateHook";
import { useResetPasswordLogic } from "./components/Pages/Auth/Auth/ResetPasswordLogicParent";
import SummaryContainer from "./components/Pages/Auth/Home/Sumary/SummaryContainer";
import TasksContainer from "./components/Pages/Auth/Home/Task/TaskContainer";
import LoginForm from "./components/Pages/Auth/Auth/LoginForm";
import ResetPasswordForm from "./components/Pages/Auth/Auth/ResetPasswordForm";
import RegisterForm from "./components/Pages/Auth/Auth/RegisterForm";
import ResetPasswordCodeForm from "./components/Pages/Auth/Auth/ResetPasswordCodeForm";
import VerifyCodeForm from "./components/Pages/Auth/Auth/VerifyCodeForm";
import Navbar from "./components/Pages/Auth/Navbar";
import ProfilePage from "./components/Pages/Profile/ProfilePage";

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
                  <ProfilePage/>
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
