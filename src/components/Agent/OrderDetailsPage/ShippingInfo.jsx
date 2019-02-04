import React, { Component } from "react";
import { Card, Divider, Header, Image, Segment } from "semantic-ui-react";
export default function ShippinInfo(props) {
  let shipping = {
    lastName: "k",
    country: "US",
    address2: "line2",
    city: "alabama",
    address1: "line1",
    postalCode: "36006",

    firstName: "Diwakara",
    phoneNumber: "789456123",
    stateName: "Alabama",
    state: "AL",
    countryName: "United States",
    email: "some1@gmail.com"
  };
  return (
    <Segment basic textAlign="left">
      <Header as="h3">ShippinInfo</Header>

      <span> {`${shipping.firstName} ${shipping.lastName}`}</span>
      <br />
      <span> {`${shipping.address1}, ${shipping.address2}`}</span>
      <br />
      <span>{`${shipping.city}, ${shipping.stateName}, ${
        shipping.postalCode
      }`}</span>
      <br />
      <span>{`${shipping.countryName}`}</span>
      <br />
      <span>{`${shipping.phoneNumber}`}</span>
    </Segment>
  );
}
