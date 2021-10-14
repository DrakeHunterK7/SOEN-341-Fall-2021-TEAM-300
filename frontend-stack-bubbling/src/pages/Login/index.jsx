import React, { Component } from "react";
import axios from "axios";
import "./index.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginError: "",
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
    const { email, password } = this.state;
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log("response", response.data.access_token);
        if(response.status === 201){
          localStorage.setItem('token', response.data.access_token)
        }
        console.log("---------",localStorage.getItem('token'))
      }).then((err) => {
        // console.log(err)
      })
    e.preventDefault();
  }

  render() {
    return (
      <div className="container margin">
        <div className="title">Login</div>

        <div className="alert alert-primary" role="alert">
          {this.state.loginError}
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary btn-lg button-position"
            >
              Login
            </button>
            <div className="word">
              <a href="#">Don't have Account? Create one</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}