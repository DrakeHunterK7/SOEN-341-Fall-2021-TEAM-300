import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home"; //Home是路由组件
import About from "./pages/About"; //About是路由组件
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";


import Header from "./components/Header"; //Header是一般组件
import MyNavLink from "./components/MyNavLink";

import './app.css'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div> */}
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <MyNavLink replace to="/about">
                      About
                    </MyNavLink>
                  </li>
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
                  <li className="nav-item">
                    <MyNavLink replace to="/userProfile">
                      UserProfile
                    </MyNavLink>
                  </li>
                  
                </ul>
                <form class="container-fluid justify-content-start">
                  <button class="btn btn-outline-success me-2" type="button">Login</button>
                  <button class="btn btn-outline-success me-2" type="button">Logout</button>
                </form>
              </div>
            </div>
          </nav>

          <div className="col-xs-6">
            <div className="panel margin">
              <div className="panel-body">
                {/* 注册路由 */}
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/userProfile" component={UserProfile} />
                  <Redirect to="/home" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
