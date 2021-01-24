import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import plantReducer from "./PlantReducers";
//import cartReducer from "./cartReducer"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  plants: plantReducer
});