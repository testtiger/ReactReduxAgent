import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo";
import OrderHistory from "./OrderHistory";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { PROFILES_URI } from "../../../Rest/RestConstants";
import { HISTORY } from "../../../Rest/RestConstants";
import OrderHistoryLineChart from "./Activity/OrderHistoryLineChart";
import OrderHistoryPieChart from "./Activity/OrderHistoryPieChart";
import {
  Card,
  Container,
  Grid,
  Button,
  Checkbox,
  Form,
  Header,
  Image,
  Segment,
  Statistic
} from "semantic-ui-react";
export default class CustomerProfilePage extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.id) {
      throw Error("Profile id cannot be empty /undefined");
    }
    this.state = {
      profileId: this.props.match.params.id,
      getProfileResponse: "",
      errorMessage: "",
      tabToBeRendered: "profile",
      getOrderDetailsResponseCharts: "",
      getOrderDetailsResponseHistory: "",
      ordersInfoChart: "",
      ordersInfoHistory: "",
      submittedOrdersCount: 0,
      fulfilledOrdersCount: 0,
      cancelledOrdersCount: 0,
      orderTotals: 0,
      totalCount: 0
    };
  }
  getProfileDetails(profileId) {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("token")
    };
    makeGetCall(PROFILES_URI + profileId, headers).then(response => {
      if (response.profileDetail) {
        self.setState({
          getProfileResponse: response
        });
      }
      if (response.errorCode) {
        alert(response.message);
        self.setState({
          errorMessage: response.message
        });
      }
    });
  }
  getOrderDetails(queryParams, tabToBeRenderecNow, callBackFunction) {
    var self = this;
    var headers = { Authorization: sessionStorage.getItem("token") };
    makeGetCall(HISTORY, headers, queryParams).then(response => {
      if (callBackFunction) {
        callBackFunction(response);
      }
      if (tabToBeRenderecNow === "activityTab") {
        self.setState({
          getOrderDetailsResponseCharts: response
        });
      } else if (tabToBeRenderecNow === "orderHistoryTab") {
        self.setState({
          getOrderDetailsResponseHistory: response
        });
      }
      if (response.errorCode) {
        alert(response.message);
        self.setState({ errorMessage: response.message });
      }
    });
  }
  componentWillUnmount() {
    if (this.state.profileId) {
      this.setState({});
    }
  }
  componentDidMount() {
    console.log("in componentDidMount");
    if (this.state.profileId) {
      /* this.setState(function(prevstate, props) {
        return { profileId: props.profileId };
      }); */
      this.getProfileDetails(this.state.profileId);
    }
  }
  countOfOrders(response) {
    let orderTotals = 0;
    let totalCount = response.totalResults;
    let countSubmitted = 0;
    let countCancelled = 0;
    let countFulfilled = 0;
    response.items.forEach(function(order) {
      if (order.state === "SUBMITTED") {
        countSubmitted++;
        orderTotals = orderTotals + order.priceInfo.total;
      }
      if (order.state === "NO_PENDING_ACTION") {
        countFulfilled++;
        orderTotals = orderTotals + order.priceInfo.total;
      }
      if (order.state === "REMOVED") {
        countCancelled++;
      }
    });
    this.setState({
      submittedOrdersCount: countSubmitted,
      fulfilledOrdersCount: countFulfilled,
      cancelledOrdersCount: countCancelled,
      orderTotals: orderTotals.toFixed(0),
      totalCount: totalCount
    });
  }
  onClickHandler(e) {
    //alert(e.target.name);
    if (e.target.name) {
    }
    if (e.target.name === "profileInfoTab") {
      this.setState({
        tabToBeRendered: "profile"
      });
    } else if (e.target.name === "activityTab") {
      this.setState({
        tabToBeRendered: "charts"
      });
      var queryParams1 = {
        sort: "submittedDate:desc",
        queryFormat: "SCIM",
        q: `profileId eq "${this.state.profileId}"`
      };
      this.getOrderDetails(
        queryParams1,
        e.target.name,
        this.countOfOrders.bind(this)
      );
    } else if (e.target.name === "orderHistoryTab") {
      this.setState({
        tabToBeRendered: "orders"
      });
      var queryParams2 = {
        offset: 0,
        limit: 20,
        sort: "submittedDate:desc",
        queryFormat: "SCIM",
        q: `profileId eq "${this.state.profileId}" AND state eq "SUBMITTED"`
      };
      this.getOrderDetails(queryParams2, e.target.name);
    }
  }
  render() {
    console.log("in render");
    let profileDetails = this.state.getProfileResponse
      ? this.state.getProfileResponse.profileDetail
      : null;
    var profileInfo = null;
    if (this.state.profileId && profileDetails) {
      profileInfo = (
        <ProfileInfo
          firstName={profileDetails.firstName}
          lastName={profileDetails.lastName}
          email={profileDetails.email}
          receiveEmail={profileDetails.receiveEmail}
        />
      );
    }
    let TabToBeRendered = null;
    if (this.state.tabToBeRendered === "profile") {
      TabToBeRendered = profileInfo;
    }
    //charts,orders
    if (this.state.tabToBeRendered === "charts") {
      let ordersHistoryInfo1 = this.state.getOrderDetailsResponseCharts
        ? this.state.getOrderDetailsResponseCharts
        : null;
      var ordersInfo1 = ordersHistoryInfo1 ? (
        <OrderHistoryLineChart response={ordersHistoryInfo1} />
      ) : null;
      let goodnessIndicator = "Nascent";
      let percentageOfCancelledOrders =
        (this.state.cancelledOrdersCount / this.state.totalCount) * 100;
      if (percentageOfCancelledOrders > 50) {
        goodnessIndicator = "Frequent Canceller";
      }
      if (this.state.orderTotals > 1000) {
        goodnessIndicator = "Valued";
      }
      TabToBeRendered = (       
        <Container>                  
          <Grid columns={2}>
                 <Grid.Row>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>{goodnessIndicator}</Statistic.Value>
                  <Statistic.Label>Customer Indicator</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{`#${
                    this.state.totalCount
                  }`}</Statistic.Value>
                  <Statistic.Label>Orders Count</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{`$${
                    this.state.orderTotals
                  }`}</Statistic.Value>
                  <Statistic.Label>Total Order Worth</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="container">{ordersInfo1} </div>
              </Grid.Column>
              <Grid.Column>
                <div className="container">
                  <OrderHistoryPieChart
                    response={{
                      submittedOrdersCount: this.state.submittedOrdersCount,
                      fulfilledOrdersCount: this.state.fulfilledOrdersCount,
                      cancelledOrdersCount: this.state.cancelledOrdersCount,
                      orderTotals: this.state.orderTotals
                    }}
                  />{" "}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>          
        </Container>
      );
    }
    if (this.state.tabToBeRendered === "orders") {
      let ordersHistoryInfo2 = this.state.getOrderDetailsResponseHistory
        ? this.state.getOrderDetailsResponseHistory
        : null;
      var ordersInfo2 = ordersHistoryInfo2 ? (
        <OrderHistory resp={ordersHistoryInfo2} />
      ) : null;
      TabToBeRendered = <div className="container">{ordersInfo2}</div>;
    }
    return (
      <Container>
        <Grid columns={3}>
          <Grid.Row />
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={2} />
            <div className=" three  ui buttons">
              <button
                onClick={this.onClickHandler.bind(this)}
                name="profileInfoTab"
                className="ui button active"
              >
                Profile Details
              </button>
              <button
                onClick={this.onClickHandler.bind(this)}
                name="activityTab"
                className="ui button"
              >
                Activity
              </button>
              <button
                onClick={this.onClickHandler.bind(this)}
                name="orderHistoryTab"
                className="ui button"
              >
                Orders History
              </button>
            </div>
          </Grid.Row>
          <Grid.Row>{TabToBeRendered}</Grid.Row>
        </Grid>
      </Container>
    );
  }
}