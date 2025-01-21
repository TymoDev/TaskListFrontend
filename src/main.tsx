import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root";
import "./index.css";
import {Provider} from "react-redux"
import store from "./components/Redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
       <Root />
    </Provider>
  </StrictMode>
);
