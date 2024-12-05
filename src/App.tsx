import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Container from "./components/Container";
import Input from "./components/Input";
import useTasks from "./Hooks/tasksCrud";
import { userAuth } from "./Hooks/userAuthRequest";
import SummaryContainer from "./components/Summary/SummaryContainer";
import TasksContainer from "./components/Tasks/TaskContainer";

function App() {
  const { tasks, loading, error, isAuthenticated, addTask, toggleTaskStatus, deleteTaskById } = useTasks();
  const { userLogginHook, userRegisterHook } = userAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <div className="flex justify-center m-5">
                <div className="flex flex-col items-center">
                  <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                    <SummaryContainer tasks={tasks} loading={loading} error={error} />
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
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <div className="flex justify-center m-5">
                <div className="flex flex-col items-center">
                  <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                    <AuthForm
                      onSubmitLogin={async (email, password) => {
                        const result = await userLogginHook(email, password);
                        if (result.status === 200) {
                          window.location.href = "/home";
                        }
                        return result;
                      }}
                      onSubmitRegister={userRegisterHook}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
