import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Container from "./components/Container";
import Input from "./components/Input";
import useTasks from "./Hooks/tasksCrud";
import { userAuth } from "./Hooks/userAuthRequest";
import SummaryContainer from "./components/Summary/SummaryContainer";
import TasksContainer from "./components/Tasks/TaskContainer";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

function App() {
  const { tasks, loading, error, addTask, toggleTaskStatus, deleteTaskById } =
    useTasks();
  const { userLogginHook, userRegisterHook } = userAuth();

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
      <Route path="*" element={<Navigate to={"/login"} replace />} />
    </Routes>
  );
}

export default App;
