import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import "./slideshow.css"


function slideshow() {


  const slideImages=[
    'slide1.jpg',
    'slide2.jpg',
    'slide3.jpg'
    
  ]

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  }

  return (
  
      <div>
      
          <div style={{height: '5vh'}}></div>
          <Slide style={{height: '60vh'}} {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
           
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
           
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            
          </div>
        </div>
      </Slide>
        
         </div>
   
  );
}

export default slideshow;
