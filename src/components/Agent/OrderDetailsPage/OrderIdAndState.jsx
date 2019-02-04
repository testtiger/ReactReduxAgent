import React, { Component } from "react";

export default function OrderIDAndState(props) {
    //// orderId  vsubmittedDate
    var stateDetailsAsUser = props.stateDetailsAsUser;
    var orderId = props.orderId;
    var submittedDate = props.submittedDate + "";
    submittedDate = submittedDate.substring(0, 10);

    return (
        <h3>{`Order# ${orderId} | Ordered On: ${submittedDate} | Status: ${stateDetailsAsUser} `}</h3>
    );
}
