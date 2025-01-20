interface AuthBarProps {
  onLoginClick: () => void; 
  onRegisterClick: () => void; 
}

const AuthBar = ({ onLoginClick, onRegisterClick }: AuthBarProps) => {
  return (
    <div className="w-full bg-blue-600 py-4 px-8 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">My App</h1>
      <div>
        <button
          onClick={onLoginClick}
          className="bg-white text-blue-600 py-2 px-4 rounded-md mr-2 hover:bg-gray-100"
        >
          Login
        </button>
        <button
          onClick={onRegisterClick}
          className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthBar;
