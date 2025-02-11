export type TaskKanbanModel = {
  taskId: string;
  taskName: string;
  columnId: string;
  order: number;
};

export type ColumnModel = {
  id: string;
  name: string;
  position: number;
};
