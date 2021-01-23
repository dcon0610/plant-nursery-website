
import API from "../utils/API";
import React, { useEffect, Component } from "react";
import CardData from "../components/CardData";
import { loginUser } from "./../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames"
import { connect } from "react-redux";

class Plants extends Component {
constructor() {
  super()
  this.state = {plantList: []}
}
componentDidMount() {
  console.log("these are the props", this.props)
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
        cost = {plant.cost}
          />
    ))}
  


  </div>
  
    </div>

  }
};
Plants.propTypes = {
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
)(Plants);
