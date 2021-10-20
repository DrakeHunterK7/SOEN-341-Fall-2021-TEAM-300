import React, { Component } from "react";
import "./index.css";

var title;
var text;
var username;


export default class QuestionPreviewTemplate extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    title = props.title;
    text = props.text;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid preview-question-container">
          <div className="">
                <div className="preview-username-holder">
                  <h6>{"By " + username}</h6>
                </div>
              
                <div className="preview-question-title">
                  <h3>{title}</h3>
                </div>
               
                <div className="preview-question-text">
                  <h5>{text}</h5>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
