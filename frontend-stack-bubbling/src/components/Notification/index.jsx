import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./index.css";
import IMG_Notification from "../../assets/NotificationMultiple.png"
import axios from "axios";


var qID = null;
var aID = null
var notificationType = null; 

export default class Notification extends Component {
  constructor(props)
  {
    super();
    qID = props.qID;
    aID = props.aID;
    notificationType = props.NotificationType;
   

    this.state = {
      questionID: props.qID,
      answerID: props.aID,
      type:props.notificationType,
      notificationText: "",
    }

    this.selectNotificationStyle = this.selectNotificationStyle.bind(this);
    this.selectNotificationText = this.selectNotificationText.bind(this);
  }

  removeNotification()
  {
    
    const qID = this.state.questionID;
		const notifType = this.state.type;
    const aID = this.state.answerID;

    console.log(qID);
    console.log(aID);
    console.log(notifType);
    console.log("headersaff");

		const token = localStorage.getItem("access_token");
		
		axios
		  .put("http://localhost:5000/notifications", {
			question_id: qID,
			answer_id: aID,
      type: notifType
		  }, {
			headers: {
			  'Authorization' : 'Bearer ' + token
			}})
		  .then((response) => {
			
      })
		  .catch(function(error){
				if(error.response.status === 500)
				{
				//alert('You can only post answers if you are logged in!')
				}
		  })
		  		  
  }

  selectNotificationStyle(Type)
    {
    switch(Type){
      case 'BestAnswer':
        return 'BestAnswer';
      case 'VoteAnswer':
        return 'VoteAnswer';
      case 'VoteQuestion':
        return 'VoteQuestion';
      case 'AnswerPosted':
        return 'AnswerPosted';

      default:
        return 'noStyle';
    }
  }

  selectNotificationText(Type)
    {
    switch(Type){
      case 'BestAnswer':
        return 'Congratulations! Your answer has been declared Best Answer!';
      case 'VoteAnswer':
        return 'Your answer has received a new vote.';
      case 'VoteQuestion':
        return 'Your question has received a new vote.';
      case 'AnswerPosted':
        return 'You have a new answer on your question!';

      default:
        return 'noStyle';
    }
  }

  

  render() {
    this.state.notificationText = this.selectNotificationText(this.state.type)    
    return (
               
        <Link className={"link-properties"} 
        to = {{
          pathname:`/questiontemplatepage/qID=${this.state.questionID}`,
        }}
        >
        <nav className={"navbar navbar-expand-lg navbar-light " + this.state.type} onClick={this.removeNotification()}> 
        <div className="notifIMG">
          <img src={IMG_Notification} width="50px"/>
        </div>

        <div className="infoContainer">
          <div className="preview-username-holder">
            <h6>NOTIFICATION</h6>
          </div>
              
          <div className="preview-notification-text">
            <h3>{this.state.notificationText}</h3>
          </div>
        </div>
        </nav>
        </Link>

      
  );
  }
}