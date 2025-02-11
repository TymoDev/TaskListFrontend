import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "../Container";
import SummaryContainer from "../Pages/Home/DefaultTaskList/TaskList/Sumary/SummaryContainer";
import Input from "../Pages/Home/DefaultTaskList/TaskList/Task/Input";
import TasksContainer from "../Pages/Home/DefaultTaskList/TaskList/Task/TaskContainer";
import { Board } from "../Pages/Home/DefaultTaskList/Kanban/Board";

const TemplateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/tasklist"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <SummaryContainer />
                <Container>
                  <Input />
                </Container>
                <TasksContainer />
              </div>
            </div>
          </div>
        }
      />
      <Route path="/kanban" element={<Board />} />
    </Routes>
  );
};

export default TemplateRoutes;
