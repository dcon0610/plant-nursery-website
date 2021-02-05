import { PLANTS } from "../actions/types";
const initialState = {
  plants:[],
  inactivePlants:[]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case PLANTS:
    console.log("type called")  
    
    return {
      plants: action.plants,
      inactivePlants: action.inactivePlants}
    default:
   return state
  }
}