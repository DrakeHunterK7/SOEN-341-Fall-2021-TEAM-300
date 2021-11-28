import axios from 'axios';
import React, { Component} from 'react';
import Header from "../../components/Header/";


export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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


      

      </div>
    );
  }
 }

