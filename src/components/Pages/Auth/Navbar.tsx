import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Task List</div>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/home")}
            className="hover:underline text-white">
            Home
          </button>
          <button
            onClick={() => navigate("/template")}
            className="hover:underline text-white">
            Choose template
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="hover:underline text-white">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
