import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../Redux/store";
import {
  createUserKanbanTask,
  deleteUserKanbanTask,
  getUserKanbanTasks,
  updateUserKanbanTask,
} from "../../../../Redux/Slices/kanbanTasksSlice";
import {
  createUserKanbanColumn,
  deleteUserKanbanColumn,
  getUserKanbanColumns,
  updateUserKanbanColumn,
} from "../../../../Redux/Slices/kanbanColumnsSlice";
import { Column } from "./Column";
import { ColumnModel, TaskKanbanModel } from "../../../../Models/TaskKanbanModel";

export const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tasks = useSelector((state: RootState) => state.kanbanTasks);
  const columns = useSelector((state: RootState) => state.kanbanColumns);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        await dispatch(getUserKanbanTasks()).unwrap();
        await dispatch(getUserKanbanColumns()).unwrap();
      } catch (err) {
        console.error("Failed to fetch kanban tasks:", err);
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch, navigate]);

  const handleAddTask = async (taskName: string, columnId: string) => {
    try {
      await dispatch(
        createUserKanbanTask({ taskName: taskName, columnId: columnId })
      ).unwrap();
    } catch (err) {
      console.error("Error during creating task:", err);
    }
  };
  const handleUpdateTask = async (
    taskId: string,
    taskName: string,
    order: number,
    columnId: string
  ): Promise<TaskKanbanModel> => {
    try {
      const updatedTask = await dispatch(
        updateUserKanbanTask({
          taskId,
          taskName,
          order,
          columnId,
        })
      ).unwrap();
      return updatedTask;
    } catch (err) {
      console.error("Error during updating task:", err);
      throw err;
    }
  };
  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(deleteUserKanbanTask(id)).unwrap();
    } catch (err) {
      console.error("Error during creating task:", err);
    }
  };

  const handleAddColumn = async () => {
    try {
      const lastPosition =
        columns.length > 0 ? columns[columns.length - 1].position : 0;
      await dispatch(
        createUserKanbanColumn({
          name: "New column",
          position: lastPosition + 1,
        })
      ).unwrap();
    } catch (err) {
      console.error("Error during creating column:", err);
    }
  };
  const handleUpdateColumn = async (
    id: string,
    columnName: string,
    position: number
  ): Promise<ColumnModel> => {
    try {
      const lastPosition =
        columns.length > 0 ? columns[columns.length - 1].position : 0;
      const updatedColumn = await dispatch(
        updateUserKanbanColumn({
          id: id,
          columnName: columnName,
          columnPosition: position,
        })
      ).unwrap();
      return updatedColumn;
    } catch (err) {
      console.error("Error during creating column:", err);
      throw err;
    }
  };

  const handleRemoveColumn = async (columnId: string) => {
    try {
      await dispatch(deleteUserKanbanColumn(columnId)).unwrap();
    } catch (err) {
      console.error("Error during deleting column:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex gap-4 p-4 overflow-x-auto bg-gray-900 min-h-screen text-white items-start">
      {columns.map((col) => (
        <Column
          key={col.id}
          column={col}
          tasks={tasks.filter((task) => task.columnId === col.id)}
          onAddTask={handleAddTask}
          onRemoveColumn={handleRemoveColumn}
          onUpdateTask={handleUpdateTask}
          onUpdateColumn={handleUpdateColumn}
          onDeleteTask={handleDeleteTask}
        />
      ))}
      <button
        onClick={handleAddColumn}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center h-fit">
        ➕ Add Board
      </button>
    </div>
  );
};
