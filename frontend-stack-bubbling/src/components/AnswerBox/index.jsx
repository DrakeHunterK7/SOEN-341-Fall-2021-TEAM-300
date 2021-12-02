import React, { Component, useState, useRef } from "react";
import "./index.css";
import UpvoteImg from "../../assets/NormalUpvote.png"
import UpvoteHoverImg from "../../assets/UpvoteHover.png"
import UpvotedImg from "../../assets/Upvoted.png"
import DownvoteImg from "../../assets/NormalDownvote.png"
import DownvoteHoverImg from "../../assets/DownvoteHover.png"
import DownvotedImg from "../../assets/Downvoted.png"
import BestAnswerImg from "../../assets/BestAnswerNormal.png"
import axios from "axios";

let username = null;
let answertext = null;
let creationDateAndTime = null;
let voteCount = null;
let isBestAnswer = null;
let answerID = null;
let questionID = null;
let userID = null;
let isQuestionOwner = null;



export default class AnswerBox extends Component {
  

  constructor(props)
  {
    
    super(props);
    username=props.username;
    answertext=props.answertext;
    creationDateAndTime=props.creationDateAndTime;
    voteCount=props.voteCount;
    isBestAnswer=props.isBestAnswer;
    answerID = props.answerID;
    questionID = props.questionID;
    userID = props.userID;
    isQuestionOwner=props.isQuestionOwner;
      
    this.state = {
      uusername:props.username,
      uanswertext:props.answertext,
      ucreationDateAndTime:props.creationDateAndTime,
      uvoteCount:props.voteCount,
      uIsBestAnswer:props.isBestAnswer,
      uAnswerID:props.answerID,
      uQuestionID:props.questionID,
      uUserID:props.userID,
      uIsQuestionOwner:props.isQuestionOwner,
      isUpvoted:false,
      isUpvoteHovering:false,
      isDownvoted:false,
      isDownvoteHovering:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBestAnswer = this.setBestAnswer.bind(this);
    this.voteAnswer = this.voteAnswer.bind(this);

  }



  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  setBestAnswer(e){
    const token = localStorage.getItem("access_token");
    const uid = this.state.uQuestionID;
    const aid = this.state.uAnswerID;
    console.log("bonggggg");
    console.log(uid);
    console.log(aid);
    
    e.preventDefault();
    axios
      .post("http://localhost:5000/declarebestanswer", {
        question_id: uid,
        answer_id: aid,
      }, {
        headers: {
          'Authorization' : 'Bearer ' + token
        }})
      .then((response) => {
        const res = response.status;
        if(res === 400)
        {
          console.log(res);
        }
        else if(res === 201)
        {
          window.location.reload(true);
        }
        else if(res == 200)
        {
          alert(response.data.message)
        }
      })
      .catch(function(error){
        console.log(error.response);
				if(error.response.status === 500)
				{
				alert(error.response.data.message)
				}
		  })
  }

  voteAnswer(isUpvote)
  {
    console.log('Voted!');
    const token = localStorage.getItem("access_token");
    const uid = this.state.uQuestionID;
    const aid = this.state.uAnswerID;

    axios
      .post("http://localhost:5000/voteanswer", {
        question_id: uid,
        answer_id: aid,
        is_upvote: isUpvote
      }, {
        headers: {
          'Authorization' : 'Bearer ' + token
        }})
      .then((response) => {
        console.log(response);
        const res = response.status;
        if(res === 400)
        {
          console.log(res);
        }
        else if(res === 201)
        {
          console.log(res);
        }
      })
      .catch(function(error){
        console.log(error.response);
				if(error.response.status === 500)
				{
				alert('You can only interact with answers if you are logged in!')
				}
		  })



  }




  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        {this.state.uIsBestAnswer ? 
        
            (
              <div className="container-fluid best-answer-container">
                <div className="voteCountContainer">
                  <div className="upvoteButton">
                     <img 
                        className="upvoteButtonIMG" 
                          onMouseOver = {(e) => { e.preventDefault();
                          this.setState({isUpvoteHovering:true})
                        }} 
                          onMouseLeave = {(e) => {
                          this.setState({isUpvoteHovering:false})
                        }} 
                          onClick = { (e) => {
                          const vc = this.state.uvoteCount;
                          if(!this.state.isUpvoted)
                          {
                            this.voteAnswer("True");
                            this.setState({
                              
                            uvoteCount: vc+1,
                            isDownvoted:false,                    
                            isUpvoted:true,                  
                            })                  
                          }
                          else
                          {
                            this.voteAnswer("True");
                            this.setState({      
                            uvoteCount: this.props.voteCount,              
                            isUpvoted:false,                
                            })                
                          } 
                        }}
            src={this.state.isUpvoted ? UpvotedImg : (this.state.isUpvoteHovering ? UpvoteHoverImg : UpvoteImg)}/>
            </div>

            <div className="voteCountBox">
              <h3>{this.state.uvoteCount}</h3>
            </div>

            <div className="downvoteButton">
            <img 
            className="downvoteButtonIMG"
            onMouseOver = {(e) => {              
              this.setState({isDownvoteHovering:true})                
            }} 
            onMouseLeave = {(e) => {              
              this.setState({isDownvoteHovering:false})               
            }} 
            onClick = { (e) => {
              const vc = this.state.uvoteCount;
              if(!this.state.isDownvoted)
                {
                  this.voteAnswer("False");
                  this.setState({
                    uvoteCount: vc-1, 
                    isUpvoted:false,                      
                    isDownvoted:true,                  
                  })                  
                }
              else
              {
                this.voteAnswer("False");
                this.setState({   
                                   
                  isDownvoted:false,                
                })
              } 
              console.log(this.state.isDownvoted);
            }}
            src={this.state.isDownvoted ? DownvotedImg : (this.state.isDownvoteHovering ? DownvoteHoverImg : DownvoteImg)}/>
            </div>

          </div>
          <div className="">
                <div className="helper-username-holder">
                  <h6 onChange={this.handleChange}>{"By " + this.state.uusername}</h6>
                </div>

                <div className="BestAnswerSelected">
                    <img src={BestAnswerImg}/>
                    <h6>BEST ANSWER! </h6>
                </div>
              
                <div className="answer-title">
                  <h3>BEST ANSWER</h3>
                </div>
               
                <div className="answer-text">
                  <h5 onChange={this.handleChange}>{this.state.uanswertext}</h5>
                </div>

                <div className="date-time">
                  <h5 onChange={this.handleChange}>{"Posted on: " + this.state.ucreationDateAndTime}</h5>
                </div>
          </div>
        </div>
            ) : (
              <div className="container-fluid answer-container">
                <div className="voteCountContainer">
                  <div className="upvoteButton">
                     <img 
                        className="upvoteButtonIMG" 
                          onMouseOver = {(e) => { e.preventDefault();
                          this.setState({isUpvoteHovering:true})
                        }} 
            onMouseLeave = {(e) => {
              this.setState({isUpvoteHovering:false})
            }} 
            onClick = { (e) => {
              const vc = this.state.uvoteCount;
              if(!this.state.isUpvoted)
                {
                  this.voteAnswer("True");
                  this.setState({
                    uvoteCount: vc+1,
                    isDownvoted:false,                    
                    isUpvoted:true,                  
                  })                  
                }
              else
              {
                this.voteAnswer("True");
                this.setState({                    
                  isUpvoted:false,                
                })                
              } 
            }}
            src={this.state.isUpvoted ? UpvotedImg : (this.state.isUpvoteHovering ? UpvoteHoverImg : UpvoteImg)}/>
            </div>

            <div className="voteCountBox">
              <h3>{this.state.uvoteCount}</h3>
            </div>

            <div className="downvoteButton">
            <img 
            className="downvoteButtonIMG"
            onMouseOver = {(e) => {              
              this.setState({isDownvoteHovering:true})                
            }} 
            onMouseLeave = {(e) => {              
              this.setState({isDownvoteHovering:false})               
            }} 
            onClick = { (e) => {
              const vc = this.state.uvoteCount;
              this.voteAnswer("False");
              if(!this.state.isDownvoted)
                {
                  this.setState({
                    uvoteCount: vc-1,
                    isUpvoted:false,                      
                    isDownvoted:true,                  
                  })                  
                }
              else
              {
                this.setState({                    
                  isDownvoted:false,                
                })
              } 
              console.log(this.state.isDownvoted);
            }}
            src={this.state.isDownvoted ? DownvotedImg : (this.state.isDownvoteHovering ? DownvoteHoverImg : DownvoteImg)}/>
            </div>

          </div>
          <div className="">
                <div className="helper-username-holder">
                  <h6 onChange={this.handleChange}>{"By " + this.state.uusername}</h6>
                </div>

                {this.state.uIsQuestionOwner ? 
                (
                  <div className="BestAnswerButton">
                  <button onClick={this.setBestAnswer}>
                    <h6>Declare Best Answer </h6>
                  </button>
                </div>
                ) : (<div></div>) }
              
                <div className="answer-title">
                  <h3>ANSWER</h3>
                </div>
               
                <div className="answer-text">
                  <h5 onChange={this.handleChange}>{this.state.uanswertext}</h5>
                </div>

                <div className="date-time">
                  <h5 onChange={this.handleChange}>{"Posted on: " + this.state.ucreationDateAndTime}</h5>
                </div>
          </div>
        </div>)}
        
      </nav>
    );
  }
}
