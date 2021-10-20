import React, { Component } from "react";
import Header from "../../components/Header/";
import QuestionBox from "../../components/QuestionBox/";
import AnswerBox from "../../components/AnswerBox";
import "./index.css";


export default class QuestionTemplatePage extends Component {
	constructor(props) {
		super();
		this.state = {
		  questiontitle: "",
		  questiontext: "",
		  tigger:false,
		  isSuccess:true
		};
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setTiggerAlertBox = this.setTiggerAlertBox.bind(this);
	  }
	
	  setTiggerAlertBox(value){
		this.setState({
		  tigger: value,
		});
	  }
	
	  handleChange(e) {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	  }
	
	  handleSubmit(e) {
		e.preventDefault();
		const { questiontitle, questiontext } = this.state;
		
		
	  }
	render() {
		return (
			<div>
				<Header />
				<QuestionBox />
				
				<AnswerBox />
				<AnswerBox />
				<AnswerBox />
				<AnswerBox />

				
					
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