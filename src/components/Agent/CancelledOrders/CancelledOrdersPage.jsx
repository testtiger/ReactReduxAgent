import React, { Component } from "react";
import SearchResults from "./SearchResults";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { ORDER_SEARCH_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";

class CancelledOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderLinkClicked: false,
      orderIdFromSearchResult: "",
      searchResponse: null
    };
  }

  getOrders() {
    var self = this;
    let criteria = {"state":"REMOVED","pageNumber":0,"limit":15,"requireCount":false}
    var uri = ORDER_SEARCH_URI+"?q="+JSON.stringify(criteria);

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("posts are ============>", response);
      if(response.totalOrders != 0){
      if (response.ordersList) {
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

  componentDidMount(){
    this.getOrders()
  }

  render() {
    if (this.state.isOrderLinkClicked) {
      return (
        <Redirect to={"/AgentOrderDetails/" + this.state.orderIdFromSearchResult} />
      //  <CustomerProfilePage orderId={this.state.orderIdFromSearchResult} />
       );
    } else {
      let SearcResultsElement =null;
      if(this.state.searchResponse ){
        SearcResultsElement = <SearchResults resp={this.state.searchResponse} />;
      }
        
      return (
        <div className="container">
          <h3>Cancelled Orders</h3>
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
  }

  componentWillUnmount(){
    this.restoreOriginalState();
  }

  restoreOriginalState() {
    this.setState({
      isOrderLinkClicked: false,
      orderIdFromSearchResult: "",
      searchResponse: null
    });
  }
}

export default CancelledOrdersPage;