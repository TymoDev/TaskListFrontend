  import { FormEvent, useState } from "react";
  import { createUserTasks, getUserTasks } from "../../../../Redux/tasksSlice";
  import { useDispatch } from "react-redux";
  import { AppDispatch } from "../../../../Redux/store";

  const InputContainer = ({
  }: {
  }) => {
    const [newTaskName, setNewTaskName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    return (
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault(); 
          dispatch(createUserTasks({taskName:newTaskName,taskStatus:"pending"})); 
          setNewTaskName(""); 
        }}
      >
        <div className="flex flex-col">
          <label className="text-white">Enter your next task:</label>
          <input
            className="p-1 rounded-sm"
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-100 rounded-lg hover:bg-green-200 p-1"
        >
          Add task
        </button>
      </form>
    );
  };

  export default InputContainer;