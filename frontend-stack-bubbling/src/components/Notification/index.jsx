import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./index.css";
import IMG_NoNotification from "../../NotificationNone.png"

let text;
let username;
let nID;
let notificationTime;

export default class Notification extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    text = props.text;
    nID = props.nID;
    notificationTime = props.notificationTime;
   

    this.state = {
      n_username:username,
      n_text:text,
      n_nID:nID,
      n_notificationTime:notificationTime,
    }
    
  }

  

  render() {    
    return (
        <nav className="navbar navbar-expand-lg navbar-light" preview-question-container>        
        <Link className="container-fluid preview-notification-container"
        to = {{
          pathname:"/Notifications",
          state: this.props
        }}
        >
        <div className="">
        <img className="notifImg" src={IMG_NoNotification} width="30"/>
          <div className="preview-username-holder"> 
            <h6>{"By " + this.state.n_username}</h6>
          </div>
          <div className="preview-notification-text">
              <h5>{this.state.n_text}</h5>
          </div>
          <div className="date-time">
            <h5>{"Posted on: " + this.state.n_notificationTime}</h5>
          </div>
          
          </div>
        </Link>
      </nav>
      
      
    );
  }
}
