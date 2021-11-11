import React, { Component, useState, useRef } from "react";
import "./index.css";
import UpvoteImg from "../../NormalUpvote.png"
import UpvoteHoverImg from "../../UpvoteHover.png"
import UpvotedImg from "../../Upvoted.png"
import DownvoteImg from "../../NormalDownvote.png"
import DownvoteHoverImg from "../../DownvoteHover.png"
import DownvotedImg from "../../Downvoted.png"
import BestAnswerImg from "../../BestAnswerNormal.png"

let username = null;
let answertext = null;
let creationDateAndTime = null;
let voteCount = null;
let isBestAnswer = false;



export default class AnswerBox extends Component {
  

  constructor(props)
  {
    
    super(props);
    username=props.username;
    answertext=props.answertext;
    creationDateAndTime=props.creationDateAndTime;
    voteCount=props.voteCount;
    isBestAnswer=props.isBestAnswer;
      
    this.state = {
      uusername:props.username,
      uanswertext:props.answertext,
      ucreationDateAndTime:props.creationDateAndTime,
      uvoteCount:props.voteCount,
      uIsBestAnswer:props.isBestAnswer,
      isUpvoted:false,
      isUpvoteHovering:false,
      isDownvoted:false,
      isDownvoteHovering:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBestAnswer = this.setBestAnswer.bind(this);

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  setBestAnswer(){
    console.log('Best Answer Declared!');
    this.setState({
      uIsBestAnswer:true,
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
              if(!this.state.isUpvoted)
                {
                  this.setState({
                    isDownvoted:false,                    
                    isUpvoted:true,                  
                  })                  
                }
              else
              {
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
              if(!this.state.isDownvoted)
                {
                  this.setState({ 
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
              if(!this.state.isUpvoted)
                {
                  this.setState({
                    isDownvoted:false,                    
                    isUpvoted:true,                  
                  })                  
                }
              else
              {
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
              if(!this.state.isDownvoted)
                {
                  this.setState({ 
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

                <div className="BestAnswerButton">
                  <button onClick={this.setBestAnswer}>
                    <h6>Declare Best Answer </h6>
                  </button>
                </div>
              
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
