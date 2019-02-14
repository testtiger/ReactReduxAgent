import React, { Component } from "react";
import LoginPage from "../LoginPage/loginpage";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage";
import { Redirect } from "react-router-dom";

import { makeGetCall, makePostCall } from "../../../Rest/agent-rest-client";
import { PROFILES_URI } from "../../../Rest/RestConstants";

export default class AgentORCustomerRegistartionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      receiveEmail: "",
    };
  }

  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }
  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  onClick(){
      this.props.callRegistration(this.state)
  }
 
//this.registerCustomer.bind(this)
  render() {
   
    //this.props=
    return (
      <div className="container">
        <h3>Register Customer</h3>

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
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="receiveEmail">
              <input
                name="receiveEmail"
                type="checkbox"
                id="receiveEmail"
                value={this.state.receiveEmail}
                onChange={this.onChange.bind(this)}
              />
              Receive Email
            </label>
          </div>
        </div>
        <div className="row">
          <button onClick={this.onClick.bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
