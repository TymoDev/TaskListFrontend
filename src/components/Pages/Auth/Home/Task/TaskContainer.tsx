import Container from "../../../../Container";
import Tasks from "./Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserTasks } from "../../../../Redux/tasksSlice";
import { AppDispatch, RootState } from "../../../../Redux/store";
import { useNavigate } from "react-router-dom";

const TasksContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(getUserTasks()).unwrap();
        console.log("Tasks fetched successfully");
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Redirecting to login...");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <Container title={"Tasks"}>
        <div>Loading tasks...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container title={"Tasks"}>
        <div>{error}</div>
      </Container>
    );
  }

  return (
    <Container title={"Tasks"}>
      <Tasks tasks={tasks} />
    </Container>
  );
};

export default TasksContainer;
