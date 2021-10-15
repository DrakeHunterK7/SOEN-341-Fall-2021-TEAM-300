import React, { Component } from "react";
import MyNavLink from "../../components/MyNavLink";
import "./index.css";

import Popup from "../../components/Popup";
import axios from "axios";

export default class Resigter extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      registaionMsg: "",
      tigger: false,
      isSuccess:true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setTiggerAlertBox = this.setTiggerAlertBox.bind(this);
  }

  setTiggerAlertBox(value) {
    this.setState({
      tigger: value,
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    axios
      .post("http://localhost:5000/register", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        // console.log("response", response.data.message);
        // console.log(response.status)
        // console.log(typeof(response.data.message))
        const res = response.status;
        if (res === 201 || res === 203) {
          console.log(true);
          this.setState({
            registaionMsg: response.data.message,
            isSuccess:false
          });
        } else if (res === 200) {
          this.setState({
            registaionMsg: response.data.message,
          });
          this.props.history.push("/login")
        }
        console.log("------", this.state.registaionMsg);
        this.setState({
          tigger: true,
        });
      })
      .then((error) => {
        console.log(error);
      });

    // clean the form
    this.setState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  render() {
    return (
      <div className="container margin">
        <div className="title">Resigter</div>
        <Popup
          tigger={this.state.tigger}
          setTiggerAlertBox={this.setTiggerAlertBox}
          isSuccess={this.state.isSuccess}
        >
          {this.state.registaionMsg}
        </Popup>
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
              name="confirmPassword"
              placeholder="Confirm Password "
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary btn-lg button-position"
            >
              Register
            </button>
            <div className="word">
              <MyNavLink replace to="/login" className="link">
                Have an Account? Login
              </MyNavLink>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
