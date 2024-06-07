import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import { InfoReducer } from "./Info/Reducer";
import { SalaryReducer } from "./Salary/Reducer";
import { PunchReducer } from "./Punch/Reducer";
import { AdminReducer } from "./Admin/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    info: InfoReducer,
    salary: SalaryReducer,
    punch: PunchReducer,
    admin: AdminReducer,
});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))