import React from "react";
import VerificationCodeForm from "../components/verificationCodeForm"
import thunk from "redux-thunk"
import reducers from "../store/allReducers"
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const codeVerify = (store) => {
  return (next) => {
    return (action) => {
      console.log("middlewere", store.getState());
      return next(action);
    };
  };
};

let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(codeVerify, thunk))
)

const VerificationCode = () => {

  return (
    <Provider store={store}>
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="bg-image col-md-6 d-none d-md-flex"></div>

          <div className="col-md-6 bg-light">
            <VerificationCodeForm />
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
};

export default VerificationCode;
