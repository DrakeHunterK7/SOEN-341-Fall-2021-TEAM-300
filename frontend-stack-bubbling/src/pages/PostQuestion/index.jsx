import React, { Component } from 'react'
import Popup from '../../components/Popup'
import Header from "../../components/Header/";




export default class Login extends Component {
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
      <div className="container-margin">
        <Header/>
        <div className="pagetitle">Post Question</div>

        <Popup
          tigger={this.state.tigger}
          setTiggerAlertBox={this.setTiggerAlertBox}
          isSuccess={this.state.isSuccess}
        >
          {this.state.loginMsg}
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
