import { ADD_INFO_FAILURE, ADD_INFO_REQUEST, ADD_INFO_SUCCESS, CANCEL_LEAVE_FAILURE, CANCEL_LEAVE_REQUEST, CANCEL_LEAVE_SUCCESS, GET_LEAVES_FAILURE, GET_LEAVES_REQUEST, GET_LEAVES_SUCCESS, GET_LEAVE_TYPES_FAILURE, GET_LEAVE_TYPES_REQUEST, GET_LEAVE_TYPES_SUCCESS, GET_SELF_INFO_FAILURE, GET_SELF_INFO_REQUEST, GET_SELF_INFO_SUCCESS, MARK_LEAVE_FAILURE, MARK_LEAVE_REQUEST, MARK_LEAVE_SUCCESS, UPDATE_SELF_INFO_FAILURE, UPDATE_SELF_INFO_REQUEST, UPDATE_SELF_INFO_SUCCESS, UPLOAD_FILES_FAILURE, UPLOAD_FILES_REQUEST, UPLOAD_FILES_SUCCESS} from "./ActionTypes"

const initialState = {
    userInfo: null,
    userEducation: null,
    userDocuments: null,
    userFiles: null,
    userLeaves: null,
    leaveTypes: null,
    loading: false,
    error: null,
}

export const InfoReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_SELF_INFO_REQUEST:
        case UPDATE_SELF_INFO_REQUEST:
        case ADD_INFO_REQUEST:
        case UPLOAD_FILES_REQUEST:
        case GET_LEAVES_REQUEST:
        case CANCEL_LEAVE_REQUEST:
        case GET_LEAVE_TYPES_REQUEST:
        case MARK_LEAVE_REQUEST:
            return {...state,loading:true,error:null};
        
        case GET_SELF_INFO_SUCCESS:
        case UPDATE_SELF_INFO_SUCCESS:
        case ADD_INFO_SUCCESS:
            return {...state,loading:false,userInfo: action.payload.userInfo, userEducation: action.payload.userEducation, userDocuments: action.payload.userDocuments, userFiles: action.payload.userFiles};

        case UPLOAD_FILES_SUCCESS:
        case CANCEL_LEAVE_SUCCESS:
        case MARK_LEAVE_SUCCESS:
            return {...state,loading:false,error:null};

        case GET_LEAVES_SUCCESS:
            return {...state, userLeaves:action.payload.leavesStatus, loading: false, error:null};

        case GET_LEAVE_TYPES_SUCCESS:
            return {...state, leaveTypes: action.payload.leaveTypes, loading:false,error:null};
        
        case GET_SELF_INFO_FAILURE:
        case UPDATE_SELF_INFO_FAILURE:
        case ADD_INFO_FAILURE:
        case UPLOAD_FILES_FAILURE:
        case GET_LEAVES_FAILURE:
        case CANCEL_LEAVE_FAILURE:
        case GET_LEAVE_TYPES_FAILURE:
        case MARK_LEAVE_FAILURE:
            return {...state, loading: false, error: action.payload.error};

        default:
            return state;
    }
}