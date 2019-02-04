import React, { Component } from "react";
import { Segment, Card, Icon, Image } from "semantic-ui-react";
export default class CustomerInfo extends Component {
    render() {
        var profile = this.props.customerInfo;

        /**
         *   "firstName": "agentprof",
          "lastName": "agentprof",
          "middleName": null,
          "email": "agentprofile@cc1549005129356.com"
      }
         */
        return (
            <Segment basic textAlign="center">
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <span>
                                <Icon name="user" />{" "}
                                {profile.firstName + " " + profile.firstName}
                            </span>
                        </Card.Header>
                        <Card.Description>{profile.email}</Card.Description>
                        <Card.Description>{profile.email}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>ViewProfile</a>
                    </Card.Content>
                </Card>
            </Segment>
        );
    }
}
