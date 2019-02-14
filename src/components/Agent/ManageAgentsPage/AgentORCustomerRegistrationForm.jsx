import React, { Component } from "react";
import LoginPage from "../LoginPage/loginpage";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage";
import { Redirect } from "react-router-dom";

import { makeGetCall, makePostCall } from "../../../Rest/agent-rest-client";
import { PROFILES_URI } from "../../../Rest/RestConstants";

export default class AgentORCustomerRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      roles: [],
      active: true
    };
  }

  componentWillUnmount() {
    this.setState({});
  }
  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }
  onChangeSelect(event) {
    if (event.target.value === "") {
      return;
    }
    let roles1 = [];

    roles1.push(event.target.value);
    this.setState({ roles: roles1 });
  }
  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  onClick() {
    this.props.callRegistration(this.state);
  }

  //this.registerCustomer.bind(this)
  render() {
    //this.props=
    return (
      <div className="container">
        <h3>Register Agent</h3>
        <hr />
        <div className="row">
          <div className="form-group col-md-3">
            <input
              name="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              name="lastName"
              type="text"
              className="form-control"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="email"
              value={this.state.email}
              onChange={this.onChange.bind(this)}
            />

            <div className="form-group col-md-3">
              <div className="dropdown">
                <select name="roles" onChange={this.onChangeSelect.bind(this)}>
                  <option value={""}>Select Role</option>
                  <option value={"csAgentSupervisorRole"}>
                    AgentSuperVisior
                  </option>
                  <option value={"csAgentRole"}>Agent</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="active">
              <input
                name="active"
                type="checkbox"
                id="active"
                value={this.state.active}
                onChange={this.onChange.bind(this)}
              />
              Active
            </label>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-3" />
          <div className="form-group col-md-3" />
          <div className="form-group col-md-0.75">
            <button className="btn btn-secondary" type="button">
              Reset
            </button>
          </div>
          <div className="form-group col-md-1">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.onClick.bind(this)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
