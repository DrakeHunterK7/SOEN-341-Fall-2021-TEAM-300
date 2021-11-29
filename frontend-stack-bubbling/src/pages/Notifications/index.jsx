import axios from 'axios';
import React, { Component} from 'react';
import Header from "../../components/Header/";
import Notification from '../../components/Notification';

var text = "APAPAPAPAP";
var username = "APAPAPAPAP";
var nID = "APAPAPAPAP";
var notificationTime = "APAPAPAPAP";


export default class Notifications extends Component {
  constructor(props) {
    super(props);
    username = props.username;
    text = props.text;
    nID = props.nID;
    notificationTime = props.notificationType;

    this.state = {
      n_username:props.username,
      n_text:props.text,
      n_nID:props.nID,
      n_notificationTime:props.notificationTime,
    }

   this.selectNotificationStyle = this.selectNotificationStyle.bind(this);

   console.log(props.text);
  }


  componentDidMount(){
    console.log('component just mounted')
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


  
  


  render() {

    const noAnswerStyle = {
			backgroundColor: 'white',
			borderRadius: "5px",
			textDecoration: "none",
			padding:"5px",
			display: "inline-block",
			border: "solid 2px black",
		}

    

    return (
      <div className="list-page-container">

        <Header />
        
        <div className="pagetitle">
          Your Notifications
        </div>

        <Notification 
          text = "Example Text"
          username = {this.state.n_username}
          nID = {this.state.n_nID}
          notificationTime = {this.state.n_notificationTime}
          notificationType = {this.selectNotificationStyle("BestAnswer")}
        />

        <Notification 
          text = "Example Text"
          username = {this.state.n_username}
          nID = {this.state.n_nID}
          notificationTime = {this.state.n_notificationTime}
          notificationType = {this.selectNotificationStyle("VoteAnswer")}
        />

        <Notification 
          text = "Example Text"
          username = {this.state.n_username}
          nID = {this.state.n_nID}
          notificationTime = {this.state.n_notificationTime}
          notificationType = {this.selectNotificationStyle("VoteQuestion")}
        />

        <Notification 
          text = "Example Text"
          username = {this.state.n_username}
          nID = {this.state.n_nID}
          notificationTime = {this.state.n_notificationTime}
          notificationType = {this.selectNotificationStyle("AnswerPosted")}
        />
        
      </div>
    );
  }
 }

