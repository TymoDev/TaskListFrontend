interface AddColumnButtonProps {
    onClick: () => void;
  }
  
  export const AddColumnButton = ({ onClick }: AddColumnButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        ➕ Add Column
      </button>
    );
  };