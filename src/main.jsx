import React from "react";
import ReactDOM from "react-dom/client";
import RoutesComp from "./Routes";
import { UserProvider } from "./context/Store";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <RoutesComp />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);
