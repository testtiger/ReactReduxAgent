import React, { Component } from "react";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { RETURNS_GET_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state ={
      customerDetailsResponse : "",
      returnItemsDetails : ""
    }
  }

  getReturnRequest(criteria) {
    var self = this;

    if (!criteria) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", criteria);

    var uri = RETURNS_GET_URI+criteria;

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("Posts are ============>", response);
      if(!response.returnRequestId){
        self.setState({ customerDetailsResponse: response.profileInfo });
        self.setState({ returnItemsDetails: response.returnItems });
    }else{
      self.setState({ searchResponse: response });
    }
    });
  }

  saveReturnRequestsAccessed(returnRequestObject,orderDetailsObject) {
    console.log("------------->search result click", this.props);
    console.log("------------->search result return request", returnRequestObject);
    if (returnRequestObject===undefined){
      throw TypeError("Check Return Request Object value")
    }
    if (orderDetailsObject===undefined){
      throw TypeError("Check Order Details Object value")
    }
    if (this.props.onClickViewReturnRequestLink) {
      this.props.onClickViewReturnRequestLink(returnRequestObject.returnRequestId);
    }
     else if (this.props.onClickViewOrderIdLink) {
      this.props.onClickViewOrderIdLink(orderDetailsObject.orderInfo.orderId);
    }
  }

  render() {
    console.log("hi hello", this.props.resp.totalRequests);
    if (this.props.resp.totalRequests === 0) {
      return (
        <div>
          <hr />
          <h5>No Search resutls found for provided criteria...</h5>
        </div>
      );
    }
    return (
      <div className="Container">
        <div className="row">
          <h3>Search Results:</h3>
          <hr />
          <table className="table table-bordered">
            <TableHeader />

            <TableBody
              onSearchResultClick={this.saveReturnRequestsAccessed.bind(this)}
              searchResults={this.props.resp.searchResults}
            />
          </table>
        </div>
      </div>
    );
  }
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Return Number</th>
        <th>Request Status</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Order Number</th>
        <th>Refund Total</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  let returnResults = props.searchResults;
  var element = returnResults.map(returnRequest => {
    let returnRequestNumberElement=null;
    let returnRequestActionElement=null;
    if(returnRequest.state ==="Complete"){
      returnRequestNumberElement = <span>{returnRequest.returnRequestId}</span>
      returnRequestActionElement = <span></span>
    } else if(returnRequest.state ==="Full return"){
      returnRequestNumberElement = returnRequest.returnRequestId
      returnRequestActionElement = <span>Refund</span>
    } else if(returnRequest.state ==="Approved"){
      returnRequestNumberElement = returnRequest.returnRequestId
      returnRequestActionElement = <span>Receive</span>
    }
    return (
      <tr key={returnRequest.returnRequestId}>
        <td>{returnRequestNumberElement}</td>
        <td>{returnRequest.state}</td>
        <td>{returnRequest.firstName}</td>
        <td>{returnRequest.lastName}</td>
        <td><a href={"/orders/"+returnRequest.orderId} onClick={<Redirect to={"/orders/"+returnRequest.orderId} />}>{returnRequest.orderId}</a></td>
        <td>{returnRequest.totalRefund}</td>
        <td>{returnRequestActionElement}</td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}
export default SearchResults;
