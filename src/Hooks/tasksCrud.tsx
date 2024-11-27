import { useState, useEffect, FormEvent } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Requests/Task/TaskRequestHttp";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  name: string;
  done: string;
  id: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks
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
  const addTask = async (e: FormEvent<HTMLFormElement>, value: string) => {
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
  const toggleTaskStatus = async (id: string, done: string) => {
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
  const deleteTaskById = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { tasks, loading, error, addTask, toggleTaskStatus, deleteTaskById };
};

export default useTasks;
