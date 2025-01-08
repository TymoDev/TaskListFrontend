import Container from "../../../../Container";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
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
