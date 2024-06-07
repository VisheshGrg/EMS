import { GET_SALARY_DETAILS_FAILURE, GET_SALARY_DETAILS_REQUEST, GET_SALARY_DETAILS_SUCCESS } from "./ActionTypes";

const initialState = {
    earningsList: null,
    taxList: null,
    loading: false,
    error: null,
}

export const SalaryReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_SALARY_DETAILS_REQUEST:
            return {...state,loading:true,error:null};

        case GET_SALARY_DETAILS_SUCCESS:
            return {...state,earningsList: action.payload.earningsList, taxList: action.payload.taxList, loading: false, error: null};
        
        case GET_SALARY_DETAILS_FAILURE:
            return {...state, loading: false, error: action.payload.error};

        default:
            return state;
    }
}