import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  saveOrderIdAccessed(orderDetailsObject) {
    console.log("------------->search result click", this.props);
    if (orderDetailsObject===undefined){
      throw TypeError("Check Order Details Object value")
    }
     else if (this.props.onClickViewOrderIdLink) {
      this.props.onClickViewOrderIdLink(orderDetailsObject.orderInfo.orderId);
    }
  }

  render() {
    console.log("hi hello", this.props.resp.totalOrders);
    if (this.props.resp.totalOrders === 0) {
      return (
        <div>
          <hr />
          <h5>No Search resutls found for provided criteria...</h5>
        </div>
      );
    }
    return (
      <div className="Container">
        <div className="row">
          <h3>Search Results:</h3>
          <hr />
          <table className="table table-bordered">
            <TableHeader />

            <TableBody
              onSearchResultClick={this.saveOrderIdAccessed.bind(this)}
              searchResults={this.props.resp.ordersList}
            />
          </table>
        </div>
      </div>
    );
  }
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Submitted Date</th>
        <th>Status</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Order Total</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  let orderResults = props.searchResults;
  var firstName = ""
  var lastName = ""
  var email = ""
  var element = orderResults.map(orderDetail => {
    if(!orderDetail.profile){
      firstName = "ANONYMOUS"
      lastName = "ANONYMOUS"
      email = "ANONYMOUS"
    }else{
      firstName = orderDetail.profile.firstName;
      lastName = orderDetail.profile.lastName;
      email = orderDetail.profile.customerEmail;
    }
    return (
      <tr key={orderDetail.id}>
        <td><a href={"/orders/"+orderDetail.id} onClick={<Redirect to={"/orders/"+orderDetail.id} />}>{orderDetail.id}</a></td>
        <td>{new Intl.DateTimeFormat('en-US').format(new Date(orderDetail.submittedDate))}</td>
        <td>{orderDetail.stateDetailsAsUser}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{orderDetail.priceListGroup.currency.symbol+""+orderDetail.priceInfo.total}</td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}
export default SearchResults;
