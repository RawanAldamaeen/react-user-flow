import React from "react";
import LoginForm from "../components/loginForm";
import thunk from "redux-thunk";
import reducers from "../store/allReducers";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const login = (store) => {
  return (next) => {
    return (action) => {
      console.log("middlewere", store.getState());
      return next(action);
    };
  };
};

let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(login, thunk))
);

const Login = () => {
  return (
    <Provider store={store}>
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="bg-image col-md-6 d-none d-md-flex"></div>

            <div className="col-md-6 bg-light">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Login;
