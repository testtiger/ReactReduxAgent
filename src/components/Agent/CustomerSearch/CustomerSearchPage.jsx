import React, { Component } from "react";
import SearchCriteria from "./SearchCriteria";
import SearchResults from "./SearchResults";
import { makeGetCall, makePostCall } from "../../../Rest/agent-rest-client";
import { PROFILES_URI } from "../../../Rest/RestConstants";
import { ORDERS_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";
class CustomerSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistrationForm: false,
      isProfileInfoClicked: false,
      isOrderHistoryClicked: false,
      profileIdFromSearchResult: "",
      isCreateOrderLinkClicked: false,
      searchResponse: null,
      isAuthenticated: false
    };
  }

  getCustomers(criteria) {
    var self = this;

    if (!criteria) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", criteria);

    var uri = "/ccagentui/v1/profiles/?q=" + JSON.stringify(criteria);

    var headers = { Authorization: sessionStorage.getItem("token") };

    makeGetCall(uri, headers).then(response => {
      console.log("psots are ============>", response);
      if (response.profileList) {
        self.setState({ searchResponse: response, isAuthenticated: false });
      }
    });
  }

  onClickNewCustomer() {
    this.setState({ showRegistrationForm: true });
  }
  onClickViewOrderHistory(profileId) {
    if (profileId) {
      this.setState({ isOrderHistoryClicked: true });
      this.setState({ profileIdFromSearchResult: profileId });
    }
  }
  onClickProfileInfo(profileId) {
    //if (this.state.isAuthenticated){
    if (profileId) {
      this.setState({ isProfileInfoClicked: true });
      this.setState({ profileIdFromSearchResult: profileId });
    }
    //}
  }

  getOrderDetails(latestOrderID, productName) {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("token")
    };
    var queryParams = { includeResult: "full" };
    makeGetCall(ORDERS_URI + latestOrderID, headers, queryParams).then(
      response => {
        var x = response.shoppingCart.items;
        x.forEach(function(item) {
          if (item.displayName === productName) {
            self.setState({
              isAuthenticated: true
            });
          }
        });

        if (response.errorCode) {
          alert(response.message);
        }
      }
    );
  }
  getCallOnOrderID(latestOrderID, productName) {
    //will make get Call to check orderID
    if (productName.length < 5) {
      return;
    }
    this.getOrderDetails(latestOrderID, productName);
  }
  onChangeAuthKey(latestOrderID, e) {
    this.getCallOnOrderID(latestOrderID, e.target.value + "");
  }
  onClickCreateOrderLink(profileId) {
    if (profileId) {
      this.setState({ isCreateOrderLinkClicked: true });
      this.setState({ profileIdFromSearchResult: profileId });
    }
  }
  render() {
    if (this.state.showRegistrationForm === true) {
      return <Redirect to="/customers/registration" />;
    } else if (
      this.state.isProfileInfoClicked &&
      this.state.profileIdFromSearchResult
    ) {
      return (
        <Redirect
          to={"/customers/profiles/" + this.state.profileIdFromSearchResult}
        />
        // <CustomerProfilePage profileId={this.state.profileIdFromSearchResult} />
      );
    } else if (
      this.state.isCreateOrderLinkClicked &&
      this.state.profileIdFromSearchResult
    ) {
      return (
        <Redirect to={"/createOrder/" + this.state.profileIdFromSearchResult} />
      );
    }
    //Render Customer search page
    else {
      let SearcResultsElement = null;
      if (this.state.searchResponse) {
        SearcResultsElement = (
          <SearchResults
            resp={this.state.searchResponse}
            onClickProfileInfo={this.onClickProfileInfo.bind(this)}
            onClickCreateOrderLink={this.onClickCreateOrderLink.bind(this)}
            isAuthenticated={this.state.isAuthenticated}
            onChangeAuthKey={this.onChangeAuthKey.bind(this)}
          />
        );
      }

      return (
        <div className="container">
          <h3>Customer Search</h3>
          <hr />
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" />
            <div className="col-md-2" />
            <div className="col-md-2">
              <button onClick={this.onClickNewCustomer.bind(this)}>
                +New Customer
              </button>
            </div>
          </div>
          <SearchCriteria getCustomers={this.getCustomers.bind(this)} />
          {SearcResultsElement}
        </div>
      );
    }
  }
  componentWillUnmount() {
    this.restoreOriginalState();
  }
  restoreOriginalState() {
    this.setState({
      showRegistrationForm: false,
      isProfileInfoClicked: false,
      isOrderHistoryClicked: false,
      profileIdFromSearchResult: "",
      isCreateOrderLinkClicked: false,
      searchResponse: {}
    });
  }
}

export default CustomerSearchPage;
