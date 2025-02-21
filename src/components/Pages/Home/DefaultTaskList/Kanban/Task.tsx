import React, { useState } from "react";
import { TaskKanbanModel } from "../../../../Models/TaskKanbanModel";
import { UpdateTaskKanbanModal } from "../../../../Modals/UpdateTaskKanbanModal";

interface TaskProps {
  task: TaskKanbanModel;
  updateTask: (taskId: string, taskName: string, order: number, columnId: string) =>  Promise<TaskKanbanModel>;
  deleteTask: (id: string) => Promise<void>
}

export const Task = ({ task, updateTask, deleteTask }: TaskProps,) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white p-2 rounded flex justify-between items-center relative">
      <span>{task.taskName}</span>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-white"
        >
          ⋮
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-700 shadow-lg rounded-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
              onClick={() => setIsUpdateTaskModalOpen(true)}
            >
              ✏ Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-600 text-red-400"
              onClick={() => deleteTask(task.taskId)}
            >
              🗑 Delete
            </button>
          </div>
        )}
         <UpdateTaskKanbanModal
            isOpen={isUpdateTaskModalOpen}
            onClose={() => {
              setIsUpdateTaskModalOpen(false);
              setTaskName("");
            }}
            onSubmit={(name) => {
              updateTask(task.taskId, taskName, task.order, task.columnId)
              setTaskName("");
              setIsUpdateTaskModalOpen(false);
            }}
            taskName={taskName}
            setTaskName={setTaskName}
          />
      </div>
    </div>
  );
};
