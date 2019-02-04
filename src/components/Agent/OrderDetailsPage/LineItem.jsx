import React, { Component } from "react";
import { Table } from "semantic-ui-react";
export default class LineItem extends Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 1 };
    }
    onQuantityChange(e) {
        let quantity = +e.target.value;

        if (typeof quantity === "string" || typeof quantity === "number") {
            quantity = +quantity;
            if (quantity !== quantity || quantity === 0) {
                quantity = 1;
            }
        }

        this.setState({ quantity: quantity });
    }
    render() {
        let item = this.props.item;
        let skuId = item.catRefId;
        let productName = item.displayName;
        let salePrice = item.salePrice;
        let listPrice = item.listPrice;
        let shippingSurcharge = item.shippingSurcharge;
        let productId = item.productId;
        let status = item.active;

        let priceToDisplay = +(salePrice ? salePrice : listPrice);
        let itemSubTotal = item.overriddenPrice
            ? item.overriddenPrice
            : item.rawTotalPrice;

        let quantity = item.quantity;

        return (
            <Table.Row key={skuId}>
                <Table.Cell textAlign="left">
                    <span>{productName}</span>
                    <br />
                    <span>{productId}</span>
                    <br />
                    <span>{skuId}</span>
                </Table.Cell>
                <Table.Cell>
                    <span>{quantity}</span>
                </Table.Cell>
                <Table.Cell>
                    <span>{1 + "@" + priceToDisplay}</span>
                </Table.Cell>
                <Table.Cell>
                    <span>{itemSubTotal}</span>
                </Table.Cell>
            </Table.Row>
        );
    }
}
