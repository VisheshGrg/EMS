import { API_BASE_URL } from "@/Config/api";
import axios from "axios";
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

export const register = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.message });
    navigate("/login");
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const login = (data, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    if (response.data.jwt) {
      localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      navigate("/");
    } else {
      navigate("/login");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const getUser = (jwt, navigate) => async (dispatch) => {
  dispatch({ type: GET_INFO_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/getInfo`, {
      headers: {
        Authorization: JSON.stringify(jwt),
      },
    });

    dispatch({ type: GET_INFO_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_INFO_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};

export const sendOTP = (email, navigate) => async (dispatch) => {
  dispatch({ type: SEND_OTP_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login/forgetPasswordEmail`,
      email
    );

    dispatch({ type: SEND_OTP_SUCCESS, payload: response.data });
    if (response.data.email) {
      navigate("/verifyOTP");
    } else {
      navigate("/verifyEmail");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: SEND_OTP_FAILURE, payload: error.message });
  }
};

export const sendOTPLogin = (email, navigate) => async (dispatch) => {
  dispatch({ type: SEND_OTP_LOGIN_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login/loginOTPEmail`,
      email
    );

    dispatch({ type: SEND_OTP_LOGIN_SUCCESS, payload: response.data });
    if (response.data.email) {
      navigate("/verifyOTP");
    } else {
      navigate("/verifyEmail");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: SEND_OTP_LOGIN_FAILURE, payload: error.message });
  }
};

export const verifyOTP = (data, navigate) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/login/verifyOTP`, data);

    if (response.data.status == "N") {
      navigate("/verifyEmail");
    }

    dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
    if (response.data.jwt) {
      localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
      navigate("/");
    } else {
      navigate("/resetPassword");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: VERIFY_OTP_FAILURE, payload: response.data });
  }
};

export const resetPassword = (data, navigate) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login/resetPassword`,
      data
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
  }
};
