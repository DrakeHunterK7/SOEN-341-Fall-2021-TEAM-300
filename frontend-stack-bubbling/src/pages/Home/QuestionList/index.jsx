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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

    return (
      <div className="list-page-container">
        <div className="pagetitle">ALL QUESTIONS</div>

      {this.state.QuestionsLoaded
      ? (
          this.state.QList.map((question) => <QuestionPreviewTemplate 
              username={question.Username}
              title={question.title}
              text={question.body}
              qID={question._id}
              creationDateAndTime={question.createdAt}
              voteCount={question.vote_count}
            />)
      )
      : 'No Questions Posted yet'}

      

      </div>
    );
  }
 }

