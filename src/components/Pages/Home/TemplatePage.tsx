import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Template {
  name: string;
  description: string;
  route: string;
  image: string;
}

const templates: Template[] = [
  {
    name: "Task List",
    description: "Organize your tasks in a simple list.",
    route: "/home/template/tasklist",
    image: "", //add photo
  },
  {
    name: "Task Kanban",
    description: "Visualize your tasks using a Kanban board.",
    route: "/home/template/kanban",
    image: "", //add photo
  },
];

export const TemplateSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Choose Your Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 relative cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(template.route)}>
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-400 mb-4">{template.description}</p>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded w-full">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
