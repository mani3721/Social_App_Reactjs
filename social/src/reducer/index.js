import { combineReducers } from "redux";

import authReducer from  './authreducer'
import postReducer from "./PostReducer";
// import chatReducer from "./ChatUserReducer";

export const reducers=combineReducers({authReducer,postReducer})