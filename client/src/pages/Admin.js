import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux' 
import { connect } from "react-redux";
import { loginUser, logoutUser } from "./../actions/authActions";
import { getPlants } from "./../actions/PlantsActions";
import PropTypes from "prop-types";
import {useHistory} from 'react-router-dom'
import API from "../utils/API";
import { confirmAlert} from 'react-confirm-alert'; // Import
import Select from 'react-select';

function Admin () {
  const [showAddPlantState, addPlantFunction] = useState(false);
  const [showDeletePlantState, deletePlantFunction] = useState(false);
  const [showRemoveUserState, removeUserFunction] = useState(false);
  const selectedOption=''
  
  const [plantName, setPlantName] = useState('');
  const [plantList, updateAvailability] = useState('');
    const [flowerColour, setFlowerColour] = useState('');
    const [cost, setCost] = useState('');
    const [flowerSeason, setFlowerSeason] = useState('summer');
    const [url, setUrl] = useState('');
  const store = useSelector(store => store)
  const history = useHistory()


useEffect(() => {

console.log("after the update", store.auth.usertype)

}, 
[store]);
let options = [];
console.log(store.plants)
store.plants.plants.map(item =>
  options.push({label: item.name, value: item.height} ),
);
console.log("options",options)
const usertype = localStorage.getItem("usertype")

if (usertype !== "admin"){
  history.push("/")
}
const show = (event) => {
  
  switch (event.target.id) {
    case "addPlant":
     addPlantFunction(!showAddPlantState)
     setPlantName('')
     setFlowerColour('')
     setCost('')
     setUrl('')
     deletePlantFunction(false)
     removeUserFunction(false)

      break;
    case "deletePlant":
      addPlantFunction(false)
      deletePlantFunction(!showDeletePlantState)
      removeUserFunction(false)
      break;
    case "removeUser":
      addPlantFunction(false)
      deletePlantFunction(false)
      removeUserFunction(!showRemoveUserState)
      break;
    
  }

}

  	

    const handleSubmit= (e) => {
      console.log(plantName, flowerColour, cost)
      e.preventDefault();
      if (plantName ==='' || flowerColour ==='' || cost ===''){
        console.log(plantName, flowerColour, cost)
        confirmAlert({
          title: 'Incorrect Details',
          message: 'you have not entered all plant properties',
          buttons: [
            {
              label: 'Ok',
              onClick: () => {return}
            }
          ]
        });
      }
      else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Confirm Plant Details</h1>
              <p>plant name: {plantName}</p>
              <p>flower colour: {flowerColour}</p>
              <p>cost: {cost}</p>
              <p>flower season: {flowerSeason}</p>
              <p>photoName: {url}</p>
             
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  const userdata ={
                    "plantName": plantName,
                    "flowerColour": flowerColour,
                    "cost": cost,
                    "flowerSeason": flowerSeason,
                    "url": url
                  }
                 API.addPlant(userdata).then((result)=> {
                  console.log(result)
                  onClose()
                  addPlantFunction(false)
                 })
                 
                }}
              >
                Yes
              </button>
            </div>
          );
        }
      });

    }


    }

 const handleUpdate= selectedOption => {
console.log(selectedOption)
 }
  return (
    <div className="container" >
      <h2 className="text-center">Admin Actions</h2>
      <button id="addPlant" onClick={show} className="row mt-4"style={{width:"100%", fontSize:"large"}}> Click here to add a plant</button>
      {showAddPlantState && <div> 
        <form onSubmit={e => { handleSubmit(e) }}>
        <div className="row mt-2">
        <label className="col-3">Plant Name:</label>
        <br />
        <input className="col-3"
          name='plantName' 
          type='text'
          value={plantName}
          onChange={e => setPlantName(e.target.value)}
        />
        </div>
        <div className="row mt-2">
        <label className="col-3">Flower Colour:</label>
        <br />
        <input className="col-3"
          name='flowerColour' 
          type='text'
          value={flowerColour}
          onChange={e => setFlowerColour(e.target.value)}
        />
        </div>
        <div className="row mt-2">
        <label className="col-3">Cost:</label>
        <br />
        <input className="col-3"
          name='cost' 
          type='number'
          value={cost}
          onChange={e => setCost(e.target.value)}
        />
        </div>
        <div className="row mt-2">
        <label className="col-3">Name of Photo in public folder:</label>
        <br />
        <input className="col-3"
          name='url' 
          type='text'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        </div>
        <div className="row mt-2">
        <label className="col-3">Flower Season:</label>
        <br />
        <select value={flowerSeason} onChange={e => setFlowerSeason(e.target.value)}>
            <option value="summer">summer</option>
            <option value="autumn">autumn</option>
            <option value="winter">winter</option>
            <option value="spring">spring</option>
          </select>
        </div>
        <input 
          type='submit' 
          value='Add Plant' 
        />
      </form>
        
        </div>}
      <button id="deletePlant" onClick={show} className="row mt-4"style={{width:"100%", fontSize:"large"}}>Click here to remove a plant</button>
      {showDeletePlantState && <div>
      <div className="row mt-2">
        <label className="col-5 text-center my-auto"><h5>Select Plants to Remove from Sale:</h5></label>
        <br />
        <Select className="col-4" options={options} isMulti  onChange={handleUpdate}/>
        <input className="col-1" 
          type='submit' 
          value='Add Plant' 
        />
        </div>
      
        </div>}
      <button id="removeUser" onClick={show} className="row mt-4"style={{width:"100%",fontSize:"large" }}>Click here to remove a user</button>
      {showRemoveUserState && <div>show</div>}
    </div>

  );
};
Admin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  plants: state.plants
});
export default connect(
  mapStateToProps,
  { loginUser, logoutUser, getPlants}
)(Admin);
