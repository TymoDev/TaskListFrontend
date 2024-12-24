import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root"; // Імпортуємо новий компонент Root
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
