import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Container from "./components/Container";
import Input from "./components/Input";
import useTasks from "./Hooks/tasksCrud";
import { userAuth } from "./Hooks/userAuthProxy";
import SummaryContainer from "./components/Summary/SummaryContainer";
import TasksContainer from "./components/Tasks/TaskContainer";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import VerifyCodeForm from "./components/Auth/VerifyCodeForm";
import { resetPassword } from "./Requests/User/userResetPasswordRequest";
import { useResetPasswordLogic } from "./components/Auth/ResetPasswordLogicParent";

function App() {
  const { tasks, loading, error, addTask, toggleTaskStatus, deleteTaskById } = useTasks();
  const { userLogginHook, userRegisterHook } = userAuth();
  const { resetPasswordHook, verifyCodeUserHook } = resetPassword();
  const {email,setEmail} = useResetPasswordLogic();

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <SummaryContainer
                  tasks={tasks}
                  loading={loading}
                  error={error}
                />
                <Container>
                  <Input handleSubmit={addTask} />
                </Container>
                <TasksContainer
                  tasks={tasks}
                  toggleDone={toggleTaskStatus}
                  handleDelete={deleteTaskById}
                />
              </div>
            </div>
          </div>
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
      <Route path="*" element={<Navigate to={"/home"} replace />} />
      <Route
        path="/password/reset"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <ResetPasswordForm 
                email={email}
                setEmail={setEmail}
                resetPasswordSubmit={resetPasswordHook} 
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
                <VerifyCodeForm          
                email={email}
                onSubmit={verifyCodeUserHook} 
                />
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
