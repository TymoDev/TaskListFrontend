interface AddTaskButtonProps {
    columnId: string;
    onClick: (columnId: string) => void;
  }
  
  export const AddTaskButton = ({ columnId, onClick }: AddTaskButtonProps) => {
    return (
      <button
        onClick={() => onClick(columnId)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        ➕ Add Task
      </button>
    );
  };