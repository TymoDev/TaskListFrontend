import { FormEvent, useEffect, useState } from "react";
import Container from "./components/Container";
import Input from "./components/Input";
import Summary from "./components/Summary/Summary";
import Tasks from "./components/Tasks/Tasks";
import { fetchTasks, createTask, updateTask, deleteTask } from "./components/Tasks/TaskRequestHttp";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  name: string;
  done: string;
  id: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load task
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);
  
  // Add task
  const handleSubmit = async (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    setError(null);
  
    const guid = uuidv4();
  
    try {
      await createTask({ guid, taskName: value, taskStatus: "pending" });
      const updatedTasks = await fetchTasks(); 
      setTasks(updatedTasks); 
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  

  // Update task
  const toggleDoneTask = async (id: string, done: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id); 
   if (!taskToUpdate) return;
  
    try {
      const newStatus = done === "done" ? "pending" : "done"; 
      await updateTask(id, taskToUpdate.name, { done: newStatus });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, done: newStatus } : task
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  // Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center">
        <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
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
            <Input handleSubmit={handleSubmit} />
          </Container>
          <Container title={"Tasks"}>
            <Tasks
              tasks={tasks}
              toggleDone={toggleDoneTask}
              handleDelete={handleDeleteTask}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
