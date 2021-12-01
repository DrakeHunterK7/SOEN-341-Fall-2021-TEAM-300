import React, { Component } from "react";
import "./index.css";
import UpvoteImg from "../../assets/NormalUpvote.png"
import UpvoteHoverImg from "../../assets/UpvoteHover.png"
import UpvotedImg from "../../assets/Upvoted.png"
import DownvoteImg from "../../assets/NormalDownvote.png"
import DownvoteHoverImg from "../../assets/DownvoteHover.png"
import DownvotedImg from "../../assets/Downvoted.png"
import axios from "axios";


let questiontitle;
let questiontext;
let username;
let creationTD; 
let voteCount;
let questionID;;


export default class QuestionBox extends Component {

  constructor(props) {
		super(props);
		this.state = {
		  questiontitle: props.questiontitle,
		  questiontext: props.questiontext,
		  username: props.username,
      questionID: props.questionID,
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

    voteQuestion(isUpvote)
  {
    console.log('Voted!');
    const token = localStorage.getItem("access_token");
    const uid = this.state.questionID;
    console.log(uid);

    axios
      .post("http://localhost:5000/votequestion", {
        question_id: uid,
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
				alert('You can only interact if you are logged in!')
				}
		  })

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
  const vc = this.state.voteCount;
  if(!this.state.isUpvoted)
    {
      this.voteQuestion("True");
      this.setState({
        voteCount: vc + 1,
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
  this.voteQuestion("False");
  const vc = this.state.voteCount;
  if(!this.state.isDownvoted)
    {
      this.setState({ 
        voteCount: vc-1,
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
