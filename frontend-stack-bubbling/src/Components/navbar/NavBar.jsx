import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateNavLink from "../../utils/react-router/privateNavLink";

import Home from "../Home/home";
import Login from "../LoginForm/login";
import Resigter from "../ResigterForm/resigter";
import userProfile from "../UserProfile/userProfile";
// import Logout from "../views/logout";

import "./index.css"

export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
          <a className="navbar-brand nav-link active"  aria-current="page" to="/home" href="/home">
            Stack-Bubbling
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <PrivateNavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </PrivateNavLink>
              </li>
              <li className="nav-item">
                <PrivateNavLink className="nav-link" to="/login">
                  Login
                </PrivateNavLink>
              </li>
              <li className="nav-item">
                <PrivateNavLink className="nav-link" to="/resigter">
                  Resigter
                </PrivateNavLink>
              </li>
              <li className="nav-item">
                <PrivateNavLink className="nav-link" to="/userProfile">
                  userProfile
                </PrivateNavLink>
              </li>
              <li className="nav-item">
                <PrivateNavLink className="nav-link" to="/logout">
                  Logout
                </PrivateNavLink>
              </li>
            </ul>
          </div>
          <p className="user-info">Hello, username in here</p>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/resigter" component={Resigter} />
          <Route path="/userProfile" component={userProfile} />
          {/* <Route path="/logout" component={Logout}/>           */}
        </Switch>
      </div>
    );
  }
}

export default NavBar;
