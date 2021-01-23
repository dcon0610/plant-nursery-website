import React, {Component} from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { loginUser, reviseCart} from "./../../actions/authActions"
import { connect } from "react-redux"
import PropTypes from "prop-types";

class TableData extends Component {
  constructor(properties) {
    super(properties)
    this.state = properties
  }

  
 deletePlant = (event) => {
   console.log(this.props)
    confirmAlert({
      title: ' Confirm removal',
      message: 'Press yes to continue, no to cancel.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteItem(event.target.id)
        },
        {
          label: 'No',
          onClick: () => {return}
        }
      ]
    });

   

  console.log(event.target.id)
  }
   deleteItem = (id) => {
   this.props.reviseCart(this.props.auth.decoded.id, id)

  }

render() {
  return (
 
      <tr >
       
        <td >{this.state.name}</td>
        <td >{this.state.quantity}</td>
        <td > $ {this.state.cost}</td>
        <td ><button onClick={this.deletePlant} id={this.state.index}>remove from list</button></td>
      </tr>
     
    
  );
}}

TableData.propTypes = {
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
  { loginUser, reviseCart }
)(TableData);
