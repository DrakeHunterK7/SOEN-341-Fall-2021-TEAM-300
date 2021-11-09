import React, { Component } from "react";
import Header from "../../components/Header/";
import QuestionBox from "../../components/QuestionBox/";
import AnswerBox from "../../components/AnswerBox";
import axios from "axios"
import "./index.css";

var questiontitle;
var questiontext;
var qUsername;
var qID;
var newAnswer;

export default class QuestionTemplatePage extends Component {
	constructor(props) {
		super();
		this.state = {
		  questiontitle: "",
		  questiontext: "",
		  qUsername:"",
		  qID: "",
		  newAnswer: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(e) {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	  }
	
	  handleSubmit(e) {
		e.preventDefault();
		const { newAnswer} = this.state;
		const { state } = this.props.location;
		qID = state.qID;

		const token = localStorage.getItem("access_token");

		console.log(token);
		
		axios
		  .post("http://localhost:5000/postanswer", {
			question_id: qID,
			body: newAnswer,
		  }, {
			headers: {
			  'Authorization' : 'Bearer ' + token
			}})
		  .then((response) => {
			console.log(response)
			const res = response.status;
			if (res === 200) {
			  
			}
			else if(res === 201){
			  this.setState({
				
			  })
			  
			}
			else if(res === 203){
			  this.setState({
				
			  })
			}
			this.setState({
			  
			});
		  })
		  .catch(function(error){
			console.log(error.response.data);
		  })
		  // clean the form
		  this.setState({
			newAnswer:'',
		  });
		  console.log("-----",this.state)
		  
	  }
	
	
	  
	render() {
		const { state } = this.props.location
		
		return (
			<div>
				<Header />
				<QuestionBox 
				username={state.username} 
				questiontitle = {state.title}
				questiontext= {state.text}
				creationTD={state.creationDateAndTime}
				/>

				
					
				<div className="post-answer-container">
					<form onSubmit={this.handleSubmit}>
          				<div>
						  <div className="post-answer-title">
                  			<h3>POST ANSWER</h3>
                		</div>
            			<textarea
              			className = "post-answer-textbox" 
              			type="newAnswer"
              			name="newAnswer"
              			value={this.state.newAnswer}
              			onChange={this.handleChange}
        
              			
              			required
            			/>
            
          				</div>
        

          				<div>
            				<button
              				type="submit"
              				className="btn btn-primary btn-lg submit-position post-answer-button"
           				 	>
							Submit
            				</button>
            
          				</div>
					</form>
				</div>
				
				
				
			</div>
			
		)
	}
}