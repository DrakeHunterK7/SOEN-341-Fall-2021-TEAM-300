import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// pages
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

// componets
import Header from "./components/Header"; 

import './app.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
          {/* <Header/> */}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <div className="panel margin">
              <div className="panel-body">
                <Switch>
                  <Route path="/home" component={Home} />
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
