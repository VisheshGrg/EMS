import {
  GET_INFO_FAILURE,
  GET_INFO_REQUEST,
  GET_INFO_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_OTP_FAILURE,
  SEND_OTP_LOGIN_FAILURE,
  SEND_OTP_LOGIN_REQUEST,
  SEND_OTP_LOGIN_SUCCESS,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "./ActionTypes";

const initialState = {
  jwt: null,
  user: null,
  email: null,
  authCode: null,
  funcType: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_INFO_REQUEST:
    case SEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case SEND_OTP_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null };

    case LOGIN_SUCCESS:
      return { ...state, jwt: action.payload.jwt, loading: false, error: null };

    case GET_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case SEND_OTP_SUCCESS:
    case SEND_OTP_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        authCode: action.payload.authCode,
        funcType: action.payload.type,
        loading: false,
        error: null,
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        jwt: action.payload.jwt,
        email: action.payload.email,
        authCode: null,
        funcType: null,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_INFO_FAILURE:
    case SEND_OTP_FAILURE:
    case VERIFY_OTP_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case SEND_OTP_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...state, jwt: null, user: null, loading: false, error: null };

    default:
      return state;
  }
};
