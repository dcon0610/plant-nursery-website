import React, {Component} from "react";
import "./links.css"
import Link from "../linkCard";

class Links extends React.Component {
    constructor() {
        super()
        this.state = {test: [
            {
            linkUrl: "/plants",
            picture: "button1.jpg",
            linkText: "Browse Plants"}, 
            {
            linkUrl: "/seeds",
            picture: "button2.jpg",
            linkText: "Browse Seeds"}, 
            {
            linkUrl: "/resources",
            picture: "button3.jpg",
            linkText: "Resources"}, 
        ]}
    }

render() {
  return (
    <div className="container text-center"  >
    
    <div className="row height vertical">
    {this.state.test.map(( x) => (
          <Link 

            linkUrl = {x.linkUrl}
            linkText={x.linkText}
            picture={x.picture}
          
          />

    ))}
    </div>
  </div>

   
    
  );
}
}

export default Links;
