import { useDispatch } from "react-redux";

import {
  deleteUserTasks,
  updateUserTasks,
} from "../../../Redux/Slices/tasksSlice";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../Redux/store";
const TaskItem = ({
  taskName,
  taskStatus,
  id,
}: {
  taskName: string;
  taskStatus: string;
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleUpdateTask = async () => {
    try {
      await dispatch(
        updateUserTasks({
          id,
          taskName,
          taskStatus: taskStatus === "done" ? "pending" : "done",
        })
      ).unwrap();
      console.log("Task updated successfully");
    } catch (err) {
      console.error("Error updating task:", err);
      if(err == "Unauthorized")
      navigate("/auth/login");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await dispatch(deleteUserTasks(id)).unwrap();
      console.log("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      if (err == "Unauthorized") {
        navigate("/auth/login");
      }
    }
  };
  return (
    <div className="flex justify-between bg-white p-1 px-3 rounded-sm gap-4">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={taskStatus === "done"}
          onChange={handleUpdateTask}
        />
        {taskName}
      </div>
      <button
        className="bg-green-200 hover:bg-green-300 rounded-lg p-1 px-3"
        type="button"
        onClick={handleDeleteTask}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
