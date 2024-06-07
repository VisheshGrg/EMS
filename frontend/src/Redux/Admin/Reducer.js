import { ADD_SALARY_FAILURE, ADD_SALARY_REQUEST, ADD_SALARY_SUCCESS, APPROVE_LEAVE_FAILURE, APPROVE_LEAVE_REQUEST, APPROVE_LEAVE_SUCCESS, CHANGE_LEAVE_TYPES_FAILURE, CHANGE_LEAVE_TYPES_REQUEST, CHANGE_LEAVE_TYPES_SUCCESS, GET_EMP_INFO_FAILURE, GET_EMP_INFO_REQUEST, GET_EMP_INFO_SUCCESS, GET_LEAVE_REQUESTS_FAILURE, GET_LEAVE_REQUESTS_REQUEST, GET_LEAVE_REQUESTS_SUCCESS, MANAGE_LEAVE_TYPES_FAILURE, MANAGE_LEAVE_TYPES_REQUEST, MANAGE_LEAVE_TYPES_SUCCESS, REJECT_LEAVE_FAILURE, REJECT_LEAVE_REQUEST, REJECT_LEAVE_SUCCESS } from "./ActionTypes";

const initialState = {
    leaveTypes: null,
    leaveRequests: null,
    empInfo: null,
    loading: false,
    error: null,
}

export const AdminReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_SALARY_REQUEST:
        case MANAGE_LEAVE_TYPES_REQUEST:
        case CHANGE_LEAVE_TYPES_REQUEST:
        case GET_LEAVE_REQUESTS_REQUEST:
        case APPROVE_LEAVE_REQUEST:
        case REJECT_LEAVE_REQUEST:
        case GET_EMP_INFO_REQUEST:
            return {...state,loading:true,error:null};
        
        case ADD_SALARY_SUCCESS:
        case CHANGE_LEAVE_TYPES_SUCCESS:
        case APPROVE_LEAVE_SUCCESS:
        case REJECT_LEAVE_SUCCESS:
            return {...state,loading:false,error:null};
        
        case MANAGE_LEAVE_TYPES_SUCCESS:
            return {...state,leaveTypes: action.payload.leaveTypes, loading: false, error:null};

        case GET_LEAVE_REQUESTS_SUCCESS:
            return {...state, leaveRequests: action.payload.leaveRequests, loading: false, error: null};

        case GET_EMP_INFO_SUCCESS:
            return {...state, empInfo: action.payload.empInfo, loading: false, error: null};

        case ADD_SALARY_FAILURE:
        case MANAGE_LEAVE_TYPES_FAILURE:
        case CHANGE_LEAVE_TYPES_FAILURE:
        case GET_LEAVE_REQUESTS_FAILURE:
        case APPROVE_LEAVE_FAILURE:
        case REJECT_LEAVE_FAILURE:
        case GET_EMP_INFO_FAILURE:
            return {...state,loading:false,error: action.payload};

        default:
            return state;
    }
}