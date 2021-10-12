import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import Navbar from './components/NavBar/NavBar'
import RegistrationForm from './components/ResigterForm/resigter'
import LoginForm from './components/LoginForm/login'
import Home from './components/Home/home'
import PrivateRoute from './utils/React-Router/privateRoute'
import AlertComponent from './components/AlertComponent/alertComponent'
// import privateNavLink from './utils/react-router/privateNavLink'



export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
          <Route path="/" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
          </Switch>
          <AlertComponent/>
        </div>
      </Router>
    );
  }
}

export default App;
