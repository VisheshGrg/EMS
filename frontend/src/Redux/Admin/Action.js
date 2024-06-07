import axios from "axios"
import { ADD_SALARY_FAILURE, ADD_SALARY_REQUEST, ADD_SALARY_SUCCESS, APPROVE_LEAVE_FAILURE, APPROVE_LEAVE_REQUEST, APPROVE_LEAVE_SUCCESS, CHANGE_LEAVE_TYPES_FAILURE, CHANGE_LEAVE_TYPES_REQUEST, CHANGE_LEAVE_TYPES_SUCCESS, GET_EMP_INFO_FAILURE, GET_EMP_INFO_REQUEST, GET_EMP_INFO_SUCCESS, GET_LEAVE_REQUESTS_FAILURE, GET_LEAVE_REQUESTS_REQUEST, GET_LEAVE_REQUESTS_SUCCESS, MANAGE_LEAVE_TYPES_FAILURE, MANAGE_LEAVE_TYPES_REQUEST, MANAGE_LEAVE_TYPES_SUCCESS, REJECT_LEAVE_FAILURE, REJECT_LEAVE_REQUEST, REJECT_LEAVE_SUCCESS, UPDATE_EMP_INFO_FAILURE, UPDATE_EMP_INFO_REQUEST, UPDATE_EMP_INFO_SUCCESS } from "./ActionTypes"
import { API_BASE_URL } from "@/Config/api"

export const addSalary = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: ADD_SALARY_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/admin/addSalaryInfo`,data,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: ADD_SALARY_SUCCESS, payload: response.data});
        navigate("/");
    }catch(error){
        console.log(error);
        dispatch({type: ADD_SALARY_FAILURE, payload: error.message});
    }
}

export const getLeaveTypesAdmin = (user,navigate) => async(dispatch) => {
    dispatch({type: MANAGE_LEAVE_TYPES_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/admin/changeLeaveTypes`,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: MANAGE_LEAVE_TYPES_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
        dispatch({type: MANAGE_LEAVE_TYPES_FAILURE, payload: error.message});
    }
}

export const changeLeaveTypes = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: CHANGE_LEAVE_TYPES_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/admin/changeLeaveTypes`,data,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: CHANGE_LEAVE_TYPES_SUCCESS, payload: response.data});
        navigate("/");
    }catch(error){
        console.log(error);
        dispatch({type: CHANGE_LEAVE_TYPES_FAILURE, payload: error.message});
    }
}

export const getLeaveRequests = (user,navigate) => async(dispatch)=>{
    dispatch({type: GET_LEAVE_REQUESTS_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/admin/leaveRequests`,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: GET_LEAVE_REQUESTS_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
        dispatch({type: GET_LEAVE_REQUESTS_FAILURE, payload: error.message});
    }
}

export const approveLeaveRequest = (leave_id,user,navigate) => async(dispatch)=>{
    dispatch({type: APPROVE_LEAVE_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/admin/leaveRequests/approve`,{leave_id},{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: APPROVE_LEAVE_SUCCESS, payload: response.data});
        dispatch(getLeaveRequests(user));
    }catch(error){
        console.log(error);
        dispatch({type: APPROVE_LEAVE_FAILURE, payload: error.message});
    }
}

export const rejectLeaveRequest = (leave_id,user,navigate) => async(dispatch)=>{
    dispatch({type: REJECT_LEAVE_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/admin/leaveRequests/reject`,{leave_id},{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: REJECT_LEAVE_SUCCESS, payload: response.data});
        dispatch(getLeaveRequests(user));
    }catch(error){
        console.log(error);
        dispatch({type: REJECT_LEAVE_FAILURE, payload: error.message});
    }
}

export const getEmployeeInfo = (data,user,navigate) => async(dispatch) => {
    dispatch({type: GET_EMP_INFO_REQUEST})
    try{

        const response = await axios.post(`${API_BASE_URL}/admin/updateInfo/confirm`,data,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        if(!response.data.empInfo){
            navigate("/");
            return;
        }

        dispatch({type: GET_EMP_INFO_SUCCESS, payload: response.data});
        navigate("/updateEmployeeInfo");
    }catch(error){
        console.log(error);
        dispatch({type: GET_EMP_INFO_FAILURE, payload: error.message});
    }
}

export const updateEmployeeInfo = (data,user,navigate) => async(dispatch)=>{
    dispatch({type: UPDATE_EMP_INFO_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/admin/updateInfo`,data,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: UPDATE_EMP_INFO_SUCCESS, payload: response.data});
        navigate("/");
    }catch(error){
        console.log(error);
        dispatch({type: UPDATE_EMP_INFO_FAILURE, payload: error.message});
    }
}