import axios from "axios";
import { GET_SALARY_DETAILS_FAILURE, GET_SALARY_DETAILS_REQUEST, GET_SALARY_DETAILS_SUCCESS } from "./ActionTypes";
import { API_BASE_URL } from "@/Config/api";

export const getSalaryDetails = (user,navigate) => async(dispatch)=>{
    dispatch({type: GET_SALARY_DETAILS_REQUEST})
    try{
        const response = await axios.get(`${API_BASE_URL}/api/salaryDetails`,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: GET_SALARY_DETAILS_SUCCESS, payload: response.data});
    }catch(error){
        dispatch({type: GET_SALARY_DETAILS_FAILURE, payload: error.message});
    }
}