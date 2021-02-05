import React, {Component} from "react";
import "./links.css"
import Link from "../linkCard";

class Links extends React.Component {
    constructor() {
        super()
        this.state = {
            linkUrl: "/plants",
            picture: "button1.jpg",
            linkText: "Browse Plants"}
        }
    

render() {
  return (
    <div   >
    
    <div className="row height vertical">
   
          <Link className="container text-center"

            linkUrl = {this.state.linkUrl}
            linkText={this.state.linkText}
            picture={this.state.picture}
          
          />
          <div className="col-7">
            <h4>Welcome to Green Hills Nursery</h4>
            <h5>We are a plant nursery located in Meadows, SA.</h5>
            <p>We specialize in drought tolerant, hardy perennials and annuals which are suited to our harsh summer
              climate. The gardens have over 100 species of plants  growing and as more plants are propagated, more 
              will be added to the site. </p>
              <p>
              To browse our current range, please click on the button to the left.
              To see more pictures of the garden, click on the instgram icon below.
            </p>

          </div>


    
    </div>
  </div>

   
    
  );
}
}

export default Links;
