import React from "react";
import {Link} from "react-router-dom";
import "./link.css";

function linkCard (props) {

  
  return(
    
    <div className="col-4 text-center">
        <div className="card">
        <Link to ={props.linkUrl}>
        <img className="card-img-top" src={props.picture} alt="Card image cap"></img>
        </Link>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.content}</p>
                    <Link to={props.linkUrl} className="btn btn-primary">{props.linkText}</Link>
            </div>
        </div>
    </div>


  )
}

export default linkCard;
