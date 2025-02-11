import { useState } from "react";
import { AddKanbanTaskModal } from "../../../../Modals/AddKanbanTaskModal";
import {
  ColumnModel,
  TaskKanbanModel,
} from "../../../../Models/TaskKanbanModel";
import { Task } from "./Task";
import React from "react";

interface ColumnProps {
  column: ColumnModel;
  tasks: TaskKanbanModel[];
  onRemoveColumn?: (id: string) => void;
  onAddTask: (taskName: string, columnId: string) => void;
}

export const Column = ({
  column,
  tasks,
  onRemoveColumn,
  onAddTask,
}: ColumnProps) => {
  const [taskName, setTaskName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-80 shadow-lg border border-gray-500 flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg flex items-center">
          {column.name}{" "}
          <span className="ml-2 text-gray-400">({tasks.length})</span>
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-white">
            ⋮
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 shadow-lg rounded-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                onClick={() => alert("Редагування колонки")}>
                ✏ Edit
              </button>
              {onRemoveColumn && (
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600 text-red-400"
                  onClick={() => onRemoveColumn(column.id)}>
                  🗑 Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4 flex-grow min-h-0">
        {tasks.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center w-full">
        ➕ Add Task
      </button>

      <AddKanbanTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskName("");
        }}
        onSubmit={(name) => {
          onAddTask(name, column.id);
          setTaskName("");
          setIsModalOpen(false);
        }}
        taskName={taskName}
        setTaskName={setTaskName}
      />
    </div>
  );
};
