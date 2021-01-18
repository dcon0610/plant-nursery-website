import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Nav.css"
function Nav() {


  return (
    <nav className="navbar sticky-top py-0 navbar-expand-md navbar-dark navbarspecial">
    <Link className="navbar-brand" to="/"> <h3>
  <img src="tree.jpg" height="70" width="70" alt="" className="navimage"></img>
  Green Hills Nursery 
  </h3></Link>
    
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active"> 
        <Link className="nav-link" to="/plants">Plants <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active">
                <Link className="nav-link" to="/seeds">Seeds <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/cart">Cart <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
        
    </div>
</nav>
    
  );
}

export default Nav;
