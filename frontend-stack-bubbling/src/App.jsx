import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// pages
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import QuestionTemplatePage from "./pages/QuestionTemplatePage";
import PostQuestion from "./pages/Home/PostQuestion";
import QuestionList from "./pages/Home/QuestionList";


// components
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
                  <Route path="/questiontemplatepage" component={QuestionTemplatePage} />
                  <Route path="/postquestion" component={PostQuestion} />

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
