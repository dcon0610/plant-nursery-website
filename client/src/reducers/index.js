import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
//import cartReducer from "./cartReducer"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});