import React from "react";
import UsersList from "../components/users";
import thunk from "redux-thunk";
import reducers from "../store/allReducers";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const fetchUsers = (store) => {
    return (next) => {
      return (action) => {
        console.log("middlewere", store.getState());
        return next(action);
      };
    };
  };

let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(fetchUsers, thunk))
);

const Users = () => {
  return (
    <Provider store={store}>
        <UsersList />
    </Provider>
  );
};

export default Users;
