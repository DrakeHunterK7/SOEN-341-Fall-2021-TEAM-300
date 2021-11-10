import React, { Component } from "react";
import "./index.css";

var questiontext;
var username;
var creationDateAndTime;


export default class AnswerBox extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    questiontext = props.questiontext;
    creationDateAndTime = props.creationDateAndTime;
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid answer-container">
          <div className="">
                <div className="helper-username-holder">
                  <h6>{"By " + username}</h6>
                </div>
              
                <div className="answer-title">
                  <h3>ANSWER</h3>
                </div>
               
                <div className="answer-text">
                  <h5>{questiontext}</h5>
                </div>

                <div className="date-time">
                  <h5>{"Posted on: " + creationDateAndTime}</h5>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
