import axios from 'axios';
import React, { Component} from 'react';
import Header from "../../components/Header/";
import Notification from '../../components/Notification';
import MyNavLink from "../../components/MyNavLink";
import "./index.css"


export default class Notifications extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      "NList": [],
      "NotificationsLoaded": false
    }

    
  }

  componentDidMount(){
    this.fetchNotifications();
    console.log("yes the function was called then what is the problem")
  }

  fetchNotifications(){

    const token = localStorage.getItem("access_token");

    axios
    .get("http://localhost:5000/notifications",
          {
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          }
        )
    .then((response) => {
      const stat = response.status
      if(stat === 200)
      {
        this.setState({
          NList: response.data.reverse(),
          NotificationsLoaded: true
        })
        console.log(this.state.NList);
      }
      }
    )
    .catch(error => console.log(error))
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

        {this.state.NotificationsLoaded
      ? (
          (
            this.state.NList.length==0 ? (
              <p style={noAnswerStyle}>No New Notifications</p>
            ) : (
              this.state.NList.map((notification) => 
                  <Notification 
                    qID={notification._id.questionID}
                    aID={notification._id.answerID}
                    notificationType={notification._id.type}
                  />)
                )
          )
        )
      : <p style={noAnswerStyle}>Loading Notifications.....</p>}
      </div>
    );
  }
 }

