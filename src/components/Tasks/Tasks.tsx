import TaskItem from "./TaskItem";
import { Task } from "../../Models/TasksModel";
import { useEffect } from "react";
import { useTasks } from "../../Hooks/tasksCrud"; // Імпорт кастомного хука

const Tasks = ({
  tasks,
  toggleDone,
  handleDelete,
}: {
  tasks: Task[];
  toggleDone: (id: string, done: string) => void;
  handleDelete: (id: string) => void;
}) => {
  const { loadTasks } = useTasks(); // Виклик кастомного хука

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {tasks.length ? (
        tasks.map((t) => (
          <TaskItem
            key={t.id}
            id={t.id}
            name={t.name}
            done={t.done}
            toggleDone={toggleDone}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <span className="text-green-100">No tasks yet!</span>
      )}
    </div>
  );
};

export default Tasks;
