import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./index.css";

var title;
var text;
var username;
var qID;
var creationDateAndTime;


export default class QuestionPreviewTemplate extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    title = props.title;
    text = props.text;
    qID = props.qID;
    creationDateAndTime = props.creationDateAndTime;
    
  }

  render() {    
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light" preview-question-container>        
        <Link className="container-fluid preview-question-container"
        to = {{
          pathname:"/questiontemplatepage",
          state: this.props
        }}
        >
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

                <div className="date-time">
                  <h5>{"Posted on: " + creationDateAndTime}</h5>
                </div>
          </div>
        </Link>
      </nav>
      
      
    );
  }
}
