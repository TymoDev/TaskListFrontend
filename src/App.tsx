import AuthForm from "./components/Auth/AuthForm";
import Container from "./components/Container";
import Input from "./components/Input";
import Summary from "./components/Summary/Summary";
import Tasks from "./components/Tasks/Tasks";
import useTasks from "./Hooks/tasksCrud";
import { userAuth } from "./Hooks/userAuthRequest";


export interface Task {
  name: string;
  done: string;
  id: string;
}

function App() {
  const { tasks, loading, error, addTask, toggleTaskStatus, deleteTaskById } = useTasks();
  const { userLogginHook, userRegisterHook } = userAuth();
  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center">
        <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
          <AuthForm
            onSubmitLogin={userLogginHook}
            onSubmitRegister={userRegisterHook}
          />
          <Container title={"Summary"}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Summary tasks={tasks} />
            )}
          </Container>
          <Container>
            <Input handleSubmit={addTask} />
          </Container>
          <Container title={"Tasks"}>
            <Tasks
              tasks={tasks}
              toggleDone={toggleTaskStatus}
              handleDelete={deleteTaskById}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
