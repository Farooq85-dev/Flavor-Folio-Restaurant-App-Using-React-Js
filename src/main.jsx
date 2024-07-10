import React from "react";
import ReactDOM from "react-dom/client";
import RouterComp from "./router/Routes";
import { UserProvider } from "./context/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterComp />
    </UserProvider>
  </React.StrictMode>
);
