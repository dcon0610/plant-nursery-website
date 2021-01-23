
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
  this.state = {status: '', link: ''}
}

componentDidMount () {

  console.log(this.props.auth.cart)
if (this.props.auth.isAuthenticated === false){
  const element =  <Link className="nav-link" to="/login">Login</Link>
  this.setState({status: `${this.props.auth.status}. You must be logged in to add items and view your cart. `, Link:<Link className="nav-link" to="/login">Login Now</Link>} )
}
else {this.setState({status: this.props.auth.status})}
}

  render() {
  return (
    <div className="container">
      <div> {this.state.status}{this.state.Link}</div>
      

    <table className="table table-striped">
    <thead>
      <tr>
       
        <th ><div>Plant</div> <div><button onClick={this.sort} id="1" className="btn btn-primary btn-sm">sort alphabetically</button></div></th>
        
        <th ><div>Quantity</div> <div><button onClick={this.sort} id="2" className="btn btn-primary btn-sm">sort alphabetically</button></div></th>
        <th >Cost</th>
       
      </tr>
    </thead>
    <tbody>
    { this.props.auth.cart.map(( plant, index) => (
          <TableData
        index = {index}
        name = {plant.name}
        number= {plant.number}
        cost = {plant.cost}
        // cost
        // picture url
        // 
        // location = {employee.location.city} 

          />
    ))}
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
