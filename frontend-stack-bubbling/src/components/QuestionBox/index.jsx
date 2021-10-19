import React, { Component } from "react";
import "./index.css";

var questiontitle = "Does anyone know how to create web apps with REACT?";
var questiontext = "I'm just really struggling with this, it seems really overwhelming.";

var username = "SomeUser#001";


export default class QuestionBox extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid question-container">
          <div className="">
                <div className="asker-username-holder">
                  <h6>{"By " + username}</h6>
                </div>
              
                <div className="question-title">
                  <h3>{questiontitle}</h3>
                </div>
               
                <div className="question-text">
                  <h5>{questiontext}</h5>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
