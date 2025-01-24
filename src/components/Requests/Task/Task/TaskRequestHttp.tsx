import { Task } from "../../../Models/TasksModel";
// api/tasks.ts
const API_URL = "http://localhost:7072/api/Tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  const backendTasks = await response.json();

  return backendTasks?.map?.((task: any) => ({
    id: task.id,
    taskName: task.taskName,
    taskStatus: task.taskStatus,
  }));
};

export const createTask = async (task: {
  taskName: string;
  taskStatus: string;
}): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create task"); //return task, not guid
  }
  return response.json();
};

export const updateTask = async ({
  id,
  taskName,
  taskStatus,
}: {
  id: string;
  taskName: string;
  taskStatus: string;
}): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskName: taskName,
      taskStatus: taskStatus,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  const backendResponse = await response.json();

  return backendResponse.data;
};

/*export const updateTask = async (
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
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};*/

export const deleteTask = async (id: string): Promise<{ id: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return { id }; // Повертаємо об'єкт із id
};
