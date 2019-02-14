import React, { Component } from "react";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import { Redirect } from "react-router-dom";
// import nl2br from 'react-newline-to-break';

class ReturnRequestDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnRequestId: "",
      getResponse: {
        "returnRequestId": "100001",
        "returnRequestStatus": "Complete",
        "isExchangeRequest": false,
        "returnItems": [
          {
            "quantityReturned": 2,
            "nonreturnable": false,
            "displayName": "The Girl with the Dragon Tattoo",
            "dynamicProperties": [],
            "externalData": [],
            "orderDiscountShare": 0,
            "skuOptionInfo": [],
            "quantityAvailableForReturn": 10,
            "commerceItemId": "ci1000466",
            "unAdjustedRefundAmount": 21.99,
            "suggestedShippingRefund": 2.92,
            "returnReasonId": "incorrectColor",
            "price": 219.89999999999998,
            "returnReason": "Incorrect Color",
            "actionCode": null,
            "promotionAdjustments": [],
            "nonReturnableReason": null,
            "quantityReceived": 1,
            "dispositionReason": {
              "displayKey": "acceptedWithRefund",
              "displayName": "Accepted With Refund"
            },
            "unitPrice": 21.99,
            "quantityToReturn": 1,
            "shippingGroup": {
              "shippingGroupId": "sg30435",
              "shippingAddress": {
                "lastName": "agentprof",
                "country": "US",
                "address3": null,
                "address2": "apt 201",
                "city": "Montgomery",
                "prefix": null,
                "address1": "600 Dexter Avenue",
                "postalCode": "36356",
                "companyName": null,
                "jobTitle": null,
                "county": null,
                "suffix": null,
                "firstName": "agentprof",
                "phoneNumber": "973-974-1234",
                "faxNumber": null,
                "alias": "Address",
                "middleName": null,
                "state": "AL",
                "email": "agentprofile@cc1549005129356.com"
              },
              "type": "hardgoodShippingGroup",
              "shippingMethod": {
                "shippingMethod": "standardShippingMethod",
                "shippingMethodDescription": "Standard"
              }
            },
            "comments": null,
            "productId": "Product_36Exy",
            "returnItemId": "100001",
            "detailedItemPriceInfo": [
              {
                "discounted": false,
                "secondaryCurrencyTaxAmount": 0,
                "amount": 263.88,
                "quantity": 12,
                "tax": 26.4,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 21.99,
                "currencyCode": "USD"
              }
            ],
            "quantityToReceive": 0,
            "suggestedTaxRefund": 2.2,
            "manualAdjustmentShare": 0,
            "catRefId": "Sku_36Fxy",
            "returnRequired": true,
            "quantityShipped": 12,
            "suggestedShippingSurchargeRefund": 0,
            "adjustedPromotionReferences": "",
            "additionalProperties": {},
            "actualRefundAmount": 21.99,
            "suggestedRefundAmount": 21.99
          }
        ],
        "profileInfo": {
          "firstName": "agentprof",
          "lastName": "agentprof",
          "middleName": null,
          "email": "agentprofile@cc1549005129356.com"
        },
        "isManuallyAdjusted": false,
        "authorizationNumber": "100001",
        "refundInfo": {
          "shippingTaxRefund": 0,
          "suggestedOtherRefund": 0,
          "suggestedTaxRefund": 2.2,
          "suggestedTotalRefund": 27.11,
          "actualShippingRefund": 2.92,
          "actualTaxRefund": 2.2,
          "otherRefund": 0,
          "suggestedShippingRefund": 2.92,
          "refundDue": 27.11,
          "returnFee": 0,
          "suggestedShippingSurchargeRefund": 0,
          "suggestedOrderRefund": 21.99,
          "unAdjustedRefundSubtotal": 21.99,
          "actualShippingSurchargeRefund": 0
        },
        "orderInfo": {
          "originOfOrder": "contactCenter",
          "priceInfo": {
            "amount": 263.88,
            "total": 328.79,
            "shipping": 35,
            "isTaxIncluded": false,
            "shippingSurchargeValue": 0,
            "tax": 29.91,
            "subTotal": 263.88,
            "orderDiscountAmount": 0,
            "currencyCode": "USD",
            "totalWithoutTax": 298.88
          },
          "orderId": "o10435",
          "sourceSystem": "Cloud Commerce",
          "priceListGroup": {
            "deleted": false,
            "isTaxIncluded": false,
            "displayName": "Default Price Group",
            "repositoryId": "defaultPriceGroup",
            "listPriceList": {
              "repositoryId": "listPrices"
            },
            "active": true,
            "salePriceList": {
              "repositoryId": "salePrices"
            },
            "currency": {
              "currencyType": null,
              "symbol": "$",
              "deleted": false,
              "displayName": "US Dollar",
              "repositoryId": "en_US",
              "fractionalDigits": 2,
              "currencyCode": "USD",
              "numericCode": "840"
            },
            "id": "defaultPriceGroup",
            "locale": "en_US",
            "shippingSurchargePriceList": {
              "repositoryId": "shippingSurchargePrices"
            }
          },
          "siteId": "siteUS",
          "creationDate": "2019-02-01T14:05:09.000Z",
          "submittedDate": "2019-02-01T14:05:26.000Z"
        },
        "promotionAdjustments": {
          "promotionAdjustmentsCount": 0,
          "orderPromotionValueAdjustments": [],
          "totalOrderDiscountAdjustment": 0,
          "nonReturnItemCostAdjustment": [],
          "manyToManyPromotionCouponAdjustment": {},
          "itemPromotionValueAdjustments": []
        },
        "isSetteled": false,
        "links": [
          {
            "rel": "self",
            "href": "http://bus00ane.us.oracle.com:9080/ccagentui/v1/returnRequests/100001"
          }
        ],
        "additionalProperties": {},
        "state": {
          "displayKey": "COMPLETE",
          "displayName": "Complete"
        },
        "operation": "",
        "paymentReversalInfo": [
          {
            "refundType": "manualRefund",
            "amount": 27.11,
            "state": "Complete",
            "currencyCode": "USD"
          }
        ]
      }
    };
  }

  getReturnRequestDetails(criteria) {
    var self = this;

    if (!criteria) {
      throw "Criteria cannot be empty";
    }

    console.log("------------>", criteria);

    var uri = "/ccagentui/v1/returnRequests/"+criteria;

    var headers = { Authorization: sessionStorage.getItem("token") };


    makeGetCall(uri, headers).then(response => {
      console.log("psots are ============>", response);
      if (response.returnRequestId) {
        self.setState({ getResponse: response });
      }
    });
  }

  componentDidMount(){
    // this.getReturnRequestDetails("100001")
  }

  render() {
    //Render Return Request Details Page
      return (
        <div className="container">
          <h3>Return Request Number - {this.state.getResponse.returnRequestId}</h3>
          <hr />
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" />
            <div className="col-md-2" />
          </div>
          <div className="Container">
          <h3>Order Details</h3>
          <div className="Container">
            <span id="orderId">Order Id : <a href="">{(this.state.getResponse.orderInfo.orderId)}</a></span>
            <span id="customerName">Customer Name : {(this.state.getResponse.profileInfo.firstName+" "+this.state.getResponse.profileInfo.lastName)}</span>
            <span id="customerEmail">Customer Email : {(this.state.getResponse.profileInfo.email)}</span>
            <span id="submissionDate">Order Submission Date : {(new Intl.DateTimeFormat('en-US').format(new Date(this.state.getResponse.orderInfo.submittedDate)))}</span>
            <span id="priceGroup">Price Group : {(this.state.getResponse.orderInfo.priceListGroup.displayName)}</span>
            <span id="site">Merchant Site : {(this.state.getResponse.orderInfo.sourceSystem)}</span>
          </div>
          <hr />
          <div className="Container">
          <h3>Return Items</h3>
          <table className=" table table-bordered table-responsive ">
            <ReturnItemsTableHeader />

            <ReturnItemsTableBody
              returnItems={this.state.getResponse}
            />
          </table>
          <div id="cc-orderReturn-refundSummary-container" class="pull-right">
          <table class="cc-padding-8-table" align = "right" role="presentation" width="380"> 
            <RefundSummaryTable
              refundInfo={this.state.getResponse}
            />
          </table>
          </div>
          <div id="cc-orderReturn-refundMethods-container" class="pull-left">
          <table class="cc-padding-8-table" align = "left" role="presentation" width="380"> 
          <RefundMethodsTableHeader />
            <RefundMethodsTable
              refundMethodInfo={this.state.getResponse}
            />
          </table>
          </div>
        </div>
      </div>
        </div>
      );
    }

  componentWillUnmount(){
    alert("Return Request Details page is unmounted");
    this.restoreOriginalState();
  }

  restoreOriginalState() {
    this.setState({
      returnRequestId: "",
      getResponse: {}
    });
  }
}

