
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
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
  <div style={{height: "5vh"}}></div>   
 
    <div className="row">
    {this.state.plantList.map((plant) => (
          <CardData
        route={`plants/${plant.name}`}
        name = {plant.name}
        height = {plant.height}
        url = {`/${plant.url}`}
          />
    ))}
  


  </div>
  
    </div>

  }
};

export default Plants;
