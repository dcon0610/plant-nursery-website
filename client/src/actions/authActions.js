import "../utils/API"
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import './PlantsActions'
import {Link} from 'react-router-dom'


import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING, 
  UPDATE_CART,
  REVISE_CART,
  LOGOUT
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
export const loginUser = (userData,adminstatus) => dispatch => {
  API.login(userData)
    .then(res => {
      console.log("userdata",res)
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      // Decode token to get user data
      const decoded = jwt_decode(token)
      console.log(decoded)
      API.getUser({user: decoded.id})
    .then(result => {
  
      localStorage.setItem("usertype",result.data.usertype );
     
      // Set token to Auth header
      setAuthToken(token);
      console.log("checking API data", result.data)
      var cart = JSON.stringify(result.data.cart)
      console.log(cart)
      const usertype=result.data.usertype
      const status=`you are logged in as ${decoded.name}`
      localStorage.setItem("cartContents", cart)
      cart = JSON.parse(cart)
      localStorage.setItem("loginStatus", status)
      var notLoggedInMessage=''
      var link=''
      console.log("usertype", usertype)
      dispatch(setCurrentUser(decoded, status, cart,notLoggedInMessage, link, usertype));
        
    
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
export const setCurrentUser = ( decoded, status, cart, notLoggedInMessage, link,usertype) => {
 if (status==="You are not logged in. "){
  localStorage.removeItem("logging out");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("cartContents")
  localStorage.removeItem("loginStatus")
  return {
    type: LOGOUT,
    payload: decoded,
    cart: cart,
    status: status,
    notLoggedIn: notLoggedInMessage,
    link: link,
    usertype: usertype
  }
 }
 
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    cart: cart,
    status: status,
    notLoggedIn: notLoggedInMessage,
    link: link,
    usertype: usertype
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
  localStorage.removeItem("usertype")
  // Remove auth header for future requests
  setAuthToken(false);

  var decoded=''
  var cart=[]
  var status="You are not logged in. "
  var notLoggedInMessage = "You must log in to view your cart."
  var link = <Link className="nav-link" to="/login">Login Now</Link>
  var usertype=''


  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser(decoded, status, cart, notLoggedInMessage, link));
};