import React, { Component } from "react";
import Header from "../../components/Header/";
import QuestionBox from "../../components/QuestionBox/";
import AnswerBox from "../../components/AnswerBox";
import "./index.css";

var questiontitle;
var questiontext;
var qUsername;
var qID;

export default class QuestionTemplatePage extends Component {
	constructor(props) {
		super();
		this.state = {
		  questiontitle: "",
		  questiontext: "",
		  qUsername:"",
		  qID: "",
		};

	  }
	
	
	
	  
	render() {
		const { state } = this.props.location
		console.log('here comes the state!')
		console.log(state)
		console.log(state.username)
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
              			type="questiontitle"
              			name="questiontitle"
              			value={this.state.questiontitle}
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