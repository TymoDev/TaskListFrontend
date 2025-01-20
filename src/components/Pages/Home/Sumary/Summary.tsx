import { useSelector } from "react-redux";
import { Task } from "../../../../Models/TasksModel";
import SummaryItem from "./SummaryItem";
import { RootState } from "../../../../Redux/store";

const Summary = ({}: { tasks: Task[] }) => {
  const todos = useSelector((state: RootState) => state.tasks);

  const total = todos.length;
  const pending = todos.filter((t) => t.taskStatus === "pending").length;
  const done = todos.filter((t) => t.taskStatus === "done").length;
  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
        <SummaryItem itemName={"Total"} itemValue={total} />
        <SummaryItem itemName={"To do"} itemValue={pending} />
        <SummaryItem itemName={"Done"} itemValue={done} />
      </div>
    </>
  );
};

export default Summary;
