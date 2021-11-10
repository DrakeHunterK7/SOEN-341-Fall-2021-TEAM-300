import React, { Component } from "react";
import "./index.css";

var questiontitle;
var questiontext;
var username;
var creationTD; 


export default class QuestionBox extends Component {

  constructor(props) {
		super();
		this.state = {
		  questiontitle: props.questiontitle,
		  questiontext: props.questiontext,
		  username: props.username,
		  creationTD: props.creationTD,
		};

	  }

  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid question-container">
          <div className="">
                <div className="asker-username-holder">
                  <h6>{"By " + this.state.username}</h6>
                </div>
              
                <div className="question-title">
                  <h3>{this.state.questiontitle}</h3>
                </div>
               
                <div className="question-text">
                  <h5>{this.state.questiontext}</h5>
                </div>

                <div className="date-time">
                  <h5>{"Posted on: " + this.state.creationTD}</h5>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
