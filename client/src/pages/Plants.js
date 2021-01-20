
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
import Container from './../components/Container'
import CardData from "../components/CardData";


class Plants extends Component {
constructor() {
  super()
  this.state = {plantList: []}
}
componentDidMount() {
  API.getPlants()
  .then(results => {
    console.log(results.data)
      this.setState({plantList: results.data})
  

    });

}

  render() {
  return <div className="container">
      
 
    <div className="row">
    {this.state.plantList.map((plant) => (
          <CardData
        name = {plant.name}
        height = {plant.height}
        url = {plant.url}
          />
    ))}
  


  </div>
  
    </div>

  }
};

export default Plants;
