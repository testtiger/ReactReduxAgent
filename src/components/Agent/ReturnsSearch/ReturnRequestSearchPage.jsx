import React, { Component } from "react";
import SearchCriteria from "./SearchCriteria";
import SearchResults from "./SearchResults";
import ReturnRequestDetailsPage from "../ReturnRequestDetails/ReturnRequestDetailsPage";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { RETURNS_SEARCH_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";

class ReturnRequestSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderLinkClicked: false,
      isReturnRequestLinkClicked:false,
      orderIdFromSearchResult: "",
      returnRequestIdFromSearchResult: "",
      searchResponse: null
    };
  }

  getReturnRequests(criteria) {
    var self = this;

    if (!criteria) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", criteria);

    var uri = RETURNS_SEARCH_URI +"?q="+ JSON.stringify(criteria);

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("psots are ============>", response);
      if(response.totalRequests != 0){
      if (response.searchResults) {
        self.setState({ searchResponse: response });
      }
    }else{
      self.setState({ searchResponse: response });
    }
    });
  }

  onClickViewOrderIdLink(orderId) {
    if (orderId) {
      this.setState({ isOrderLinkClicked: true });
      this.setState({ orderIdFromSearchResult: orderId });
    }
  }

  onClickViewReturnRequestLink(returnRequestId) {
    if (returnRequestId) {
      this.setState({ isReturnRequestLinkClicked: true });
      this.setState({ returnRequestIdFromSearchResult: returnRequestId });
    }
  }
  render() {
    if (this.state.isOrderLinkClicked) {
      return (
        <Redirect to={"/AgentOrderDetails/" + this.state.orderIdFromSearchResult} />
      //  <CustomerProfilePage orderId={this.state.orderIdFromSearchResult} />
       );
    } /*else if (this.state.isReturnRequestLinkClicked){
     return ( <Redirect to={"/returnRequestDetails?returnRequestId="+this.state.returnRequestIdFromSearchResult} />);
     <ReturnRequestDetailsPage rdp = {this.state.returnRequestIdFromSearchResult}/>
    }*/
    //Render Returns Search page
    else {
      let SearcResultsElement =null;
      if(this.state.searchResponse ){
        SearcResultsElement = <SearchResults resp={this.state.searchResponse} onClickViewOrderIdLink={this.onClickViewOrderIdLink.bind(this)} onClickViewReturnRequestLink={this.onClickViewReturnRequestLink.bind(this)} />;
      }
        
      return (
        <div className="container">
          <h3>Reutrns Search</h3>
          <hr />
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" />
            <div className="col-md-2" />
          </div>
          <SearchCriteria getReturnRequests={this.getReturnRequests.bind(this)} />
          {SearcResultsElement}
        </div>
      );
    }
  }
  componentWillUnmount(){
    this.restoreOriginalState();
  }

  restoreOriginalState() {
    this.setState({
      isOrderLinkClicked: false,
      isReturnRequestLinkClicked:false,
      orderIdFromSearchResult: "",
      returnRequestIdFromSearchResult: "",
      searchResponse: {}
    });
  }
}

export default ReturnRequestSearchPage;
