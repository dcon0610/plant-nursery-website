import { combineReducers } from "redux";
import {persistReducer } from 'redux-persist'
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import plantReducer from "./PlantReducers";
import storage from 'redux-persist/lib/storage'
//import cartReducer from "./cartReducer"


const persistConfig = {
    key: 'root',
    storage

}


const reducer =  combineReducers({
  auth: authReducer,
  errors: errorReducer,
  plants: plantReducer
});

export default persistReducer(persistConfig, reducer)