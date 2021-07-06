import React, { useState } from "react";
import LoginForm from "../components/loginForm"

const Login = () => {

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex"></div>

          <div className="col-md-6 bg-light">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
