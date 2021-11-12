import React, { Component } from "react";
import "./index.css";
import UpvoteImg from "../../NormalUpvote.png"
import UpvoteHoverImg from "../../UpvoteHover.png"
import UpvotedImg from "../../Upvoted.png"
import DownvoteImg from "../../NormalDownvote.png"
import DownvoteHoverImg from "../../DownvoteHover.png"
import DownvotedImg from "../../Downvoted.png"


let questiontitle;
let questiontext;
let username;
let creationTD; 
let voteCount;


export default class QuestionBox extends Component {

  constructor(props) {
		super();
		this.state = {
		  questiontitle: props.questiontitle,
		  questiontext: props.questiontext,
		  username: props.username,
		  creationTD: props.creationTD,
      voteCount: props.voteCount,
      isUpvoted:false,
      isUpvoteHovering:false,
      isDownvoted:false,
      isDownvoteHovering:false,
		};

    this.handleChange = this.handleChange.bind(this);

	  }

    handleChange(e) {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid question-container">
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
        voteCount: 1,
        isDownvoted:false,                    
        isUpvoted:true,                  
      })                  
    }
  else
  {
    this.setState({   
      voteCount: 0,                 
      isUpvoted:false,                
    })                
  } 
}}
src={this.state.isUpvoted ? UpvotedImg : (this.state.isUpvoteHovering ? UpvoteHoverImg : UpvoteImg)}/>
</div>

<div className="voteCountBox">
  <h3>{this.state.voteCount}</h3>
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
        voteCount: -1,
        isUpvoted:false,                      
        isDownvoted:true,                  
      })                  
    }
  else
  {
    this.setState({     
      voteCount: 0,               
      isDownvoted:false,                
    })
  } 
  console.log(this.state.isDownvoted);
}}
src={this.state.isDownvoted ? DownvotedImg : (this.state.isDownvoteHovering ? DownvoteHoverImg : DownvoteImg)}/>
</div>

</div>
          <div className="">
                <div className="asker-username-holder">
                  <h6>{"By " + this.state.username}</h6>
                </div>
              
                <div className="question-title">
                  <h3>{this.state.questiontitle}</h3>
                </div>
               
                <div className="question-text">
                  <h5>{this.state.questiontext}</h5>
                </div>

                <div className="date-time">
                  <h5>{"Posted on: " + this.state.creationTD}</h5>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
