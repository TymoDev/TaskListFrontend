import React from "react";
import { Routes, Route } from "react-router-dom";
import SummaryContainer from "../Pages/Home/Sumary/SummaryContainer";
import Input from "../Pages/Home/Task/Input";
import TasksContainer from "../Pages/Home/Task/TaskContainer";
import Container from "../Container";

const TemplateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/tasklist"
        element={
          <div className="flex justify-center m-5">
            <div className="flex flex-col items-center">
              <div className="border shadow p-10 flex flex-col gap-10 sm:w-[640px]">
                <SummaryContainer/>
                <Container>
                  <Input/>
                </Container>
                <TasksContainer
                />
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default TemplateRoutes;
