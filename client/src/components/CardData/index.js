import React from "react";
import {Link} from "react-router-dom"
import "./carddata.css"



function CardData(props) {

console.log("these are the props", props)
  return (
<div className="col-4">
<Link to={{pathname: `/${props.route}`, imageUrl: props.url}} >
<div className="card" >
  <img className="card-img-top" style={{width:"18rem", height: "18rem"}} src={props.url} alt="Card image cap"></img>
  <div className="card-body text-center">
    <h5 className="card-title">{props.name}</h5>
  </div>
</div>
</Link>
</div>
  
  );
}

export default CardData;
