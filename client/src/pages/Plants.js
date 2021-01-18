
import API from "../utils/API";
import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";


const Plants = () => {

  const Plants=2

    API.getPlants()
      .then(results => {
      console.log("these are the results,",results.data)
 
        });


  return (
    <div >
     {Plants}
    </div>

  );
};

export default Plants;
