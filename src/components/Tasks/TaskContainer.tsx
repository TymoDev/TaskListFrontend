import Container from "../Container"; 
import Tasks from "./Tasks";  
import {Task} from "../../Models/TasksModel"



const TasksContainer = ({
  tasks,
  toggleDone,
  handleDelete,
}: {
  tasks: Task[];
  toggleDone: (id: string, done: string) => Promise<void>; 
  handleDelete: (id: string) => Promise<void>; 
  
}) => {
  return (
    <Container title={"Tasks"}>
      <Tasks tasks={tasks} toggleDone={toggleDone} handleDelete={handleDelete} />
    </Container>
  );
};

export default TasksContainer;