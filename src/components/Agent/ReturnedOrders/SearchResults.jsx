import React, { Component } from "react";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { RETURNS_GET_URI } from "../../../Rest/RestConstants";
import { Redirect } from "react-router-dom";
const NO_FILTER_CONSTANT="Select Reason";
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonSelected:"",
      getResponses:[],
      showReturnReasons:false
    };
  }

  getReturnRequestDetails(returnRequstId) {
    var self = this;

    if (!returnRequstId) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", returnRequstId);
    var uri = RETURNS_GET_URI+returnRequstId;
    var headers = { Authorization: sessionStorage.getItem("token") };
    makeGetCall(uri, headers).then(response => {
      console.log("Get Response is ============>", response)
      if(!response.errorCode){
      let localResp=[...self.state.getResponses,response]
        self.setState({  getResponses:localResp})
    }
  });
  }

  doDisplayReturnReason(e) {
    e.preventDefault();
    var element = this.props.resp.map(returnDetail => {
      console.log("will do get call with",returnDetail.returnRequestId);
        this.getReturnRequestDetails(returnDetail.returnRequestId)
      });
      if(element){
        this.setState({showReturnReasons:true})
      }
  }

  onClickHandler(orderId) {
    return <Redirect to={"/orders/" + orderId} />;
  }

  onChange(e) {  
    this.setState({ reasonSelected: e.target.value });
  }

  render() {
    let returnGetResponse =null;
    let returnRequestResults =null;
    let showReasonsTableHeader = null;
    let returnsTableHeader = null;
    let selectElement = null;
    if(this.state.showReturnReasons == true){
      selectElement = <DisplayListBox selectedReason={this.state.reasonSelected} onChange = {this.onChange.bind(this)}/>
      returnGetResponse = <ReturnReasonTableBody returnGetResponse={this.state.getResponses} filterValue={this.state.reasonSelected!==""?this.state.reasonSelected:NO_FILTER_CONSTANT}/>
      showReasonsTableHeader = <ReturnsReasonsTableHeader />
    }else{
      returnRequestResults = <TableBody returnRequestResults={this.props.resp}/>
      returnsTableHeader = <TableHeader />
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
                onClick={this.doDisplayReturnReason.bind(this)}
                className="btn btn-primary">
                Show Return Reasons
              </button>
            </div>
            {selectElement}
          </div>
        </form>
        <div className="row">
          <h3>Search Results:</h3>
          <hr />
          <table className="table table-bordered">
            {returnsTableHeader}
            {showReasonsTableHeader}
            {returnRequestResults}
            {returnGetResponse}
          </table>
        </div>
      </div>
    );
  }
}

function ReturnsReasonsTableHeader() {
  return (
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Return Number</th>
        <th>Return Reason</th>
      </tr>
    </thead>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Return Number</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  let returnResults = props.returnRequestResults;
  var element = returnResults.map(returnResult => {
    return (
      <tr key={returnResult.returnRequestId}>
      <td><a href={"/orders/"+returnResult.orderId} onClick={<Redirect to={"/orders/"+returnResult.orderId} />}>{returnResult.orderId}</a></td>
        <td>{returnResult.returnRequestId}</td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}

function ReturnReasonTableBody(props) {
  let selectedFilterValue=props.filterValue
  let getOfAllReturnRequests = props.returnGetResponse;
  var element = getOfAllReturnRequests.map(requestDetail => {
    var returnedItems = requestDetail.returnItems.map(returnItem => {
      if(NO_FILTER_CONSTANT===selectedFilterValue){
        return (
          <tr key={requestDetail.returnRequestId}>
          <td><a href={"/orders/"+requestDetail.orderInfo.orderId} onClick={<Redirect to={"/orders/"+requestDetail.orderInfo.orderId} />}>{requestDetail.orderInfo.orderId}</a></td>
          <td>{requestDetail.returnRequestId}</td>
          <td>{returnItem.returnReason}</td>
          </tr>
      )

      } else if(selectedFilterValue===returnItem.returnReason){
        return (
          <tr key={requestDetail.returnRequestId}>
          <td><a href={"/orders/"+requestDetail.orderInfo.orderId} onClick={<Redirect to={"/orders/"+requestDetail.orderInfo.orderId} />}>{requestDetail.orderInfo.orderId}</a></td>
          <td>{requestDetail.returnRequestId}</td>
          <td>{returnItem.returnReason}</td>
          </tr>
      )
        }
    });
    return returnedItems;
  });
    return <tbody>{element}</tbody>;
}

function DisplayListBox(props){
    return (
    <div className="form-group col-md-2">
    <select value={props.selectedReason}
    name="reasonsFilter"
    onChange={props.onChange}
    className="form-control">
    <option value="Select Reason">Select Reason...</option>
    <option value="Incorrect Item">Incorrect Item</option>
      <option value="Did Not Meet Expectations">Did Not Meet Expectations</option>
      <option value="Incorrect Color">Incorrect Color</option>
      <option value="Did Not Like">Did Not Like</option>
    </select>
    </div>
  );
}

export default SearchResults;