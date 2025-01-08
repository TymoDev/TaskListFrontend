import Container from "../../../../Container";
import Summary from "./Summary";
import { Task } from "../../../../../Models/TasksModel";
const SummaryContainer = ({
  tasks,
  loading,
  error,
}: {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}) => {
  return (
    <Container title={"Summary"}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Summary tasks={tasks} />
      )}
    </Container>
  );
};

export default SummaryContainer;
