import React, { Component } from "react";

import { makeGetCall } from "../../../Rest/agent-rest-client";
import { ADMIN_ROLES_URI } from "../../../Rest/RestConstants";
import { Icon, Card, Container, Grid } from "semantic-ui-react";
export default class AgentProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      roles: [],
      active: "",
      getProfileResponse: null
    };
  }
  getProfileDetails(profileId) {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("Mtoken")
    };
    makeGetCall(ADMIN_ROLES_URI + profileId, headers).then(response => {
      console.log("psots are ============>" + response);
      if (response.firstName) {
        self.setState({
          getProfileResponse: response
        });
      }
      if (response.errorCode) {
        self.setState({
          errorMessage: response.message
        });
      }
    });
  }
  componentDidMount() {
    this.getProfileDetails(this.props.profileId);
  }
  render() {
    var profile = null;
    if (this.state.getProfileResponse === null) {
      return null;
    } else {
      profile = this.state.getProfileResponse;
      let active = profile.active ? "ACTIVE" : "INACTIVE";
      return (
        <Container>
          <Grid columns={3}>
            <Grid.Row />
            <Grid.Row />
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <span>
                      <Icon name="user" />
                      {`${profile.firstName} ${profile.lastName}`}
                    </span>
                  </Card.Header>
                  <Card.Description>{profile.email}</Card.Description>
                  <Card.Description>
                    {profile.roles[0].repositoryId}
                  </Card.Description>
                  <Card.Description>Status :{active}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
}