function ReturnItemsTableHeader() {
  return (
    <thead>
      <tr>
        <th>Product</th>
        <th>Returned Quantity</th>
        <th>Return Reason</th>
        <th>Disposition</th>
        <th>Comments</th>
        <th>Refund</th>
      </tr>
    </thead>
  );
}

function ReturnItemsTableBody(props) {
  let returnItems = props.returnItems;
  let currencySymbol = returnItems.orderInfo.priceListGroup.currency.symbol
  var element = returnItems.returnItems.map(returns => {
    return (
      <tr key={returns.returnItems}>
        <td align="left">{returns.displayName}</td>
        <td align="center">{returns.quantityReturned}</td>
        <td align="left">{returns.returnReason}</td>
        <td align="left">{returns.dispositionReason.displayName}</td>
        <td align="left">{returns.comments}</td>
        <td align="left">({currencySymbol+""+returns.suggestedRefundAmount})</td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}

function RefundSummaryTable(props) {
  var currency = props.refundInfo.orderInfo.priceListGroup.currency.symbol
  var refundDetails = props.refundInfo.refundInfo
  var orderLevelTotals = props.refundInfo.orderInfo.priceInfo
  return (
      <tbody>
      <tr>
        <td align="left"><h5>Summary</h5></td>
        <td align="left"><h5>Refunds</h5></td>
        <td align="left"><h5>Order</h5></td>
      </tr>
      <hr />
      <tr>
        <td align="left">Subtotal</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.suggestedOrderRefund})</font></td>
        <td align="center">{currency+""+orderLevelTotals.amount}</td>
      </tr>
      <tr>
        <td align="left">Shipping</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.suggestedShippingRefund})</font></td>
        <td align="center">{currency+""+orderLevelTotals.shipping}</td>
      </tr>
      <tr>
        <td align="left">Shipping Surcharge</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.suggestedShippingSurchargeRefund})</font></td>
        <td align="center">{currency+""+orderLevelTotals.shippingSurchargeValue}</td>
      </tr>
      <tr>
        <td align="left">Tax</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.suggestedTaxRefund})</font></td>
        <td align="center">{currency+""+orderLevelTotals.tax}</td>
      </tr>
      <tr>
        <td align="left">Return Fee</td>
        <td align="center"><font color="blue">{currency+""+refundDetails.returnFee}</font></td>
        <td align="center"></td>
      </tr>
      <tr>
        <td align="left">Other Adjustments</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.suggestedOtherRefund})</font></td>
        <td align="center"></td>
      </tr>
      <hr />
      <tr>
        <td align="left">Total</td>
        <td align="center"><font color="blue">({currency+""+refundDetails.refundDue})</font></td>
        <td align="center">{currency+""+orderLevelTotals.total}</td>
      </tr>
      </tbody>
  );
}

function RefundMethodsTableHeader() {
  return (
    <thead>
      <tr>
        <td align="left"><h5>Refund Mode</h5></td>
        <td align="left"><h5>Refund</h5></td>
        <td align="left"><h5>State</h5></td>
      </tr>
    </thead>
  );
}

function RefundMethodsTable(props) {
  var currency = props.refundMethodInfo.orderInfo.priceListGroup.currency.symbol
  var paymentReversalDetail = props.refundMethodInfo.paymentReversalInfo
  var element = paymentReversalDetail.map(paymentMode => {
  return (
      <tr>
        <td align="left">{paymentMode.refundType+"".toUpperCase()}</td>
        <td align="left"><font color="blue">({currency+""+paymentMode.amount})</font></td>
        <td align="left">{paymentMode.state}</td>
      </tr>
  );
});
return <tbody>{element}</tbody>;
}

export default ReturnRequestDetailsPage;