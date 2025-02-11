import React, { useState } from "react";
import { TaskKanbanModel } from "../../../../Models/TaskKanbanModel";

interface TaskProps {
  task: TaskKanbanModel;
}

export const Task = ({ task }: TaskProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              onClick={() => alert("")}
            >
              ✏ Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-600 text-red-400"
              onClick={() => alert("")}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
