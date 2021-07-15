import Types from "./types";

const initialState = {
  email: "",
  logged: false,
  err_msg: "",
  signed: false,
  pass: false,
  reset: false,
  sucess: false,
  list : [],
  allUsers:0,
  hasNext:false,
  currentPage:0
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
        email: action.email,
      };
    case Types.FORGET_PASS_FAILED:
      return {
        ...state,
        pass: false,
        err_msg: action.err_msg,
      };
    case Types.VERIFY_SUCCESS:
      return {
        ...state,
        pass: true,
        token: action.token,
      };
    case Types.VERIFY_FAILED:
      return {
        ...state,
        pass: false,
        err_msg: action.err_msg,
      };
    case Types.RESET_SUCCESS:
      return {
        ...state,
        reset: true,
      };
    case Types.RESET_FAILED:
      return {
        ...state,
        reset: false,
        err_msg: action.err_msg,
      };
    case Types.USERS_LIST:
      return {
        ...state,
        list: action.list,
        allUsers: action.allUsers,
        hasNext:action.hasNext,
        currentPage:action.currentPage
      };
    default:
      return state;
  }
};

export default reducer;
