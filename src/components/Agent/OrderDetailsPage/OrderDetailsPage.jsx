import React, { Component } from "react";
import OrderIdAndState from "./OrderIdAndState.jsx";
import CustomerInfo from "./CustomerInfo.jsx";
import OrderedCartItems from "./OrderedCartItems.jsx";
import ShippingInfo from "./ShippingInfo.jsx";
import { Grid, Container } from "semantic-ui-react";
import OrderSummary from "./OrderSummary.jsx";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { ORDERS_URI } from "../../../Rest/RestConstants";
import LoginPage from "../LoginPage/loginpage";
export default class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.id) {
      throw Error("order id cannot be empty /undefined");
    }
    this.state = {
      getOrderResponse: null
    };
  }

  getOrderDetails() {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("token")
    };
    var queryParams = { includeResult: "full" };
    makeGetCall(
      ORDERS_URI + self.props.match.params.id,
      headers,
      queryParams
    ).then(response => {
      if (response) {
        self.setState({
          getOrderResponse: response
        });
      }
      if (response.errorCode) {
        alert(response.message);
      }
    });
  }
  componentDidMount() {
    this.getOrderDetails();
  }
  render() {
    var orderResp = null;
    var pageToBeRendered = null;
    if (!this.isLoggedIn()) {
      return <LoginPage />;
    } else if (this.state.getOrderResponse !== null) {
      orderResp = this.state.getOrderResponse;
      console.log("-----814", orderResp);
      var stateDetailsAsUser = orderResp.stateString;
      var submittedDate = orderResp.submittedDate;
      var orderId = orderResp.id;
      var siteID = orderResp.siteId;

      var shippingGroups = orderResp.shippingGroups;

      var priceListGroup = orderResp.priceListGroup;
      var priceInfo = orderResp.priceInfo;
      var customerInfo = orderResp.profile;
      var shoppingCart = orderResp.shoppingCart;

      var shippingAddress = shippingGroups[0].shippingAddress;
      var shippingMethodName = shippingGroups[0].shippingMethod.displayName;

      return (
        <Container textAlign="center">
          <Grid columns={3}>
            <Grid.Row />
            <Grid.Row />

            <Grid.Row>
              <OrderIdAndState
                stateDetailsAsUser={stateDetailsAsUser}
                submittedDate={submittedDate}
                orderId={orderId}
              />
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <CustomerInfo customerInfo={customerInfo} />
              </Grid.Column>
              <Grid.Column />

              <Grid.Column>
                <OrderSummary
                  priceInfo={priceInfo}
                  currecySybmol={priceListGroup.currency.symbol}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <OrderedCartItems shoppingCart={shoppingCart} />
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <ShippingInfo
                  label={"Shipping Address"}
                  address={shippingAddress}
                />
              </Grid.Column>
              <Grid.Column />
              <Grid.Column>
                <ShippingInfo
                  label={"Billing Address"}
                  address={shippingAddress}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    } else {
      return null;
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }
}

/**
 *
 *  <OrderIdAndState />
        <CustomerInfo />

        <ShippingInfo /> */
