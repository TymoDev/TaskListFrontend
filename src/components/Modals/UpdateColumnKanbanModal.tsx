
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnName: string) => void;
  columnName: string;
  setColumnName: (name: string) => void;
}

export const UpdateColumnKanbanModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  columnName,
  setColumnName: setColumnName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Update Column</h2>
        <h2 className="text-lg font-bold mb-4 text-black">Update Column</h2>
        <input
          type="text"
          className="border p-2 w-full text-black"
          placeholder={columnName}
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
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
              if (columnName.trim()) {
                onSubmit(columnName);
                setColumnName("");
                onClose();
              }
            }}>
            Update Column
          </button>          
        </div>
      </div>
    </div>
  );
};
