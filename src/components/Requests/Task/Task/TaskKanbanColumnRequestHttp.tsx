import { ColumnModel, TaskKanbanModel } from "../../../Models/TaskKanbanModel";

// api/tasks.ts
const API_URL = "http://localhost:7072/api/TaskKanbanColumns";

export const fetchColumns = async (): Promise<ColumnModel[]> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch columns: ${response.statusText}`);
  }

  const backendColumns = await response.json();

  return backendColumns?.map?.((column: any) => ({
    id: column.id,
    name: column.name,
    position: column.position,
  }));
};

export const createColumn = async (task: {
  name: string;
  position: number;
}): Promise<ColumnModel> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create colimn for canban tasks");
  }
  return response.json();
};

//Previous solution need update
export const updateColumn = async ({
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

export const deleteColumn = async (id: string): Promise<{ id: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete column");
  }

  return { id };
};
