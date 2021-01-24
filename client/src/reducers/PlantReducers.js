import { PLANTS } from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case PLANTS:
      return action.plants
    default:
      return state;
  }
}