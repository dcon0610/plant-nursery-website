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
  const history = useHistory()
  const usertype = localStorage.getItem("usertype")
  console.log(localStorage.getItem("logging out"))
  if(!localStorage.getItem("logging out")) {
  if (usertype !== "admin"){
    history.push("/adminlogin")
    confirmAlert({
      title: 'Restricted',
      message: 'you are not logged in as a admin',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            return}
        }
      ]
    });
  }}
  else {
    localStorage.removeItem("logging out")
    history.push("/plants")
  }
  const [showAddPlantState, addPlantFunction] = useState(false);
  const [showDeletePlantState, deletePlantFunction] = useState(false);
  const [showRemoveUserState, removeUserFunction] = useState(false);

  const [showDeactivateState, showDeactivateFunction] = useState(false);
  const [showActivateState, showActivateFunction] = useState(false);
  const selectedOption=''
  const [optionsToDelete, setOptionsToDelete] = useState('');
  
  const [plantName, setPlantName] = useState('');
  const [plantList, updateAvailability] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [flowerSeason, setFlowerSeason] = useState('summer');
    const [url, setUrl] = useState('');
    const [deactivated, setDeactivated] = useState([]);
    
  const store = useSelector(store => store)



useEffect(() => {

console.log("after the update", store)

}, 
[store]);
let options = [];
console.log(store.plants)
store.plants.plants.map(item =>
  options.push({label: item.name, value: item.id} ),
);
let inactiveOptions = []
store.plants.inactivePlants.map(item =>
  inactiveOptions.push({label: item.name, value: item.id} ),
);
console.log("options",options)


 

// API.getPlants()
//         .then(res => {
//           const plantsShown = res.data.filter(item => item.show === false);


//           const sortedPlants = plantsShown.sort(function(a, b) {
//             var nameA = a.name.toUpperCase(); // ignore upper and lowercase
//             var nameB = b.name.toUpperCase(); // ignore upper and lowercase
//             if (nameA < nameB) {
//               return -1; //nameA comes first
//             }
//             if (nameA > nameB) {
//               return 1; // nameB comes first
//             }
//             return 0;  // names must be equal

//         })
// // const reactivateOptions = sortedPlants.map(item =>
// //   sortedPlants.push({label: item.name, value: item.id} ),
// //);
      
    
//         console.log(options)
      
