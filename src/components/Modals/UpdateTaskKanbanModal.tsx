interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (columnName: string) => void;
    taskName: string;
    setTaskName: (name: string) => void;
  }
  
  export const UpdateTaskKanbanModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    taskName,
    setTaskName: setTaskName,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">Update Task</h2>
          <h2 className="text-lg font-bold mb-4 text-black">Update Task</h2>
          <input
            type="text"
            className="border p-2 w-full text-black"
            placeholder={taskName}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 px-4 py-2 mr-2 rounded"
              onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (taskName.trim()) {
                  onSubmit(taskName);
                  setTaskName("");
                  onClose();
                }
              }}>
              Update Task
            </button>
          </div>
        </div>
      </div>
    );
  };
  