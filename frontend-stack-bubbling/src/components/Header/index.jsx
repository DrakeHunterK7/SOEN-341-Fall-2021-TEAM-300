import React, { Component } from "react";
import MyNavLink from "../MyNavLink";
import './index.css'
export default class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoginUser: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    console.log(localStorage.getItem("access_token"));
    if (localStorage.getItem("access_token")) {
      console.log("true user logined");
      this.setState({
        isLoginUser: true,
      });
    }
  }

  handleLogout() {
    localStorage.removeItem("access_token");
    if (localStorage.getItem("access_token") == null) {
      console.log("yes the access token is removed");
    }
    window.location.reload()
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            {this.state.isLoginUser ? (
              <div>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <MyNavLink replace to="/home">
                      Home
                    </MyNavLink>
                  </li>
                  <li className="nav-item">
                    <MyNavLink replace to="/userProfile">
                      UserProfile
                    </MyNavLink>
                  </li>
                </ul>
                <button
                  class="btn btn-outline-success me-2 logout-btn"
                  type="button"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <MyNavLink replace to="/home">
                    Home
                  </MyNavLink>
                </li>
                <li className="nav-item">
                  <MyNavLink replace to="/login">
                    Login
                  </MyNavLink>
                </li>
                <li className="nav-item">
                  <MyNavLink replace to="/register">
                    Register
                  </MyNavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
