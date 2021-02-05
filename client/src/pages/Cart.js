
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TableData from "../components/TableData";
import { loginUser } from "./../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames"
import { connect } from "react-redux";
import "braintree-web"
import axios from "axios"
import DropIn from "braintree-web-drop-in-react"

class Cart extends Component {
constructor() {
  super()
  this.state = {clientToken : null}
}

async componentDidMount () {
  try {
    // Get a client token for authorization from your server
    const response = await axios.get(
      "/api/braintree/v1/getToken"
    ).then((response) =>{
      const clientToken = response.data.clientToken

      this.setState({ clientToken: clientToken })
      console.log("test",this.props.auth)
    } )
  } catch (err) {
    console.error(err)
  }
  console.log(this.props)
if (this.props.auth.isAuthenticated === true){
  this.setState({status: '', Link:''} )
}
else {this.setState({status:'You must be logged in to view your cart', Link: <Link className="nav-link" to="/login">Login Now</Link> })}
}
async buy() {
  try {

  
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod()
    alert(nonce)
    const response = await axios.post(
      "/api/braintree/v1/sandbox",
      nonce
    )
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}
  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>)}
        else {
  return (
    <div className="container">
     {!this.props.auth.isAuthenticated && <div><p>You are not logged in. Please log in to view your cart.</p>
       <Link to="login">Login now</Link>
       </div>}
      
      <div class="table-responsive">
    <table className="table table-striped" style={{width: "100%"}}>
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
    {this.props.auth.isAuthenticated && <td>   <DropIn 
            options={{
              authorization: this.state.clientToken,
            }}
            onInstance={instance => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Buy</button></td>}

    </tr>
    </tbody>
  </table>
  </div>
  </div>
  )
  }}
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
