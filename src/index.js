import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./assets/styles/main.css";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/forgetPassword" component={ForgetPassword} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
