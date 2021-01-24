import "../utils/API"
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING, 
  UPDATE_CART,
  REVISE_CART
} from "./types";
import API from "../utils/API";
// Register User
export const registerUser = (userData, history) => dispatch => {
 API.register(userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateCart = (userId) => dispatch => {
  API.getUser({user: userId})
  .then(result => {
  console.log(result)
 var cart = JSON.stringify(result.data.cart)
  localStorage.setItem("cartContents", cart)
  cart = JSON.parse(cart)
  console.log("updatedcart", cart)
  dispatch({
  type: UPDATE_CART,
  cart: cart 
  })
})
}

export const reviseCart = (userId,id ) => dispatch => {
  console.log("this is the user Id",userId)
  API.reviseCart({user: userId, id: id})
  .then(result => {
   console.log(result)
 var cart = JSON.stringify(result.data.cart)
  localStorage.setItem("cartContents", cart)
  cart = JSON.parse(cart)
  console.log("updatedcart", cart)
  dispatch({
  type: REVISE_CART,
  cart: cart 
  })
})
}




// Login - get user token
export const loginUser = userData => dispatch => {
  API.login(userData)
    .then(res => {
      console.log(res)
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token)
      console.log(decoded.id)
      API.getUser({user: decoded.id})
    .then(result => {
      console.log("checking API data", result.data.cart)
      var cart = JSON.stringify(result.data.cart)
      console.log(cart)
      const status=`you are logged in as ${decoded.name}`
      localStorage.setItem("cartContents", cart)
      cart = JSON.parse(cart)
      localStorage.setItem("loginStatus", status)
      dispatch(setCurrentUser(decoded, status, cart));
    })
      // Set current user
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = (decoded, status, cart) => {

  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    cart: cart,
    status: status
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("cartContents")
  localStorage.removeItem("loginStatus")
  // Remove auth header for future requests
  setAuthToken(false);
  window.location.reload()
  var decoded=''
  var cart=[]
  var status="You are not logged in"
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser(decoded, status, cart));
};