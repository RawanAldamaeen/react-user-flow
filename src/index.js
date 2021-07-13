import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./assets/styles/main.css";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword"
import VerificationCode from "./pages/verificationCode"
import ResetPassword from "./pages/resetPassword"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/forgetPassword" exact component={ForgetPassword} />
    <Route path="/forgetPassword/code" component={VerificationCode} />
    <Route path="/forgetPassword/reset" component={ResetPassword} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
