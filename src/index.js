import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Page/Home";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


//Token https://jwt.io