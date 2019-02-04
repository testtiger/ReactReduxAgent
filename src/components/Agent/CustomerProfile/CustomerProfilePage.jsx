import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { PROFILES_URI } from "../../../Rest/RestConstants";
import OrderHistoryLineChart from "./Activity/OrderHistoryLineChart"

import {
  Card,
  Container,
  Grid,
  Button,
  Checkbox,
  Form,
  Header,
  Image
} from "semantic-ui-react";
export default class CustomerProfilePage extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.id) {
      throw Error("Profile id cannot be empty /undefined");
    }
    if (this.props.match.params.id) {
      alert(this.props.match.params.id);
    }
    this.state = {
      profileId: this.props.match.params.id,
      getProfileResponse: "",
      errorMessage: "",
      tabToBeRendered: "profile"
    };
  }

  getProfileDetails(profileId) {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("token")
    };
    makeGetCall(PROFILES_URI + profileId, headers).then(response => {
      console.log("psots are ============>" + response);
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

  onClickHandler(e) {
    alert(e.target.name);
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
    } else if (e.target.name === "orderHistoryTab") {
      this.setState({
        tabToBeRendered: "orders"
      });
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
      TabToBeRendered = <OrderHistoryLineChart/>;
    }
    if (this.state.tabToBeRendered === "orders") {
      TabToBeRendered = <h1>Order hoitory will come</h1>;;
    }

    return (
      <Container>
        <Grid columns={3}>
          <Grid.Row />
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={2} />
            <div class=" three  ui buttons">
              <button
                onClick={this.onClickHandler.bind(this)}
                name="profileInfoTab"
                class="ui button active"
              >
                Profile Details
              </button>
              <button
                onClick={this.onClickHandler.bind(this)}
                name="activityTab"
                class="ui button"
              >
                Activity
              </button>
              <button
                onClick={this.onClickHandler.bind(this)}
                name="orderHistoryTab"
                class="ui button "
              >
                OrderHistory
              </button>
            </div>
          </Grid.Row>
          <Grid.Row>{TabToBeRendered}</Grid.Row>
        </Grid>
      </Container>
    );
  }
}
