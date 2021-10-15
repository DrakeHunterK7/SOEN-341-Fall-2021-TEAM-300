import React, { Component } from "react";
import "./index.css";
import axios from "axios";

export default class Resigter extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      registaionError: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  handleSubmit(e) {
    const { username, email, password, confirmPassword } = this.state;
    axios
      .post("http://localhost:5000/register", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        console.log("response", response);
      })
      .then((err) => {
        console.log(err);
      });
    e.preventDefault();
  }

  render() {
    return (
      <div className="container margin">
        <div className="title">Resigter</div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
			  className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChange}
			  className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
			  className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="comfirmPassword"
              placeholder="Comfirm Password"
              value={this.state.comfirmPassword}
              onChange={this.handleChange}
			  className="form-control"
              required
            />
          </div>
          <button type="submit"
            className="btn btn-primary btn-lg button-position"> Register</button>
        </form>
      </div>
    );
  }
}
