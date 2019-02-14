import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { HISTORY } from "../../../Rest/RestConstants";
const NO_FILTER_CONSTANT="Select Reason";
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonSelected:"",
      searchOrderResponse:"",
      getResponses:[],
      showCancelReasons:false
    };
  }
  
  getOrderDetail(orderId) {
    var self = this;

    if (!orderId) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", orderId);

    var uri = HISTORY+orderId+"?q=includeResultfull";

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("Get Response is ============>", response)
      let localResp=[...self.state.getResponses,response]
        self.setState({  getResponses:localResp})
    });
  }

  doDisplayCancelReason(e) {
    e.preventDefault();
      var element = this.props.resp.ordersList.map(orderDetail => {
        console.log("will do get call with",orderDetail.id);
        this.getOrderDetail(orderDetail.id)
      });
      if(element){
        this.setState({showCancelReasons:true})
      }
  }

  onChange(e) {  
    this.setState({ reasonSelected: e.target.value });
  }

  render() {
    let orderGetResponse =null;
    let searchResults =null;
    let cancelHeader = "";
    let normalHeader = "";
    let selectElement = null;
    console.log("hi hello", this.props.resp.id);
    if(this.state.showCancelReasons == true){
      selectElement = <DisplayListBox selectedReason={this.state.reasonSelected} onChange = {this.onChange.bind(this)}/>
      cancelHeader = <CancelReasonTableHeader />
      orderGetResponse = <CancelReasonTableBody orderGetResponse={this.state.getResponses} filterValue={this.state.reasonSelected!==""?this.state.reasonSelected:NO_FILTER_CONSTANT}/>
    }else{
      normalHeader = <TableHeader />
      searchResults = <TableBody searchResults={this.props.resp.ordersList}/>
    }
    return (
      <div className="Container">
      <form>
          <div className="row">
            <div className="form-group col-md-4" />
            <div className="form-group col-md-4" />
            <div className="form-group col-md-2" />
            <div className="form-group col-md-1">
            </div>
            <div className="form-group col-md-0.75">
              <button
                onClick={this.doDisplayCancelReason.bind(this)}
                className="btn btn-primary">
                Show Cancellation Reasons
              </button>
            </div>
            {selectElement}
          </div>
        </form>
        <div className="row">
          <h3>Search Results:</h3>
          <hr />
          <table className="table table-bordered">
            {normalHeader}
            {cancelHeader}
            {searchResults}
            {orderGetResponse}
          </table>
        </div>
      </div>
    );
  }
}

function CancelReasonTableHeader() {
  return (
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Customer Email</th>
        <th>Cancellation Reason</th>
      </tr>
    </thead>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Customer Email</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  let orderResults = props.searchResults;
  var element = orderResults.map(orderDetail => {
    return (
      <tr key={orderDetail.id}>
        <td><a href={"/orders/"+orderDetail.id} onClick={<Redirect to={"/orders/"+orderDetail.id} />}>{orderDetail.id}</a></td>
        <td>{orderDetail.profile.customerEmail}</td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}

function CancelReasonTableBody(props) {
  let selectedFilterValue=props.filterValue
  let getOfAllOrders = props.orderGetResponse;
  var element = getOfAllOrders.map(orderDetail => {
    if(NO_FILTER_CONSTANT===selectedFilterValue){
      return (
        <tr key={orderDetail.id}>
        <td><a href={"/orders/"+orderDetail.id} onClick={<Redirect to={"/orders/"+orderDetail.id} />}>{orderDetail.id}</a></td>
        <td>{orderDetail.profile.email}</td>
        {<td>{orderDetail.cancelReason}</td>}
      </tr>
    )

    } else if(selectedFilterValue===orderDetail.cancelReason){
      return (
        <tr key={orderDetail.id}>
        <td><a href={"/orders/"+orderDetail.id} onClick={<Redirect to={"/orders/"+orderDetail.id} />}>{orderDetail.id}</a></td>
        <td>{orderDetail.profile.email}</td>
        {<td>{orderDetail.cancelReason}</td>}
      </tr>
    )
  }
});
    return <tbody>{element}</tbody>;
}

function DisplayListBox(props){
  return (
    <div className="form-group col-md-2">
    <select value={props.reasonSelected}
    name="reasonsFilter"
    onChange={props.onChange}
    className="form-control">
    <option value="Select Reason">Select Reason...</option>
    <option value="Better competitor price">Better competitor price</option>
      <option value="Bad product review">Bad product review</option>
      <option value="Item available at discount currently">Item available at discount currently</option>
      <option value="No longer needed">No longer needed</option>
      <option value="Change of mind">Change of mind</option>
    </select>
    </div>
);
}

export default SearchResults;