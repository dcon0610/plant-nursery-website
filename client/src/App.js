import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import IndividualPlant from "./pages/IndividualPlant";
import AdminLogin from "./pages/AdminLogin";
import { Provider } from "react-redux";
import {store, persistor} from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { getPlants } from "./actions/PlantsActions";
import "./app.css"
import {PersistGate} from 'redux-persist/integration/react'


// Check for token to keep user logged in
store.dispatch(getPlants())
if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  const status = localStorage.loginStatus
  const cart = JSON.parse(localStorage.cartContents)
  console.log("cart", cart)

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded, status, cart));
// Check for ex FTBHZHXFZFTZAQHHpired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

console.log(store)

function App() {


  return (
    <Provider store={store}>

  <Router>
    <PersistGate persistor = {persistor}>
      <div>
    
          <Nav />
          <Switch>
            
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/plants" component={Plants} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/plants/:id" component={IndividualPlant} />
            <Route exact path="/adminlogin" component={AdminLogin} />
          </Switch>
       
          <div style={{height: '10vh'}}></div>
          <Footer />
         </div>
         </PersistGate>
    </Router>
    </Provider>
  );
}

export default App;
