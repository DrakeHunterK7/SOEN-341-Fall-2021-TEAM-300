import axios from 'axios';
import React, { Component} from 'react';
import QuestionPreviewTemplate from '../../../components/QuestionPreviewTemplate';


export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "QList": [],
      "QuestionsLoaded": false
    }

   
  }


  componentDidMount(){
    console.log('component just mounted')
    this.fetchQuestions();
    
  }

  fetchQuestions(){
    axios
    .get("http://localhost:5000/questionlist")
    .then((response) => {
      const stat = response.status
      if(stat === 201)
      {
        this.setState({
          QList: response.data,
          QuestionsLoaded: true
        })
        console.log(this.state.QList)
      }
      
      console.log(this.state.QuestionsLoaded)
      
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
        <div className="pagetitle">ALL QUESTIONS</div>

      {this.state.QuestionsLoaded
      ? (
          this.state.QList.map((question) => 
          <QuestionPreviewTemplate 
              username={question.Username}
              title={question.title}
              text={question.body}
              qID={question._id}
              creationDateAndTime={question.createdAt}
              voteCount={question.answerCount}
          />)
      )
      : <p style={noAnswerStyle}>Loading Question List.....</p>}

      

      </div>
    );
  }
 }

