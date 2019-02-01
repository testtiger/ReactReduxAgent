import React, { Component } from "react";
import { makeRestcall } from "../../../Rest/agent-rest-client";
import { LOGIN_URI } from "../../../Rest/RestConstants";
import { loginActionCreator } from "../../../ReduxActions/LoginActionCreator";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log("this.props is------------>", this.props);
    console.log("this.props.store is------------>", this.props.store);
    this.state = { username: "", password: "", isLoggedin: false };
    sessionStorage.setItem("isLoggedin", false);
    sessionStorage.setItem("token", null);

    /***this.state = { username: "", password: "", isLoggedin: false };

    sessionStorage.setItem("isLoggedin", false);
    sessionStorage.setItem("token", null);*/

    /*** sessionStorage.setItem("token", window.localStorage.getItem("token"));
    sessionStorage.setItem(
      "isLoggedin",
      window.localStorage.getItem("isLoggedin")
    );

    this.state = {
      username: "",
      password: "",
      isLoggedin: sessionStorage.getItem("isLoggedin") === "true" ? true : false
    };*/
  }

  onChange(e) {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeusr(e) {
    console.log(e.target.name);
    this.setState({ username: e.target.value });
  }
  onChangepwd(e) {
    console.log(e.target.name);
    this.setState({ password: e.target.value });
  }
  validate() {
    if (!this.state.username) {
      alert("Enter user name");
    }
    if (!this.state.password) {
      alert("Enter password");
    }
    if (this.state.password && this.state.username) {
      alert("Username & password cannot be empty");
    }
  }
  login(e) {
    e.preventDefault();
    if (this.state.password && this.state.username) {
      var payload = this.state;
      payload["grant_type"] = "password";
      this.props.dispatch(loginActionCreator(payload));
    }
  }
  render() {
    console.log(
      "this.props.store.Login.isLoggedin---------",
      this.props.store.LOGIN.isLoggedIn
    );
    if (this.props.store.LOGIN.isLoggedIn) {
      return (
        <Redirect to={"/welcome/" + this.state.profileIdFromSearchResult} />
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-10" />
            <div className="col-md-82" />
          </div>
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <form className="form-group">
                <label>UserName:</label>
                <input
                  className="form-control col-lg-5"
                  required={true}
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange.bind(this)}
                />
                <br />
                <label>Password:</label>
                <input
                  className="form-control col-lg-5"
                  required={true}
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange.bind(this)}
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.login.bind(this)}
                >
                  submit
                </button>
                <p>{this.state.username + "" + this.state.password}</p>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = function(state) {
  return { store: state };
};

// wrap action creator with dispatch method
//const mapDispatchToProps = (dispatch) => ({ fetchUserDetails: (username) => dispatch(fetchUserDetails(username)) })

// Connect react component to redux store

LoginPage = connect(mapStateToProps)(LoginPage);
