import TaskItem from "./TaskItem";
import { Task } from "../../../../../Models/TasksModel";

const Tasks = ({
  tasks
}: {
  tasks: Task[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.length ? (
        tasks.map((t) => (
          <TaskItem
            key={t.id}
            id={t.id}
            taskName={t.taskName}
            taskStatus={t.taskStatus}
          />
        ))
      ) : (
        <span className="text-green-100">No tasks yet!</span>
      )}
    </div>
  );
};

export default Tasks;
