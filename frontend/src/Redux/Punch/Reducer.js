import { PUNCH_FAILURE, PUNCH_REQUEST, PUNCH_SUCCESS } from "./ActionTypes";

const initialState = {
    loading: false,
    error: null,
}

export const PunchReducer = (state=initialState,action) => {
    switch(action.type){
        case PUNCH_REQUEST:
            return {...state,loading:true,error:null};
        
        case PUNCH_SUCCESS:
            return {...state,loading:false,error:null};
        
        case PUNCH_FAILURE:
            return {...state, loading: false, error: action.payload.error};

        default:
            return state;
    }
}