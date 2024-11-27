// api/tasks.ts
import { Task } from "../../App";

const API_URL = "https://localhost:7072/api/Task";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  const backendTasks = await response.json();

  return backendTasks.map((task: any) => ({
    id: task.id,
    name: task.taskName,
    done: task.taskStatus,
  }));
};

export const createTask = async (task: {
  guid: string;
  taskName: string;
  taskStatus: string;
}): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
};

export const updateTask = async (
  id: string,
  name: string,
  updatedData: { done: string }
): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskName: name,
      taskStatus: updatedData.done,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json(); // Повертаємо оновлену задачу
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
