import Container from "../../../../../Container";
import { RootState } from "../../../../../Redux/store";
import Summary from "./Summary";
import { useSelector } from "react-redux";
const SummaryContainer = ({
}: {
}) => {
  const todos = useSelector((state: RootState) => state.tasks);
  return (
    <Container title={"Summary"}>
        <Summary tasks={todos} />
    </Container>
  );
};

export default SummaryContainer;
