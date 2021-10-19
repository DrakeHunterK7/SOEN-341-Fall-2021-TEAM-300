import React, { Component } from "react";
import "./index.css";

var questiontext = "Don't worry, there are very easy-to-follow crash courses online. Make sure to learn JS first if you haven't already";

var username = "SomeUser#002";


export default class AnswerBox extends Component {
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
          </div>
        </div>
      </nav>
    );
  }
}
