import useTasks from "../../Hooks/tasksCrud";
import SummaryContainer from "../Summary/SummaryContainer";
import Container from "../Container";
import TasksContainer from "../Tasks/TaskContainer";
import Input from "../Input";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { tasks, loading, error, addTask, toggleTaskStatus, deleteTaskById } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]); 

  return error ? null : (
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
  );
};

export default Home;
