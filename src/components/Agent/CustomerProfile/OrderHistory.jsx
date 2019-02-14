import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Table } from "semantic-ui-react";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {    

    let lineItems = this.props.resp.items.map(item => LineItem(item));

    return (
        <div>
        <h3>Orders History</h3> 
        <br/>
        <h3>Showing only the first 20 orders</h3>
        <Table textAlign="center" color={"black"} singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Order Total</Table.HeaderCell>
            <Table.HeaderCell>Discounts</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{lineItems}</Table.Body>
      </Table>
      </div>
    );
  }
}

function LineItem(props) {
  if (!props) {
    return null;
  }

  return (
    <Table.Row key={props.id}>
      <Table.Cell textAlign="center">
        <a href={"/orders/" + props.id}>{props.id}</a>             
      </Table.Cell>
      <Table.Cell textAlign="center">
        <span>{props.state}</span>
      </Table.Cell>
      <Table.Cell textAlign="center">
        <span>{props.priceInfo.total}</span>
      </Table.Cell>
      <Table.Cell textAlign="center">
        <span>{props.priceInfo.discountAmount}</span>
      </Table.Cell>
    </Table.Row>
  );
}
