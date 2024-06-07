import axios from "axios"
import { PUNCH_FAILURE, PUNCH_REQUEST, PUNCH_SUCCESS } from "./ActionTypes"
import { API_BASE_URL } from "@/Config/api"

export const punch = (coords,user,navigate) => async(dispatch) => {
    dispatch({type: PUNCH_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/api/punch`,coords,{
            headers: {
                "User": JSON.stringify(user),
            },
        });

        dispatch({type: PUNCH_SUCCESS, payload: response.data});
        const storedJwt = localStorage.getItem("jwt");
        if(storedJwt){
            const parsedJwt = JSON.parse(storedJwt);
            dispatch(getUser(parsedJwt));
        } 
        navigate("/");
    }catch(error){
        dispatch({type: PUNCH_FAILURE, payload: error.message});
    }
}