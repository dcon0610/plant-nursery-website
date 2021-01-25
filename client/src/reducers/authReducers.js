import {Link} from 'react-router-dom'
import {
    SET_CURRENT_USER,
    USER_LOADING,
    UPDATE_CART,
    REVISE_CART
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    cart: [],
    status: "You are not logged in. ",
    notLoggedIn: "You must be logged in to view your cart.",
    link: <Link className="nav-link" to="/login">Login Now</Link>



  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          decoded: action.payload,
          cart: action.cart,
          status: action.status,
          notLoggedIn: action.notLoggedIn,
          link: action.link
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

      case REVISE_CART:
        console.log("hello from the reducer")
        return {
          ...state,
          cart: action.cart
        };

      default:
        return state;
    }
  }