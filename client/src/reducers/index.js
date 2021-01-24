import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import PlantReducers from "./PlantReducers";
import plantReducer from "./PlantReducers"
//import cartReducer from "./cartReducer"
export default combineReducers({
  plants: PlantReducers,
  auth: authReducer,
  errors: errorReducer
});