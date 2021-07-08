import Types from "./types";

const initialState = {
  email: "",
  logged: false,
  err_msg: "",
  signed: false,
  pass: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        logged: true,
        email: action.email,
      };
    case Types.AUTH_FAILED:
      return {
        ...state,
        logged: false,
        err_msg: action.err_msg,
      };
    case Types.REGISTER:
      return {
        ...state,
        signed: true,
        err_msg: action.err_msg,
      };
    case Types.REGISTER_FAILED:
      return {
        ...state,
        signed: false,
        err_msg: action.err_msg,
      };
    case Types.FORGET_PASS_SUCCEESS:
      return {
        ...state,
        pass: true,
      };
    case Types.FORGET_PASS_FAILED:
      return {
        ...state,
        pass: false,
        err_msg: action.err_msg,
      };
    default:
      return state;
  }
};

export default reducer;
