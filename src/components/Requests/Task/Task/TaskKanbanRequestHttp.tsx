import { TaskKanbanModel } from "../../../Models/TaskKanbanModel";

// api/tasks.ts
const API_URL = "http://localhost:7072/api/TasksKanban";

export const fetchKanbanTasks = async (): Promise<TaskKanbanModel[]> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  const backendTasks = await response.json();

  return backendTasks?.map?.((task: any) => ({
    taskId: task.taskId,
    taskName: task.taskName,
    columnId: task.columnId,
    order: task.order,
  }));
};

export const createKanbanTask = async (task: {
  taskName: string;
  columnId: string;
}): Promise<TaskKanbanModel> => {
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

//Previous solution need update
export const updateKanbanTask = async ({
  id,
  taskName,
  taskStatus,
}: {
  id: string;
  taskName: string;
  taskStatus: string;
}): Promise<TaskKanbanModel> => {
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

export const deleteKanbanTask = async (id: string): Promise<{ id: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return { id };
};
