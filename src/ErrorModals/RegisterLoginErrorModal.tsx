interface ErrorModalProps {
    message: string;
    onClose: () => void;
  }
  
  const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-2 text-red-600 text-center">Error</h2>
          <p className="text-gray-800 text-center mb-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-1 px-4 rounded-md block mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ErrorModal;
  