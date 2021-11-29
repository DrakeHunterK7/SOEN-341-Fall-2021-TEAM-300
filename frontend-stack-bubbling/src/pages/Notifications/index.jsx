import axios from 'axios';
import React, { Component} from 'react';
import Header from "../../components/Header/";
import Notification from '../../components/Notification';

var text;
var username;
var nID;
var notificationTime;
var isBestAnswer;
var isQuestion;
var isAnswer;
var isPosted;
var isUpVoted;
var isDownVoted;

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    username = props.username;
    text = props.text;
    nID = props.nID;
    notificationTime = props.notificationTime;
    isBestAnswer = props.isBestAnswer;
    isQuestion = props.isQuestion;
    isAnswer = props.isAnswer;
    isPosted = props.isPosted;
    isUpVoted = props.isUpVoted;
    isDownVoted = props.isDownVoted;

    this.state = {
      n_username:username,
      n_text:text,
      n_nID:nID,
      n_notificationTime:notificationTime,
      n_isBestAnswer: false,
      n_isQuestion: false,
      n_isAnswer: false,
      n_isPosted: true,
      n_isUpVoted: false,
      n_isDownVoted: false,
      
    }

   
  }


  componentDidMount(){
    console.log('component just mounted')
    
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
        
        <div className="pagetitle">Your Notifications</div>

        {this.state.n_isPosted
      	? (
          <Notification onChange={this.handleChange}
          text = "Answer is given to your question"
          username = "me"
          nID = "1"
          notificationTime = "2020"
          />
        )
        : <br></br>
        }

        {this.state.n_isAnswer && this.state.n_isUpVoted
          ? (
            <Notification onChange={this.handleChange}
            text = "One of your answer has been upvoted"
            username = "me"
            nID = "1"
            notificationTime = "2020"
            />
          )
          : <br></br>
        }
        
        {this.state.n_isAnswer && this.state.n_isDownVoted
          ? (
            <Notification onChange={this.handleChange}
            text = "One of your answer has been downvoted"
            username = "Anas"
            nID = "1"
            notificationTime = "2020"
            />
          )
          : <br></br>
        }

        {this.state.n_isQuestion && this.state.n_isUpVoted
          ? (
            <Notification onChange={this.handleChange}
            text = "One of your question has been upvoted"
            username = "Vraj"
            nID = "1"
            notificationTime = "2020"
            />
          )
          : <br></br>
        }

        
        {this.state.n_isQuestion && this.state.n_isDownVoted
          ? (
            <Notification onChange={this.handleChange}
            text = "One of your question has been downvoted"
            username = "Vraj"
            nID = "1"
            notificationTime = "2020"
            />
          )
          : <br></br>
        }
      

      </div>
    );
  }
 }

