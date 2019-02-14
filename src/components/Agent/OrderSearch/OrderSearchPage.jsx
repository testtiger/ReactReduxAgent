import React, { Component } from "react";
import BasicSearch from "./BasicSearch";
import SearchResults from "./SearchResults";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { ORDER_SEARCH_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";

class OrderSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderLinkClicked: false,
      orderIdFromSearchResult: "",
      searchResponse: null
    };
  }

  getOrders(criteria) {
    var self = this;

    if (!criteria) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", criteria);

    var uri = ORDER_SEARCH_URI+"?q="+JSON.stringify(criteria);

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("posts are ============>", response);
      if (response.ordersList) {
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

  render() {
    if (this.state.isOrderLinkClicked) {
      return (
        <Redirect to={"/AgentOrderDetails/" + this.state.orderIdFromSearchResult} />
      //  <CustomerProfilePage orderId={this.state.orderIdFromSearchResult} />
       );
    }
    //Render Returns Search page
    else {
      let SearcResultsElement =null;
      if(this.state.searchResponse ){
        SearcResultsElement = <SearchResults resp={this.state.searchResponse} onClickViewOrderIdLink={this.onClickViewOrderIdLink.bind(this)} />;
      }
        
      return (
        <div className="container">
          <h3>Order Search</h3>
          <hr />
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" />
            <div className="col-md-2" />
          </div>
          <BasicSearch getOrdersWithBasicSearch={this.getOrders.bind(this)} />
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
      orderIdFromSearchResult: "",
      searchResponse: {}
    });
  }
}

export default OrderSearchPage;