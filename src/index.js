import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./assets/styles/main.css";
import Register from "./pages/register";
import Login from "./pages/login";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
