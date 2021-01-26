
import {
 PLANTS
} from "./types";
import API from "../utils/API";
// Register User
export const getPlants = () => dispatch => {
 API.getPlants()
    .then(res => {
    console.log("returned plants",res.data)
    dispatch({
      type: PLANTS,
      plants: res.data
      })

    })
    .catch(err =>
      alert(err)
    );
};

