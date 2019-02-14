import React, { Component } from "react";
import SearchResults from "./SearchResults";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { RETURNS_SEARCH_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";

class ReturnedOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnResults:[]
    };
  }

  getReturnRequests() {
    var self = this;
    var proposedDate = formatDate() + "T00:00:00.000Z";
    console.log("------------>Proposed Date is:", proposedDate);
    let criteria = {"startDateFromTimeSpan":proposedDate,"pageNumber":0,"limit":15,"requireCount":false}
    var uri = RETURNS_SEARCH_URI+"?q="+JSON.stringify(criteria);

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("Search Response is ============>", response)
        self.setState({  returnResults:response.searchResults})
    });
  }

  componentDidMount(){
    this.getReturnRequests()
  }

  render() {
      let SearcResultsElement =null;
      if(this.state.returnResults ){
        SearcResultsElement = <SearchResults resp={this.state.returnResults} />;
      }
        
      return (
        <div className="container">
          <h3 align="left">Returned Orders</h3>
          <hr />
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" />
            <div className="col-md-2" />
          </div>
          {SearcResultsElement}
        </div>
      );
  }

  restoreOriginalState() {
    this.setState({
      returnResults:[]
    });
  }
}

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth()),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default ReturnedOrdersPage;