import API from "./../../utils/API";
import { confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import React, {Component} from "react";
import {  withRouter, Router, Link, Redirect } from "react-router-dom";
import "./Nav.css"
import { connect } from "react-redux";
import { loginUser, logoutUser } from "./../../actions/authActions";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import createHistory from "history/createBrowserHistory";
import Home from "./../../pages/Home.js";

const history = createHistory();


class Nav extends Component {
  constructor() {
    super();
    this.state = {redirect: null}
  }

// this.props.logoutUser()
logout =() => {
  confirmAlert({
    title: ' Logout',
    message: 'Press yes to continue, no to return.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.completeLogout()
      },
      {
        label: 'No',
        onClick: () => {return}
      }
    ]
  });
};

completeLogout = () => {
  console.log(this.props)
  this.props.logoutUser()
  


}

 
render() {
  <main>
  <Router history={history}>{<div><Nav/><Home/></div> }</Router>
</main>
  return (
    <nav className="navbar sticky-top py-0 navbar-expand-md navbar-dark navbarspecial">
    <Link className="navbar-brand" to="/"> <h3>
  <img src="/tree.jpg" height="70" width="70" alt="" className="navimage"></img>
  Green Hills Nursery 
  </h3></Link>
    
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active" style={{paddingTop: '1vh'}}>  <span>{this.props.auth.status} </span> </li>
        <li className="nav-item active">  <span style={{display: "inline-block", width: '15vw'}}>  </span> </li>
        
        <li className="nav-item active"> 
        <Link className="nav-link" to="/plants">Plants <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active">
                <Link className="nav-link" to="/seeds">Seeds <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/cart">Cart ({this.props.auth.cart.length}) <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={this.logout}>Logout</Link>
            </li>
        </ul>
        
    </div>
</nav>
    
  );
}}

Nav.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(Nav);
