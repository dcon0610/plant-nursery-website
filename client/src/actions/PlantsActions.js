
import {
 PLANTS
} from "./types";
import API from "../utils/API";
// Register User
export const getPlants = () => dispatch => {
 API.getPlants()
    .then(res => {
      const plantsShown = res.data.filter(item => item.show === true);
      const plantsNotShown = res.data.filter(item => item.show === false)

      const sortedPlantsShown = plantsShown.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1; //nameA comes first
        }
        if (nameA > nameB) {
          return 1; // nameB comes first
        }
        return 0;  // names must be equal
      });

      const sortedPlantsNotShown = plantsNotShown.sort(function(a2, b2) {
        var nameA2 = a2.name.toUpperCase(); // ignore upper and lowercase
        var nameB2 = b2.name.toUpperCase(); // ignore upper and lowercase
        if (nameA2 < nameB2) {
          return -1; //nameA comes first
        }
        if (nameA2 > nameB2) {
          return 1; // nameB comes first
        }
        return 0;  // names must be equal
      });
    
    dispatch({
      type: PLANTS,
      plants: sortedPlantsShown,
      inactivePlants: sortedPlantsNotShown
      })

    })
    .catch(err =>
      alert(err)
    );
};

