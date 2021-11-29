import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./index.css";
import IMG_Notification from "../../NotificationMultiple.png"

var text = null;
var username = null;
var nID = null;
var notificationTime = null;
var notificationType = null; 

export default class Notification extends Component {
  constructor(props)
  {
    super();
    username = props.username;
    text = props.text;
    nID = props.nID;
    notificationTime = props.notificationTime;
    notificationType = props.NotificationType;
   

    this.state = {
      n_username:props.username,
      n_text:props.text,
      n_nID:props.nID,
      n_notificationTime:props.notificationTime,
      n_type:props.notificationType
    }

    //console.log(this.state.n_text);
  }

  render() {    
    return (
        <nav className={"navbar navbar-expand-lg navbar-light " + this.state.n_type} >        
        <Link className={"link-properties"}
        to = {{
          pathname:"/Notifications",
          state: this.props
        }}
        >
        <div className="notifIMG">
          <img src={IMG_Notification} width="50px"/>
        </div>

        <div className="infoContainer">
          <div className="preview-username-holder">
            <h6>NOTIFICATION</h6>
          </div>
              
          <div className="preview-question-title">
            <h3>{this.state.n_text}</h3>
          </div>
        </div>
        </Link>

      </nav>
  );
  }
}