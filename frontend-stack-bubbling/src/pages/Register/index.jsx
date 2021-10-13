import React, { Component } from "react";
import './index.css'
export default class Resigter extends Component {
  render() {
    // console.log('About组件收到的props是',this.props);
    return (
      <div className="container margin">
        <div className="title">Resigter</div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Email Address"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg button-position"
          >
            Submit
          </button>
          <div className="word">
            <a href="#">Have a account? Login</a>
          </div>
        </div>
      </div>
    );
  }
}
