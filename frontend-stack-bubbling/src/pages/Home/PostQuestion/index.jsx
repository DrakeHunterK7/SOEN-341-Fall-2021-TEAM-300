import React, { Component } from 'react';
import Popup from '../../../components/Popup';
import axios from "axios";

export default class PostQuestion extends Component {
  constructor(props) {
    super();
    this.state = {
      questiontitle: "",
      questiontext: "",
      postMsg: "",
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
    axios
      .post("http://localhost:5000/postquestion", {
        questiontitle: questiontitle,
        questiontext: questiontext,
      })
      .then((response) => {
        const res = response.status;
        if(res === 401)
        {
          console.log(true);
          this.setState({
            postMsg: response.data.message,
            isSuccess:false
          });
        }
        else if(res === 201)
        {
          this.setState({
            postMsg: response.data.message,
          })
          this.props.history.push("/postquestion")
        }
        console.log("------", this.state.postMsg);
        this.setState({
          tigger: true,
        });
      })
      // clean the form
    this.setState({
      questiontitle : "Reached the clear",
      questiontext : "",
    });
  }

  render() {
    return (
      <div className="container-margin">
        <div className="pagetitle">Post Question</div>
        <Popup
          tigger={this.state.tigger}
          setTiggerAlertBox={this.setTiggerAlertBox}
          isSuccess={this.state.isSuccess}
        >
          {this.state.postMsg}
          The Question has been posted.
        </Popup>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label className = "questiontitle" for="questiontitle">Question Title</label>
          <br/>
            <textarea
              className = "questionbox" 
              type="questiontitle"
              name="questiontitle"
              value={this.state.questiontitle}
              onChange={this.handleChange}
        
              id="floatingInput"
              required
            />
            
          </div>
          <div>
          <label className = "questiontitle" for="questiontext">Question Text</label>
          <br/>
            <textarea
              className = "textbox"
              rows = "6"
              type="questiontext"
              name="questiontext"
              value={this.state.questiontext}
              onChange={this.handleChange}
            
              id="floatingquestiontext"
              required
            />
           
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary btn-lg submit-position"
            >
              Submit
            </button>
            
          </div>
        </form>
      </div>
    );
  }
}
