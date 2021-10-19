import React, { Component } from "react";
import Header from "../../components/Header/";
import QuestionBox from "../../components/QuestionBox/";
import AnswerBox from "../../components/AnswerBox";


export default class QuestionTemplatePage extends Component {
	render() {
		return (
			<div>
				<Header />
				<QuestionBox />
				
				<AnswerBox />
				<AnswerBox />
				<AnswerBox />
				<AnswerBox />
				
			</div>
			
		)
	}
}