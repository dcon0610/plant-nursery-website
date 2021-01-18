import React from "react";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./footer.css"

library.add(
  faFacebook,
  faInstagram,
)

function footer() {


  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom ">
  <div className="container p-4">

    <div className="row">
      <div className="col">
  
      </div>
      
      <div className="col text-center">
      <span className="align-top padding"> Follow us: </span>
      <span>
      <a href="https://www.instagram.com/green_hills_nursery/" target="_blank" rel="noreferrer" className=" ">
       <FontAwesomeIcon icon={faInstagram} size = '2x'/> 
      </a>
      </span>
      </div>
      <div className="col">
        Contact: 
      <a href="mailto:davecon88@gmail.com"> davecon88@gmail.com
        </a>
      </div>
      <div className="col">
      Phone: 0418660895
      </div>
     
    
    
      

    </div>
  
  </div>
 

</footer>
    
  );
}

export default footer;
