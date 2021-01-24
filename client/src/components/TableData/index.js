import React, {Component} from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { loginUser, reviseCart} from "./../../actions/authActions"
import { connect } from "react-redux"
import PropTypes from "prop-types";

class TableData extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
  console.log(this.props)
  console.log(this.props.children)
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
       
        <td >{this.props.auth.cart[this.props.children].name}</td>
        <td >{this.props.auth.cart[this.props.children].number}</td>
        <td > $ {this.props.auth.cart[this.props.children].cost}</td>
        <td > $ {this.props.auth.cart[this.props.children].cost*this.props.auth.cart[this.props.children].number}</td>
        <td ><button onClick={this.deletePlant} id={this.props.auth.cart[this.props.children].id}>remove from list</button></td>
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
