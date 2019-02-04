import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function TableHeader() {
  return (
    <thead className="thead-light">
      <tr>
        <th scope="col">Order Id</th>
        <th scope="col">Customer Name</th>
        <th scope="col">Order Total</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  props = props.recentOrdersList;

  var orderMapCallBack = function(order) {
    return (
      <tr key={order.orderId}>
        <td>
          <a href={"/orders/" + order.orderId}>{order.orderId}</a>
        </td>
        <td>{order.customerName}</td>
        <td>{order.amount}</td>
      </tr>
    );
  };

  if (props) {
    return <tbody>{props.map(orderMapCallBack)}</tbody>;
  }
  return null;
}

class RecentOrders extends Component {
  onClickHandler(orderId) {
    alert(orderId);
    return <Redirect to={"/orders/" + orderId} />;
  }
  render() {
    return (
      <div className="table-responsive">
        <h3>Recent orders</h3>
        <table className="table table-bordered table-responsive">
          <TableHeader />
          <TableBody
            recentOrdersList={
              this.props.recentOrders ? this.props.recentOrders : []
            }
            onClick={this.onClickHandler.bind(this)}
          />
        </table>
      </div>
    );
  }
}

export default RecentOrders;
