import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Grid, GridRow } from "semantic-ui-react";

var navLinksTyle = {
  textDecoration: "none",
  color: "black"
};
class Navigation extends Component {
  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }

  componentDidUpdate() {}
  render() {
    if (!this.isLoggedIn()) {
      return null;
    }

    return (
      <Container>
        <Grid>
          <GridRow />

          <GridRow columns={7}>
            <Grid.Column>
              <NavLink activeStyle={navLinksTyle} to="/welcome">
                DashBoard
              </NavLink>
            </Grid.Column>

            <Grid.Column>
              <NavLink activeStyle={navLinksTyle} to="/customers">
                Customers
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink activeStyle={navLinksTyle} to="/ManageAgents">
                Manage Agents
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/orders">Order Search</NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/returns">Returns Search</NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/cancelledOrders">Cancelled Orders</NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/returnedOrders">Returned Orders</NavLink>
            </Grid.Column>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}
export default Navigation;
