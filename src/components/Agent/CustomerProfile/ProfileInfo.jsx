import React, { Component } from "react";

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({ name: value });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Profile Info</h3>          
        </div>
        <br/>
          <br/>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="firstName">FirstName:&nbsp;&nbsp;&nbsp;</label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              onChange={this.onChange.bind(this)}
              value={this.props.firstName}
            />
          </div>
          </div>
          <br/>          
          <div className="row">
          <div className="col-md-3">
            <label htmlFor="lastName">LastName: &nbsp;&nbsp;&nbsp;</label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              onChange={this.onChange.bind(this)}
              value={this.props.lastName}
            />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="email">EmailAddress :</label>
            <input
              name="email"
              id="email"
              type="email"
              onChange={this.onChange.bind(this)}
              value={this.props.email}
            />
          </div>
          </div>
          <br/>
          <div className="row" align="left">
          <div className="col-md-3">
            <label htmlFor="receiveEmail" >&nbsp;&nbsp;&nbsp;
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
        <br/>
        <br/>
              </div>
    );
  }
}