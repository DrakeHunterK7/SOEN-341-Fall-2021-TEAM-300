import React, { Component } from "react";
import './index.css'

export default class Login extends Component {
  render() {
    // console.log('About组件收到的props是',this.props);
    return (
      <div className="container margin">
        <div className="title">Login</div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        
        <div>
            <button type="button" className="btn btn-primary btn-lg button-position">Login</button>
            <div className="word">
                <a href="#" >Don't have Account? Create one</a>
            </div>
        </div>
        
      </div>
    );
  }
}

