import React from "react";
import ReactDOM from "react-dom/client";
import RouterComp from "./router/Routes";
import { UserProvider } from "./context/Store";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <RouterComp />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);
