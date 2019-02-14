import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import {
  makeGetCall,
  makeRestcall,
  makePostCall
} from "../../../Rest/agent-rest-client";
import {
  ADMIN_ROLES_URI,
  MFA_LOGIN,
  ADMIN_AUTH_PAYLOAD
} from "../../../Rest/RestConstants";

export default class AgentsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geresp: null
    };
  }
  onClick(value, e) {
    console.log(value);
    this.props.callBack(value);
  }

  getAllAgents() {
    var self = this;
    var headers = {
      Authorization: sessionStorage.getItem("Mtoken")
    };
    var uri =
      ADMIN_ROLES_URI +
      `?totalResults=true&offset=0&limit=40&sort=lastName:asc`;
    makeGetCall(uri, headers).then(response => {
      if (response) {
        self.setState({ geresp: response });
      }
      if (response.errorCode) {
        alert(response.message);
      }
    });
  }

  makeLoginAndGetAllAgents() {
    var self = this;
    makeRestcall("POST", MFA_LOGIN, ADMIN_AUTH_PAYLOAD).then(response => {
      console.log(response);
      if (response.access_token) {
        sessionStorage.setItem("Mtoken", "Bearer " + response.access_token);
        self.getAllAgents();
      } else {
        alert("Invalid user Name & password");
      }
    });
  }
  componentDidMount() {
    this.makeLoginAndGetAllAgents();
  }
  render() {
    var resp = {
      total: 17,
      totalResults: 17,
      offset: 0,
      externallyManaged: false,
      limit: 17,
      links: [
        {
          rel: "self",
          href:
            "http://busgk0711.us.oracle.com:9080/ccadminui/v1/adminProfiles?totalResults=true&offset=0&limit=40&sort=lastName%3Aasc"
        }
      ],
      sort: [{ property: "lastName", order: "asc" }],
      items: [
        {
          firstName: "Diwakara",
          lastName: "123",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99438",
          registrationDate: "2019-02-05T16:02:28.737Z",
          active: true,
          id: "iuser99438",
          email: "diwakar.kumar12321377@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "123",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99520",
          registrationDate: "2019-02-05T16:51:59.774Z",
          active: true,
          id: "iuser99520",
          email: "diwakar.1232kumar77@gmail.com"
        },
        {
          firstName: "213",
          lastName: "123",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99505",
          registrationDate: "2019-02-05T16:40:53.545Z",
          active: true,
          id: "iuser99505",
          email: "diwakar.kumar21377@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "123",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99496",
          registrationDate: "2019-02-05T16:33:44.862Z",
          active: true,
          id: "iuser99496",
          email: "diwakar.kumar77123@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "213",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99441",
          registrationDate: "2019-02-05T16:03:36.899Z",
          active: true,
          id: "iuser99441",
          email: "123.kumar77@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "213",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99512",
          registrationDate: "2019-02-05T16:42:53.071Z",
          active: true,
          id: "iuser99512",
          email: "213@123.com"
        },
        {
          firstName: "Diwakara",
          lastName: "231",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentSupervisorRole" }],
          repositoryId: "iuser97873",
          registrationDate: "2019-02-05T13:24:42.859Z",
          active: true,
          id: "iuser97873",
          email: "abcd.kumar77123123@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "231",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentSupervisorRole" }],
          repositoryId: "iuser97760",
          registrationDate: "2019-02-05T12:23:46.304Z",
          active: true,
          id: "iuser97760",
          email: "diwakar.kumar7712@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "231",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser97674",
          registrationDate: "2019-02-05T12:13:46.950Z",
          active: false,
          id: "iuser97674",
          email: "diwakar.kumar77@gmail.com"
        },
        {
          firstName: "Diwakara",
          lastName: "231",
          external: false,
          tourComplete: null,
          createdBy: "admin",
          roles: [{ repositoryId: "csAgentRole" }],
          repositoryId: "iuser99476",
          registrationDate: "2019-02-05T16:17:19.022Z",
          active: true,
          id: "iuser99476",
          email: "918142785662@123.com"
        }
      ]
    };

    if (this.state.geresp === null) {
      return null;
    }

    resp = this.state.geresp;
    var self = this;
    var tboady = resp.items.map(function(profile) {
      let flag = false;
      for (let i = 0; i < profile.roles.length; i++) {
        if (
          profile.roles[i].repositoryId === "csAgentSupervisorRole" ||
          profile.roles[i].repositoryId === "csAgentRole"
        ) {
          flag = true;
        }
      }
      if (flag == true) {
        return (
          <Table.Row key={profile.id}>
            <Table.Cell textAlign="left">
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </Table.Cell>
            <Table.Cell textAlign="left">
              <span>{profile.lastName}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{profile.email}</span>
            </Table.Cell>
            <Table.Cell>
              <button onClick={self.onClick.bind(self, profile.id)}>
                ViewProfile
              </button>
            </Table.Cell>
          </Table.Row>
        );
      }
    });
    return (
      <Table color={"black"} singleLine>
        <TableHeader />
        <Table.Body>{tboady}</Table.Body>
      </Table>
    );
  }
}

function TableHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign="left">FirtName</Table.HeaderCell>
        <Table.HeaderCell>LastName</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>ViewProfile</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
