import React, { Component } from "react";

class SearchCriteria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        returnRequestId: "",
        orderId: "",
        email: "",
        state: "",
        pageNumber: 0,
        limit: 15,
        requireCount: false
      }
    };
  }
  onChange(e) {
    let newCriteria = {
      ...this.state.criteria
    };
    let key = e.target.name;
    let value = e.target.value;
    newCriteria[key] = value;
    this.setState({ criteria: newCriteria });
  }
  doSearch(e) {
    e.preventDefault();
    if (this.isSearchCriteriaIsEmpty()) {
      alert("Enter search criteria");
    } else {
      console.log("will do get call with", this.state.criteria);
      if (this.props.getReturnRequests) {
        this.props.getReturnRequests(this.state.criteria);
      }
      //make get call here
    }
  }

  onReset(e) {
    e.preventDefault();

    if (!this.isSearchCriteriaIsEmpty()) {
      console.log("crieteria is not empty");
      let resetCriteria = {
        returnRequestId: "",
        orderId: "",
        email: "",
        state: "Select Status...",
        pageNumber: 0,
        limit: 15,
        requireCount: false
      };
      this.setState({
        criteria: resetCriteria
      });
    } else {
      console.log("crieteria is  empty");
      return;
    }
  }
  isSearchCriteriaIsEmpty() {
    let criteria = {
      ...this.state.criteria
    };
    let result = "";
    for (let key in criteria) {
      result = result + criteria[key];
      console.log("---->Returns Search Criteria is", result);
    }
    return result ? false : true;
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="row">
            <div className="form-group col-md-4">
              <input
                onChange={this.onChange.bind(this)}
                value={this.state.criteria.returnRequestId}
                name="returnRequestId"
                type="text"
                className="form-control"
                placeholder="Return Request Number"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                onChange={this.onChange.bind(this)}
                value={this.state.criteria.orderId}
                name="orderId"
                type="text"
                className="form-control"
                placeholder="Order Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <input
                onChange={this.onChange.bind(this)}
                value={this.state.criteria.email}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-4">
            <select 
            name="state" value={this.state.criteria.state}
            onChange={this.onChange.bind(this)}
            className="form-control">
            <option value="Select Status..">Select Status...</option>
              <option value="PENDING_CUSTOMER_ACTION">Approved</option>
              <option value="FULL_RETURN">Full Return</option>
              <option value="COMPLETE">Complete</option>
              <option value="PARTIAL_RETURN">Partial Return</option>
              <option value="MANUAL_REFUND">Manual Refund</option>
              <option value="PENDING_REFUND">Pending Refund</option>
            </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4" />
            <div className="form-group col-md-4" />
            <div className="form-group col-md-2" />
            <div className="form-group col-md-1">
              <button
                type="button"
                onClick={this.onReset.bind(this)}
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
            <div className="form-group col-md-0.75">
              <button
                onClick={this.doSearch.bind(this)}
                className="btn btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchCriteria;