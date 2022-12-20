import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ShoppingListApi } from "./api/shopping-list-api/shopping-list-api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={ShoppingListApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
