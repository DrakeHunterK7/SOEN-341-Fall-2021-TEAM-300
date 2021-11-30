import React, { Component } from "react";
import MyNavLink from "../../components/MyNavLink";
import "./index.css";
import Header from '../../components/Header/'


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
      registrationMsg: "",
      trigger: false,
      isSuccess:true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setTriggerAlertBox = this.setTriggerAlertBox.bind(this);
  }

  setTriggerAlertBox(value) {
    this.setState({
      trigger: value,
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
          this.setState({
            registrationMsg: response.data.message,
            isSuccess:false
          });
        } else if (res === 200) {
          this.setState({
            registrationMsg: response.data.message,
          });
          this.props.history.push("/login")
        }
        console.log("------", this.state.registrationMsg);
        this.setState({
          trigger: true,
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
      <div className="container-margin">
        <Header/>
        <div className="pagetitle">REGISTER</div>
        <Popup
          tigger={this.state.trigger}
          setTiggerAlertBox={this.setTriggerAlertBox}
          isSuccess={this.state.isSuccess}
        >
          {this.state.registrationMsg}
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
              <MyNavLink replace to="/login" className="bottomlink">
                Have an Account? Login here.
              </MyNavLink>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
