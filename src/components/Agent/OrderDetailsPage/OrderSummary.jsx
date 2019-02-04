import React, { Component } from "react";
import { Segment, Grid, Card } from "semantic-ui-react";
export default function OrderSummary(props) {
    var priceInfo = props.priceInfo;
    return (
        <Segment basic textAlign="center">
            <Card>
                <Card.Content>
                    <Card.Header>
                        <span>{"Order Summary"}</span>
                    </Card.Header>
                    <Card.Description>
                        {`Item(s) Subtotal :`}
                        {`${props.currecySybmol}${priceInfo.amount}`}

                        {`Shipping :`}
                        {`${props.currecySybmol}${priceInfo.shipping}`}

                        {`Tax :`}
                        {`${props.currecySybmol}${priceInfo.tax}`}
                        <hr />

                        <strong>{`Grand Total :`}</strong>

                        <strong>{`${props.currecySybmol}${priceInfo.total}`}</strong>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Segment>
    );
}
