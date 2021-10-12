import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="dropdown-menu">
          <form className="px-4 py-3">
            <div className="form-group">
              <label for="exampleDropdownFormEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label for="exampleDropdownFormPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="dropdownCheck"
              />
              <label className="form-check-label" for="dropdownCheck">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            New around here? Sign up
          </a>
          <a className="dropdown-item" href="#">
            Forgot password?
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