//       })
const show = (event) => {
  
  switch (event.target.id) {
    case "addPlant":
     addPlantFunction(!showAddPlantState)
     setPlantName('')
     setDescription('')
     setCost('')
     setUrl('')
     deletePlantFunction(false)
     removeUserFunction(false)
     showDeactivateFunction(false)
     showActivateFunction(false)

      break;
    case "deletePlant":
      addPlantFunction(false)
      deletePlantFunction(!showDeletePlantState)
      removeUserFunction(false)
      showDeactivateFunction(false)
     showActivateFunction(false)
      break;
    case "removeUser":
      addPlantFunction(false)
      deletePlantFunction(false)
      removeUserFunction(!showRemoveUserState)
      showDeactivateFunction(false)
     showActivateFunction(false)
      break;
      case "activatePlant":
        addPlantFunction(false)
        deletePlantFunction(false)
        removeUserFunction(false)
        showDeactivateFunction(false)
       showActivateFunction(!showActivateState)
        break;
        case "deactivatePlant":
          addPlantFunction(false)
          deletePlantFunction(false)
          removeUserFunction(false)
          showDeactivateFunction(!showDeactivateState)
         showActivateFunction(false)
          break;
    
  }

}

  	

    const handleSubmit= (e) => {
      console.log(plantName, description, cost)
      e.preventDefault();
      if (plantName ==='' || description ==='' || cost ===''){
        console.log(plantName, description, cost)
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
              <p>flower colour: {description}</p>
              <p>cost: {cost}</p>
              <p>flower season: {flowerSeason}</p>
              <p>photoName: {url}</p>
             
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  const userdata ={
                    "plantName": plantName,
                    "description": description,
                    "cost": cost,
                    "flowerSeason": flowerSeason,
                    "url": url,
                    "id": Date.now()
                  }
                 API.addPlant(userdata).then((result)=> {
                  console.log(result)
                  onClose()
                  addPlantFunction(false)
                  confirmAlert({
                    title: 'Success!',
                    message: 'you have successfully added a plant',
                    buttons: [
                      {
                        label: 'Ok',
                        onClick: () => 
                        {window.location.reload()
                          return}
                      }
                    ]
                  });
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

setOptionsToDelete(selectedOption)




 }

 const removePlant = () => {
 
  confirmAlert({
    title: 'Confirm',
    message: 'Are you sure you want to delete a plant.',
    buttons: [
      {
        label: 'Ok',
        onClick: () => 
        {
          const name = optionsToDelete.map(element =>{ return element.label})
      
          API.deletePlant({"array": name}).then((result)=> {
            console.log(result)
            
            deletePlantFunction(false)
            confirmAlert({
              title: 'Success!',
              message: 'you have successfully deleted a plant',
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => 
                  {
                    window.location.reload()
                    return}
                }
              ]
            });
           })
          
         }
      },
      {label: 'Cancel',
      onClick: () => {return}}
    ]
  });
}

const deactivatePlant = () => {
 
  confirmAlert({
    title: 'Confirm',
    message: 'Are you sure you want to deactivate plants.',
    buttons: [
      {
        label: 'Ok',
        onClick: () => 
        {
          const name = optionsToDelete.map(element =>{ return element.label})
      
          API.deactivate({"array": name}).then((result)=> {
            console.log(result)
            
            showDeactivateFunction(false)
            confirmAlert({
              title: 'Success!',
              message: 'you have deactivated plants',
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => 
                  {
                    window.location.reload()
                    return}
                }
              ]
            });
           })
          
         }
      },
      {label: 'Cancel',
      onClick: () => {return}}
    ]
  });
}

const reActivatePlant = () => {
 
  confirmAlert({
    title: 'Confirm',
    message: 'Are you sure you want to reactivate these plants.',
    buttons: [
      {
        label: 'Ok',
        onClick: () => 
        {
          const name = optionsToDelete.map(element =>{ return element.label})
      
          API.reactivate({"array": name}).then((result)=> {
            console.log(result)
            
            showActivateFunction(false)
            confirmAlert({
              title: 'Success!',
              message: 'you have successfully reactivated these plants!',
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => 
                  {
                    window.location.reload()
                    return}
                }
              ]
            });
           })
          
         }
      },
      {label: 'Cancel',
      onClick: () => {return}}
    ]
  });
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
        <label className="col-3">Description:</label>
        <br />
        <input className="col-3"
          name='description' 
          type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}
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
        <input className="col-2" 
          type='submit' 
          value='Remove Plant' 
          onClick={removePlant}
        />
        </div>
      
        </div>}

        <button id="deactivatePlant" onClick={show} className="row mt-4"style={{width:"100%", fontSize:"large"}}>Click here to deactivate plants</button>
      {showDeactivateState && <div>
      <div className="row mt-2">
        <label className="col-5 text-center my-auto"><h5>Select Plants to Deactivate:</h5></label>
        <br />
        <Select className="col-4" options={options} isMulti  onChange={handleUpdate}/>
        <input className="col-2" 
          type='submit' 
          value='Deactivate' 
          onClick={deactivatePlant}
        />
        </div>
      
        </div>}

        <button id="activatePlant" onClick={show} className="row mt-4"style={{width:"100%", fontSize:"large"}}>Click here to reactivate plants</button>
      {showActivateState && <div>
      <div className="row mt-2">
        <label className="col-5 text-center my-auto"><h5>Select Plants to reactivate:</h5></label>
        <br />
        <Select className="col-4" options={inactiveOptions} isMulti  onChange={handleUpdate}/>
        <input className="col-2" 
          type='submit' 
          value='reactivate' 
          onClick={reActivatePlant}
        />
        </div>
      
        </div>}
     
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
