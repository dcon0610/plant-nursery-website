
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TableData from "../components/TableData";
import { loginUser } from "./../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames"
import { connect } from "react-redux";

class Cart extends Component {
constructor() {
  super()
  this.state = {}
}

componentDidMount () {
  console.log(this.props)
if (this.props.auth.isAuthenticated === true){
  this.setState({status: '', Link:''} )
}
else {this.setState({status:'You must be logged in to view your cart', Link: <Link className="nav-link" to="/login">Login Now</Link> })}
}

  render() {
  return (
    <div className="container">
      <div> {this.props.auth.status}{this.props.auth.notLoggedIn}{this.props.auth.link}</div>
      

    <table className="table table-striped">
    <thead>
      <tr>
       
        <th ><div>Plant</div> <div></div></th>
        
        <th ><div>Quantity</div> <div></div></th>
        <th >Individual Cost</th>
        <th >Individual Cost</th>
        <th></th>
       
      </tr>
    </thead>
    <tbody>
    { this.props.auth.cart.map(( plant,index) => (

          <TableData>{index}
          </TableData>
          
        // cost
        // picture url
        // 
        // location = {employee.location.city}
    ))}
    <tr>
    <td></td>
    <td></td>
    <td>total cost</td>
    <td>$ {this.props.auth.cart.reduce((accumulator, currentValue) => accumulator + currentValue.cost*currentValue.number,0)}</td>
    <td></td>

    </tr>
    </tbody>
  </table>
  </div>
  )
  }
};
Cart.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Cart);
