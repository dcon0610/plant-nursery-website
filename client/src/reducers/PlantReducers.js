import { PLANTS } from "../actions/types";
const initialState = {
  plants:[]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case PLANTS:
    console.log("type called")  
    console.log(JSON.stringify(action.plants))
    return {
      plants: action.plants}
    default:
   return state
  }
}