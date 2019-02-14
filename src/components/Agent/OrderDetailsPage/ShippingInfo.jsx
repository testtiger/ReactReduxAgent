import React, { Component } from "react";
import { Card, Divider, Header, Image, Segment } from "semantic-ui-react";
export default function ShippinInfo(props) {
  let label = props.label;

  let shipping = props.address;
  return (
    <Segment basic textAlign="left">
      <Header as="h3">{label}</Header>

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
