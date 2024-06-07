import { API_BASE_URL } from "@/Config/api";
import axios from "axios";
import { ADD_INFO_FAILURE, ADD_INFO_REQUEST, ADD_INFO_SUCCESS, CANCEL_LEAVE_FAILURE, CANCEL_LEAVE_REQUEST, CANCEL_LEAVE_SUCCESS, GET_LEAVES_FAILURE, GET_LEAVES_REQUEST, GET_LEAVES_SUCCESS, GET_LEAVE_TYPES_FAILURE, GET_LEAVE_TYPES_REQUEST, GET_LEAVE_TYPES_SUCCESS, GET_SELF_INFO_FAILURE, GET_SELF_INFO_REQUEST, GET_SELF_INFO_SUCCESS, MARK_LEAVE_FAILURE, MARK_LEAVE_REQUEST, MARK_LEAVE_SUCCESS, UPDATE_SELF_INFO_FAILURE, UPDATE_SELF_INFO_REQUEST, UPDATE_SELF_INFO_SUCCESS, UPLOAD_FILES_FAILURE, UPLOAD_FILES_REQUEST, UPLOAD_FILES_SUCCESS } from "./ActionTypes";
import { getUser } from "../Auth/Action";

export const getInfo = (user,navigate) => async(dispatch)=>{
    dispatch({type: GET_SELF_INFO_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/api/profile`,{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        if(!response.data.userInfo){
            navigate("/");
            return;
        }

        dispatch({type: GET_SELF_INFO_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
        dispatch({type: GET_SELF_INFO_FAILURE, payload: error.message});
    }
}

export const updateSelfInfo = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: UPDATE_SELF_INFO_REQUEST})
    try{

        const response = await axios.post(`${API_BASE_URL}/api/updateSelf`,data,{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        dispatch({type: UPDATE_SELF_INFO_SUCCESS, payload: response.data});
        const storedJwt = localStorage.getItem("jwt");
        if(storedJwt){
            const parsedJwt = JSON.parse(storedJwt);
            dispatch(getUser(parsedJwt));
        } 
        navigate("/profile");

    }catch(error){
        console.log(error);
        dispatch({type: UPDATE_SELF_INFO_FAILURE, payload: error.message});
    }
}

export const addInfo = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: ADD_INFO_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/api/addInfo`, data,{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        dispatch({type: ADD_INFO_SUCCESS, payload: response.data});
        const storedJwt = localStorage.getItem("jwt");
        if(storedJwt){
            const parsedJwt = JSON.parse(storedJwt);
            dispatch(getUser(parsedJwt));
        } 
        navigate("/profile");
    }catch(error){
        console.log(error);
        dispatch({type: ADD_INFO_FAILURE, payload: error.message});
    }
}

export const uploadFiles = (files,user,navigate) => async(dispatch)=>{
    dispatch({type: UPLOAD_FILES_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/api/upload`,files,{
            headers: {
                "User": JSON.stringify(user),
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch(getInfo(user));

        dispatch({type: UPLOAD_FILES_SUCCESS, payload: response.data});
        // navigate("/");
    }catch(error){
        console.log(error);
        dispatch({type: UPLOAD_FILES_FAILURE, payload: error.message});
    }
}

export const getLeaveStatus = (user,navigate) => async(dispatch)=>{
    dispatch({type: GET_LEAVES_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/api/leaveStatus`,{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        console.log(response.data);

        dispatch({type: GET_LEAVES_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
        dispatch({type: GET_LEAVES_FAILURE, payload: error.message});
    }
}

export const cancelLeave = (user,leave_id,navigate) => async(dispatch)=>{
    dispatch({type: CANCEL_LEAVE_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/api/cancelLeave`,{leave_id},{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        dispatch({type: CANCEL_LEAVE_SUCCESS, payload: response.data});
        const storedJwt = localStorage.getItem("jwt");
        if(storedJwt){
            const parsedJwt = JSON.parse(storedJwt);
            dispatch(getUser(parsedJwt));
        } 
        dispatch(getInfo(user));
        dispatch(getLeaveStatus(user));
    }catch(error){
        console.log(error);
        dispatch({type: CANCEL_LEAVE_FAILURE, payload: error.message});
    }
}

export const getLeaveTypes = (user,navigate) => async(dispatch)=>{
    dispatch({type: GET_LEAVE_TYPES_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/api/markLeave`,{
            headers: {
                "User": JSON.stringify(user),
            }
        });

        dispatch({type: GET_LEAVE_TYPES_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
        dispatch({type: GET_LEAVE_TYPES_FAILURE, payload: error.message});
    }
}

export const markLeave = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: MARK_LEAVE_REQUEST})
    try{

        const response = await axios.post(`${API_BASE_URL}/api/markLeave`,data,{
            headers:{
                "User":JSON.stringify(user)
            }
        })

        dispatch({type: MARK_LEAVE_SUCCESS, payload: response.data});
        dispatch(getInfo(user));
        navigate("/");
    }catch(error){
        console.log(error);
        dispatch({type: MARK_LEAVE_FAILURE, payload: error.message});
    }
}