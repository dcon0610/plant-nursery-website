
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
import CardData from "../components/CardData";

class Plant extends React.Component {
render() {
console.log("props",this.props)
console.log(this.props.location.imageUrl)




  return <div className="container">
  

  <div className="card">
        <div className="row no-gutters">
            <div className="col-auto">
                <img style={{width: "50vh", height: "50vh"}} src={this.props.location.imageUrl} className="img-fluid" alt=""></img>
            </div>
            <div className="col">
                <div className="card-block px-2">
                    <h4 className="card-title">Title</h4>
                    <p className="card-text">Description Description Description Description 
                    Description Description Description Description Description Description Description Description Description 
                    Description Description Description Description Description Description Description Description Description 
                    Description Description Description Description Description </p>
                    <a href="#" className="btn btn-primary">BUTTON</a>
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

export default Plant;
