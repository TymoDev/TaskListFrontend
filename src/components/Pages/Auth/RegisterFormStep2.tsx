import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorModal from "../../Modals/ErrorModal";

interface InitialData {
    login: string;
    email: string;
    password: string;
  }

const RegisterFormStep2 = ({
  userRegisterHook,
}: {
  userRegisterHook: (data: any) => Promise<{ status: number; error?: string }>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state as InitialData;

  const [formData, setFormData] = useState({
    login: initialData.login,
    email: initialData.email,
    password: initialData.password,
    username: "",
    gender: "",
    birthday: "",
    location: "",
    description: "",
    twitterUrl: "",
    linkedInUrl: "",
    gitHubUrl: "",
    personalWebsiteUrl: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await userRegisterHook(formData);

    if (result.status === 200) {
      navigate("/home/template/tasklist");
    } else {
      setModalMessage(result.error || "Registration failed");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete your profile
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700 mb-1">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="twitterUrl"
            className="block text-sm font-medium text-gray-700 mb-1">
            Twitter URL
          </label>
          <input
            type="url"
            id="twitterUrl"
            value={formData.twitterUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="linkedInUrl"
            className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="gitHubUrl"
            className="block text-sm font-medium text-gray-700 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            id="gitHubUrl"
            value={formData.gitHubUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <label
            htmlFor="personalWebsiteUrl"
            className="block text-sm font-medium text-gray-700 mb-1">
            Personal Website URL
          </label>
          <input
            type="url"
            id="personalWebsiteUrl"
            value={formData.personalWebsiteUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 w-full rounded-md hover:bg-red-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormStep2;
