import React, { Component } from "react";
import MyNavLink from "../MyNavLink";
import './index.css'
import MainLogo from '../Header/SBLogo.png';
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
      <nav className="navbar navbar-expand-lg navbar-light" id="super-container">
        <div className="container-fluid"  id="Header" >
          <div className="collapse navbar-collapse" id="navbarNav">
            {this.state.isLoginUser ? (
              <div >
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
                <li id="HeaderLogo">
                  <img src={MainLogo} width="200"/>
                </li>
                <li className="nav-item" class="tab">
                  <MyNavLink replace to="/home" class="link">
                    Home
                  </MyNavLink>
                </li>
                <li className="nav-item" class="tab">
                  <MyNavLink  replace to="/login" class="link">
                    Login
                  </MyNavLink>
                </li>
                <li className="nav-item" class="tab">
                  <MyNavLink replace to="/register" class="link">
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
