import React, { Component } from "react";
import LineItem from "./LineItem.jsx";
import { Table } from "semantic-ui-react";
export default class OrderedCartItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let lineItems = this.props.shoppingCartItems.map(function (item) {
            return MakeLineItem(item);
        });

        return (
            <div className="container">
                <div className="row">
                    <Table textAlign="center" color={"black"} singleLine>
                        <TableHeader />
                        <Table.Body>{lineItems}</Table.Body>
                    </Table>
                </div>
            </div>
        );
    }
}

function TableHeader() {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign="left">Item</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Unit Price</Table.HeaderCell>
                <Table.HeaderCell>Item Total</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

function MakeLineItem(props) {
    if (!props) {
        return null;
    }

    return <LineItem item={props} />;
}
