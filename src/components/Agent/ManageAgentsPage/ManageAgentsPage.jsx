import React, { Component } from "react";
import LoginPage from "../LoginPage/loginpage";
import AgentORCustomerRegistrationForm from "./AgentORCustomerRegistrationForm";
import AgentProfile from "./AgentProfileInfo";
import AgentsListing from "./AgentsListing";
import {
  Card,
  Container,
  Grid,
  Button,
  GridRow,
  Checkbox,
  Form,
  Header,
  Image
} from "semantic-ui-react";
import {
  makePostCall,
  makeRestcall,
  makeGetCall
} from "../../../Rest/agent-rest-client";
import {
  ADMIN_ROLES_URI,
  MFA_LOGIN,
  ADMIN_AUTH_PAYLOAD
} from "../../../Rest/RestConstants";

const AGENT_SUPER_VISOR_ROLE = "csAgentSupervisorRole";

export default class ManageAgentsPage extends Component {
  constructor(props) {
    super(props);

    this.checkCurrentRole();
    this.state = {
      profileId: null,
      tabToBeRendered: null,
      isAuthorized: false
    };
  }

  checkCurrentRole() {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("token")
    };
    makeGetCall("/ccagentui/v1/adminProfiles/current", headers).then(
      response => {
        if (response.id) {
          for (let i = 0, n = response.roles.length; i < n; i++) {
            if (response.roles[i].repositoryId === AGENT_SUPER_VISOR_ROLE) {
              self.setState({ isAuthorized: true });
            }
          }
        }
        if (response.errorCode) {
          alert(response.message);
        }
      }
    );
  }

  getAgentDetails(id) {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("Mtoken")
    };
    makePostCall(ADMIN_ROLES_URI + id, headers).then(response => {
      console.log("proflie creation response  ============>", response);
      if (response.id) {
        self.setState({ profileId: response.id });
      }
      if (response.errorCode) {
        alert(response.message);
      }
    });
  }

  onClickHandler(e) {
    if (e.target.name) {
    }
    if (e.target.name === "AllAgents") {
      this.setState({
        tabToBeRendered: "AllAgents",
        profileId: null
      });
    } else if (e.target.name === "Registration") {
      this.setState({
        tabToBeRendered: "Registration",
        profileId: null
      });
    }
  }

  createProfile(payload, self) {
    var headers = {
      Authorization: sessionStorage.getItem("Mtoken")
    };
    makePostCall(ADMIN_ROLES_URI, headers, payload).then(response => {
      console.log("proflie creation response  ============>", response);
      if (response.id) {
        self.setState({ profileId: response.id });
      }
      if (response.errorCode) {
        alert(response.message);
      }
    });
  }

  registerAgentWithAdminAuthorization(payload) {
    var self = this;
    console.log("-------------------------->", payload);
    makeRestcall("POST", MFA_LOGIN, ADMIN_AUTH_PAYLOAD).then(response => {
      console.log(response);
      if (response.access_token) {
        sessionStorage.setItem("Mtoken", "Bearer " + response.access_token);
        self.createProfile(payload, self);
      } else {
        alert("Invalid user Name & password");
      }
    });
  }

  registerAgent(payload) {
    var self = this;
    if (!payload) {
      alert("Payload cannot be empty");
    }
    console.log("-------------------------->", payload);

    makeRestcall("POST", MFA_LOGIN, ADMIN_AUTH_PAYLOAD).then(response => {
      console.log(response);
      if (response.access_token) {
        // window.localStorage.setItem("isLoggedin", true);
        sessionStorage.setItem("Mtoken", "Bearer " + response.access_token);
        self.createProfile(payload, self);
      } else {
        alert("Invalid user Name & password");
      }
    });
  }

  componentWillUnmount() {
    this.setState({});
  }

  setProfile(id) {
    this.setState({
      profileId: id
    });
  }

  render() {
    var tabToBeRendered = null;
    if (this.state.isAuthorized === false) {
      return (
        <Container>
          <Grid columns={3}>
            <Grid.Row />
            <Grid.Row />
            <Grid.Row>
              <Grid.Column />
              <Grid.Column>
                <Header as="h4" color="black">
                  Access Denied
                </Header>
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
    if (this.state.tabToBeRendered === "AllAgents") {
      tabToBeRendered = <AgentsListing callBack={this.setProfile.bind(this)} />;
    } else if (
      this.state.tabToBeRendered === null ||
      this.state.tabToBeRendered === "Registration"
    ) {
      tabToBeRendered = (
        <AgentORCustomerRegistrationForm
          callRegistration={this.registerAgent.bind(this)}
        />
      );
    }
    if (this.state.profileId !== null) {
      return <AgentProfile profileId={this.state.profileId} />;
    }
    ////AllAgents,Registration,Profile
    return (
      <Container>
        <Grid columns={3}>
          <Grid.Row />
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={2} />
            <div className=" two  ui buttons">
              <button
                onClick={this.onClickHandler.bind(this)}
                name="Registration"
                className="ui button active"
              >
                Registration
              </button>
              <button
                onClick={this.onClickHandler.bind(this)}
                name="AllAgents"
                className="ui button "
              >
                Agents
              </button>
            </div>
          </Grid.Row>
          <Grid.Row>{tabToBeRendered}</Grid.Row>
        </Grid>
      </Container>
    );
  }
  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }
}
