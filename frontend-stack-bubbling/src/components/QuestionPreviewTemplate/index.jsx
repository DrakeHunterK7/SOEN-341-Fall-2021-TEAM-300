import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./index.css";

var title;
var text;
var username;
var qID;
var creationDateAndTime;
var voteCount;


export default class QuestionPreviewTemplate extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    title = props.title;
    text = props.text;
    qID = props.qID;
    creationDateAndTime = props.creationDateAndTime;
    voteCount = props.voteCount;

    this.state = {
      q_username:username,
      q_title:title,
      q_text:text,
      q_qID:qID,
      q_creationDateAndTime:creationDateAndTime,
      q_voteCount: voteCount,
    }
    
  }

 

  render() {    
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light" preview-question-container>        
        <Link className="container-fluid preview-question-container"
        to = {{
          pathname:`/questiontemplatepage/qID=${this.state.q_qID}`,
          
        }}
        >
          <div className="">
                <div className="preview-username-holder">
                  <h6>{"By " + this.state.q_username}</h6>
                </div>
              
                <div className="preview-question-title">
                  <h3>{this.state.q_title}</h3>
                </div>
               
                <div className="preview-question-text">
                  <h5>{this.state.q_text}</h5>
                </div>

                <div className="date-time">
                  <h5>{"Answers: " + this.state.q_voteCount}</h5>
                </div>

                <div className="date-time">
                  <h5>{"Posted on: " + this.state.q_creationDateAndTime}</h5>
                </div>

                
          </div>
        </Link>
      </nav>
      
      
    );
  }
}
