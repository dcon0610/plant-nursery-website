
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import {Link} from 'react-router-dom'
import "./IndividualPlant.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";
import { loginUser,updateCart } from "./../actions/authActions";
import PropTypes from "prop-types";

library.add(
    faShoppingCart
  )
  


class IndividualPlant extends React.Component {
    constructor() {
        super()
        this.state = {quantity: 1}
        //set up state for particular user to check if items in their cart
        
      }
    componentDidMount () {
        console.log("individual plant props", this.props)
    }

    handleInputChange = (event) => {
        console.log(event.target.value)
        if ((event.target.value > 1) && (event.target.value !=='' )){
            this.setState({quantity: event.target.value})
           
        }
        else {
            alert("Please enter a proper value")
            this.setState ({quantity: 1})}
  
    }

    addToCart = () => {
        //add plant name, quantity, user to state in cart and send to database via an API call. 
        console.log(this.state.quantity)
        API.addToCart({
            user: this.props.auth.decoded.id,
            name: this.props.match.params.id,
            number: this.state.quantity,
            cost: this.props.location.data.cost
        }).then(results => {
            console.log(results)
            this.props.updateCart(this.props.auth.decoded.id)
        console.log(this.props.auth)

        })
    }

render() {
console.log("props",this.props)
console.log(this.props.location.imageUrl)

  return <div className="container">
  
<div style={{height: "5vh"}}></div>
  <div className="card">
        <div className="row no-gutters">
            <div className="col-auto">
                <img style={{width: "50vh", height: "50vh"}} src={this.props.location.data.imageUrl} className="img-fluid" alt=""></img>
            </div>
            <div className="col">
                <div className="card-block px-2">
                    <h4 className="card-title">Title</h4>
                    <h5 className="card-title">sub Title</h5>
                    <p>Price</p>
                    <div className="row">
                        <div className="col-6"><span className="padding-right">Quantity: </span><input default="1" type="Number" onChange={this.handleInputChange} placeholder="1"></input></div>
                        <div className="col-6 text-large"><button onClick={this.addToCart} className="padding-cart">Add to Cart: <FontAwesomeIcon icon={faShoppingCart} /> </button></div>
                    </div>
                    <br></br>
                    <br></br>
                    <p className="card-text">Description Description Description Description 
                    Description Description Description Description Description Description Description Description Description 
                    Description Description Description Description Description Description Description Description Description 
                    Description Description Description Description Description </p>
                   <p></p>
                   <Link className="bottom-right" to="/plants">Go Back</Link>
                </div>
                
            </div>
        </div>
        <div className="card-footer w-100 text-muted">
            Footer stating cats are best flat. 
        </div>
  </div>
    </div>

}
};

IndividualPlant.propTypes = {
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
    { loginUser, updateCart }
  )(IndividualPlant);
  
