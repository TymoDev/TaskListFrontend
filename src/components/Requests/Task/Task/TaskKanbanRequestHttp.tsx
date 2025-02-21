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

export const updateKanbanTask = async ({
  taskId,
  taskName,
  order,
  columnId,
}: {
  taskId: string;
  taskName: string;
  order: number;
  columnId: string;
}): Promise<TaskKanbanModel> => {
  const response = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId: taskId,
      taskName: taskName,
      order: order,
      columnId: columnId,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update kanban task");
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
