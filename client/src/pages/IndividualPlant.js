
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import {Link, Redirect} from 'react-router-dom'
import { getPlants } from "./../actions/PlantsActions";
import "./IndividualPlant.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";
import { loginUser,updateCart } from "./../actions/authActions";
import PropTypes from "prop-types";
import { confirmAlert} from 'react-confirm-alert'; // Import

library.add(
    faShoppingCart
  )
  


class IndividualPlant extends React.Component {
    constructor() {
        super()
        this.state = {quantity: 1, name: true, plant: ''}

        //set up state for particular user to check if items in their cart
        
      }
    componentDidMount () {
      if (this.props.plants.plants.length===0){
        API.getPlants()
        .then(res => {
        console.log("returned plants",res.data)
        var plants = res.data
          console.log(plants[0])
        const currentPath = this.props.location.pathname.split("/").pop()
        
          let index = this.props.plants.plants.findIndex( element => {
            if (element.name === currentPath) {
              return true;
            }
          });
         
          this.setState({url: res.data[index].url})
    
      })
     

      }
      else {
      const currentPath = this.props.location.pathname.split("/").pop()
        let index = this.props.plants.plants.findIndex( element => {
            if (element.name === currentPath) {
              return true;
            }
          });
          console.log(this.props.plants.plants)
          console.log(currentPath)
          console.log(index)
        this.setState({url: this.props.plants.plants[index].url})

        } 
    }

    handleInputChange = (event) => {
        console.log(event.target.value)
        this.setState({quantity: event.target.value})
  
    }

    addToCart = () => {

        //add plant name, quantity, user to state in cart and send to database via an API call. 
        if (this.props.auth.decoded === undefined) {
          confirmAlert({
            title: ' Login',
            message: 'You must login to add to cart',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {  this.props.history.push("/login");;
                }
              },
              {
                label: 'No',
                onClick: () => {return}
              }
            ]
          });

        }
        else {
        if ((this.state.quantity >= 1) && (this.state.quantity !=='' )){
            this.setState({name: false}) 
            var timeStamp = Date.now();//the best way to create unique idsI could think of
       
            API.addToCart({
                id: timeStamp,
                user: this.props.auth.decoded.id,
                name: this.props.match.params.id,
                number: this.state.quantity,
                cost: this.props.location.data.cost
            }).then(results => {
                console.log(results)
                this.props.updateCart(this.props.auth.decoded.id)
                this.setState({name: true})
            console.log(this.props.auth)
    
    
            })
            
        }
        else {
          confirmAlert({
            title: ' Incorrect value',
            message: 'You must enter a number above zero',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {return}
              },
              {
                label: 'No',
                onClick: () => {return}
              }
            ]
          });
           }}
     
    }

render() {
  return <div className="container">
  
<div style={{height: "5vh"}}></div>
  <div className="card">
        <div className="row no-gutters">
            <div className="col-auto">
                <img style={{width: "50vh", height: "50vh"}} src={`/${this.state.url}`} className="img-fluid" alt=""></img>
            </div>
            <div className="col">
                <div className="card-block px-2">
                    <h4 className="card-title">Title</h4>
                    <h5 className="card-title">sub Title</h5>
                    <p>Price</p>
                    <div className="row">
                        <div className="col-6"><span className="padding-right">Quantity: </span><input default={1} type="Number" onChange={this.handleInputChange} placeholder="1"></input></div>
                        <div className="col-6 text-large"><button disabled={!this.state.name} onClick={this.addToCart} className="padding-cart">Add to Cart: <FontAwesomeIcon icon={faShoppingCart} /> </button></div>
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
    errors: state.errors,
    plants: state.plants
  });
  export default connect(
    mapStateToProps,
    { loginUser, updateCart, getPlants }
  )(IndividualPlant);
  
