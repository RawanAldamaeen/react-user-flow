import Types from "./types"

const initialState = {
    email : "",
    logged : false,
    err_msg : "",
}

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case Types.LOGIN:
            return{
            ...state,
            logged: true,
            email: action.email
            }
        case Types.AUTH_FAILED:
            return{
            ...state,
            logged : false,
            err_msg: action.err_msg
            }    
        default:
            return state    
    }
}

export default reducer;
