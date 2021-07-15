import axios from "axios";
import Types from "./types";

export const userLogin = (user) => {
  return async (dispatch) => {
    const query = {
      email: user.email,
      password: user.password,
      client_id: "2",
      client_secret: "fhMZQxfVREJrII50IeN4ThIZCerdOFjxiRGu7Lc0",
    };
    const headers = {
      "accept-language": "en",
      "x-api-key": "boilerplate_react",
    };
    const request = await axios
      .post("https://boiler-stage.ibtikar.sa/api/v1/users/login", query, {
        headers,
      })
      .then((response) => {
        return dispatch({
          type: Types.LOGIN,
          logged: true,
          email: response.data.data.user.email,
        });
      })
      .catch((error) => {
        return dispatch({
          type: Types.AUTH_FAILED,
          logged: false,
          err_msg: "Your Email or Password is uncorrect",
        });
      });
  };
};

export const userRegister = (user) => {
  return async (dispatch) => {
    const query = {
      name: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword,
      mobile_number: user.phone,
    };
    const headers = {
      "x-api-key": "boilerplate_react",
    };
    const request = await axios
      .post("https://boiler-stage.ibtikar.sa/api/v1/users", query, { headers })
      .then((response) => {
        return dispatch({
          type: Types.REGISTER,
          signed: true,
        });
      })
      .catch((error) => {
        return dispatch({
          type: Types.REGISTER_FAILED,
          signed: false,
          err_msg: error.response.data.errors,
        });
      });
  };
};

export const userForgetPassword = (user) => {
  return async (dispatch) => {
    const query = {
      email: user.email,
    };
    const headers = {
      "x-api-key": "boilerplate_react",
    };
    const request = await axios
      .post(
        "https://boiler-stage.ibtikar.sa/api/v1/users/password/forget",
        query,
        { headers }
      )
      .then((response) => {
        return dispatch({
          type: Types.FORGET_PASS_SUCCEESS,
          pass: true,
          email: user.email,
        });
      })
      .catch((error) => {
        return dispatch({
          type: Types.FORGET_PASS_FAILED,
          pass: false,
          err_msg: error.response.data.errors,
        });
      });
  };
};

export const userVerifyCode = (user) => {
  const email = localStorage.getItem("email");
  return async (dispatch) => {
    const query = {
      token: user.code,
      email: email,
    };
    const headers = {
      "x-api-key": "boilerplate_react",
    };
    const request = await axios
      .post(
        "https://boiler-stage.ibtikar.sa/api/v1/users/password/validate-token",
        query,
        { headers }
      )
      .then((response) => {
        return dispatch({
          type: Types.VERIFY_SUCCESS,
          pass: true,
          token: user.code,
        });
      })
      .catch((error) => {
        return dispatch({
          type: Types.VERIFY_FAILED,
          pass: false,
          err_msg: "invalid token",
        });
      });
  };
};

export const userResetPassword = (user) => {
  const token = localStorage.getItem("code");
  const email = localStorage.getItem("email");
  return async (dispatch) => {
    const query = {
      email: email,
      token: token,
      password: user.password,
    };
    const headers = {
      "x-api-key": "boilerplate_react",
    };
    const request = await axios
      .post(
        "https://boiler-stage.ibtikar.sa/api/v1/users/password/reset",
        query,
        { headers }
      )
      .then((response) => {
        return dispatch({
          type: Types.RESET_SUCCESS,
          reset: true,
        });
      })
      .catch((error) => {
        return dispatch({
          type: Types.RESET_FAILED,
          reset: false,
          err_msg: "something wrong happen.!",
        });
      });
  };
};

export const usersList = (page) => {
  const params = {
    page: page + 1,
  };

  const headers = {
    "Accept-Language": "en",
    "x-api-key": "boilerplate_react",
  };
  return async (dispatch) => {
    const request = await axios
      .get(
        "https://boiler-stage.ibtikar.sa/api/v1/users",
        { params },
        { headers }
      )
      .then((response) => {
        return dispatch({
          type: Types.USERS_LIST,
          list: response.data.data,
          allUsers: response.data.meta.total,
        });
      });
  };
};

export const Search = (value) => {
  const params = {
    name: value,
  };
  const headers = {
    "Accept-Language": "en",
    "x-api-key": "boilerplate_react",
  };
  return async (dispatch) => {
    const request = await axios
      .get(
        "https://boiler-stage.ibtikar.sa/api/v1/users",
        { params },
        { headers }
      )
      .then((response) => {
        return dispatch({
          type: Types.USERS_LIST,
          list: response.data.data,
          allUsers: response.data.meta.total,
        });
      });
  };
};
