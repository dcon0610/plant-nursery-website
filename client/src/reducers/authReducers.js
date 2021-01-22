import {
    SET_CURRENT_USER,
    USER_LOADING,
    UPDATE_CART
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    cart: [],
    status: "You are not logged in",


  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          decoded: action.payload,
          cart: action.cart,
          status: action.status
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };

      case UPDATE_CART:
        return {
          ...state,
          cart: action.cart
        };
      default:
        return state;
    }
  }