import React, { Component } from "react";
import QuickLinks from "./quicklinks";
import Announcements from "./announcements.jsx";
import RecentOrders from "./recentorders";
import PendingActions from "./pendingactions";

import LoginPage from "../LoginPage/loginpage";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import {
  DASH_BOARD_POSTS_URI,
  DASH_BOARD_RECENT_ORDERS_URI,
  DASH_BOARD_PENDING_ACTIONS_URI
} from "../../../Rest/RestConstants";
import OrderHistoryLineChart from "../CustomerProfile/Activity/OrderHistoryLineChart";
import { 
  Container,
  Grid
} from "semantic-ui-react";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      quicklinks: [],
      pendingActionItems: [],
      authToken: ""
    };
  }

  fetchPosts() {
    var self = this;

    var headers = { Authorization: sessionStorage.getItem("token") };
    console.log(headers + "---------------->");
    makeGetCall(DASH_BOARD_POSTS_URI, headers).then(response => {
      console.log("psots are ============>" + response);
      extratcPosts(response);
    });

    function extratcPosts(resp) {
      var announcementsList = [];
      var quickLinksList = [];

      var forEachCallBack = function(post) {
        if (post.type === "announcementPost" && post.active === true) {
          announcementsList.push(post);
        } else if (post.type === "quickLinkPost" && post.active === true) {
          quickLinksList.push(post);
        }
      };

      if (resp && resp.posts) {
        resp.posts.forEach(forEachCallBack);
      }

      self.setState({
        announcements: announcementsList,
        quicklinks: quickLinksList
      });
    }
  }

  fetchRecentOrders() {
    var self = this;
    var headers = { Authorization: sessionStorage.getItem("token") };
    var queryParams = { limit: 5 };
    makeGetCall(DASH_BOARD_RECENT_ORDERS_URI, headers, queryParams).then(
      response => {
        console.log("psots are ============>" + response);
        if (response.recentOrders) {
          self.setState({
            recentOrders: response.recentOrders
          });
        }
      }
    );
  }

  fetchPendingActions() {
    var self = this;
    var headers = { Authorization: sessionStorage.getItem("token") };
    var queryParams = { limit: 5 };
    makeGetCall(DASH_BOARD_PENDING_ACTIONS_URI, headers, queryParams).then(
      response => {
        console.log("psots are ============>" + response);
        if (response.pendingActionItems) {
          self.setState({
            pendingActionItems: response.pendingActionItems
          });
        }
      }
    );
  }
  componentDidMount() {
    this.fetchPosts();
    this.fetchRecentOrders();
    this.fetchPendingActions();
  }
  render() {
    let qucikLinksList = this.state.quicklinks;
    let announcementsList = this.state.announcements;
    let recentOrdersList = this.state.recentOrders;
    let pendingActionsList = this.state.pendingActionItems;   

    if (this.isLoggedIn()) {
      return (
        <Container>                  
          <Grid columns={2}>
            <Grid.Row>
            <Grid.Column>
            <br/>
            <br/>  
            <div className="container"><OrderHistoryLineChart response={ordersHistoryInfo1}></OrderHistoryLineChart></div> 
            </Grid.Column> 
            <Grid.Column>  
              <br/>
              <br/>
              <br/>
            <Announcements announcements={announcementsList} />
              <QuickLinks qucikLinks={qucikLinksList} />
            </Grid.Column>          
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <RecentOrders recentOrders={recentOrdersList} />
              </Grid.Column>
              <Grid.Column>
              <PendingActions pendingActions={pendingActionsList} />
              </Grid.Column>
            </Grid.Row>
          </Grid>          
        </Container>
        
      );
    } else {
      return <LoginPage />;
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem("isLoggedin") === "true";
  }
}

let ordersHistoryInfo1={
  "total": 8,
  "totalResults": 8,
  "offset": 0,
  "limit": 250,
  "links": [
    {
      "rel": "self",
      "href": "http://10.152.105.10:9080/ccadminui/v1/orders"
    }
  ],
  "sort": [
    {
      "property": "id",
      "order": "asc"
    }
  ],
  "items": [
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-01-27T06:42:22.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": null,
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg10007",
          "amount": 54.97,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r10006"
        }
      ],
      "exchangeRate": null,
      "id": "o10007",
      "state": "SUBMITTED",
      "taxCalculated": false,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.962Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": null,
          "priceInfo": {
            "discounted": false,
            "amount": 29.97,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 29.97,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 29.97,
                "quantity": 3,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 2,
                  "size": 3
                },
                "tax": 0,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 9.99,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 9.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci1000008",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 3,
          "pointOfNoRevision": false,
          "productId": "Product_3Dii",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "Sku_3Eii",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "He's Just Not that Into You",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "twoDayShippingMethod",
          "description": "sg10008",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 0,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "IE",
            "lastName": "GONZALEZ",
            "address3": null,
            "city": "Dublin",
            "address2": null,
            "prefix": null,
            "address1": "203 Main Street",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "Dublin 1",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "ISABELLE",
            "phoneNumber": "9087654321",
            "faxNumber": null,
            "middleName": null,
            "state": "L",
            "email": "ISABELLE.GONZALEZ@test.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 3,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 2,
                "size": 3
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci1000008",
              "state": "INITIAL",
              "id": "r10004"
            }
          ],
          "state": "INITIAL",
          "id": "sg10008",
          "stateDetail": null,
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Anderson",
        "firstName": "Kim",
        "loyaltyPrograms": [],
        "shippingAddress": {
          "country": "US",
          "lastName": "Anderson",
          "address3": null,
          "city": "Syracuse",
          "address2": null,
          "prefix": null,
          "address1": "21 Cedar Ave",
          "postalCode": "13202",
          "jobTitle": null,
          "companyName": null,
          "county": null,
          "ownerId": null,
          "suffix": null,
          "version": 2,
          "firstName": "Kim",
          "phoneNumber": "212-555-1977",
          "repositoryId": "se-980031",
          "faxNumber": null,
          "middleName": null,
          "state": "NY",
          "id": "se-980031"
        },
        "middleName": null,
        "login": "kim@example.com",
        "parentOrganization": null,
        "email": "kim@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": null,
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "se-570031",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1548571344000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1548571340000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": null,
      "paymentGroups": [
        {
          "expirationYear": "2016",
          "amountAuthorized": 54.97,
          "amount": 54.97,
          "gatewayName": null,
          "paymentProps": {},
          "expirationMonth": "05",
          "submittedDate": "2014-09-04T07:43:46.000Z",
          "authorizationStatus": [],
          "IIN": null,
          "token": "9997000128470602",
          "paymentGroupClassType": "tokenizedCreditCard",
          "creditCardNumber": "1111",
          "paymentMethod": "tokenizedCreditCard",
          "state": "AUTHORIZED",
          "id": "pg10007",
          "billingAddress": {
            "country": "IE",
            "lastName": "GONZALEZ",
            "address3": null,
            "city": "Dublin",
            "address2": null,
            "prefix": null,
            "address1": "Address Line 1",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "Dublin 1",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "ISABELLE",
            "phoneNumber": "12345678",
            "faxNumber": null,
            "middleName": null,
            "state": "L",
            "email": "ISABELLE.GONZALEZ@test.com"
          },
          "debitStatus": [],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 29.97,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 0,
        "rawSubtotal": 29.97,
        "total": 54.97,
        "shipping": 25,
        "primaryCurrencyTotal": 29.97,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 3,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 0,
        "countyTax": 0,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 0,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-01-27T06:42:24.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-01-04T06:42:22.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": null,
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg10401",
          "amount": 106.25,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r10374"
        }
      ],
      "exchangeRate": null,
      "id": "o10401",
      "state": "SUBMITTED",
      "taxCalculated": false,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.962Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": null,
          "priceInfo": {
            "discounted": false,
            "amount": 75,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 299.97,
            "salePrice": 25,
            "priceListId": "salePrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": true,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 75,
                "quantity": 3,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 2,
                  "size": 3
                },
                "tax": 6.25,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 25,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 99.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci1000401",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 3,
          "pointOfNoRevision": false,
          "productId": "prod10013",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "sku10030",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "Playstation",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "standardShippingMethod",
          "description": "sg10401",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 0,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "US",
            "lastName": "MILLER",
            "address3": null,
            "city": "Springfield",
            "address2": null,
            "prefix": null,
            "address1": "203 Main Street",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "01144",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "JESSICA",
            "phoneNumber": "9087654321",
            "faxNumber": null,
            "middleName": null,
            "state": "MA",
            "email": "JESSICA.MILLER@test.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 3,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 2,
                "size": 3
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci1000401",
              "state": "INITIAL",
              "id": "r10372"
            }
          ],
          "state": "INITIAL",
          "id": "sg10401",
          "stateDetail": null,
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Anderson",
        "firstName": "Kim",
        "loyaltyPrograms": [],
        "shippingAddress": {
          "country": "US",
          "lastName": "Anderson",
          "address3": null,
          "city": "Syracuse",
          "address2": null,
          "prefix": null,
          "address1": "21 Cedar Ave",
          "postalCode": "13202",
          "jobTitle": null,
          "companyName": null,
          "county": null,
          "ownerId": null,
          "suffix": null,
          "version": 2,
          "firstName": "Kim",
          "phoneNumber": "212-555-1977",
          "repositoryId": "se-980031",
          "faxNumber": null,
          "middleName": null,
          "state": "NY",
          "id": "se-980031"
        },
        "middleName": null,
        "login": "kim@example.com",
        "parentOrganization": null,
        "email": "kim@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": null,
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "se-570031",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1546584144000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1546584140000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": null,
      "paymentGroups": [
        {
          "expirationYear": "2016",
          "amountAuthorized": 106.25,
          "amount": 106.25,
          "gatewayName": null,
          "paymentProps": {},
          "expirationMonth": "05",
          "submittedDate": "2014-09-04T10:15:02.000Z",
          "authorizationStatus": [],
          "IIN": null,
          "token": "9997000128476500",
          "paymentGroupClassType": "tokenizedCreditCard",
          "creditCardNumber": "1111",
          "paymentMethod": "tokenizedCreditCard",
          "state": "AUTHORIZED",
          "id": "pg10401",
          "billingAddress": {
            "country": "US",
            "lastName": "MILLER",
            "address3": null,
            "city": "Springfield",
            "address2": null,
            "prefix": null,
            "address1": "Address Line 1",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "01144",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "JESSICA",
            "phoneNumber": "12345678",
            "faxNumber": null,
            "middleName": null,
            "state": "MA",
            "email": "JESSICA.MILLER@test.com"
          },
          "debitStatus": [],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 75,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 6.25,
        "rawSubtotal": 75,
        "total": 106.25,
        "shipping": 25,
        "primaryCurrencyTotal": 75,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 3,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 6.25,
        "countyTax": 0,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 6.25,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-01-04T06:42:24.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2018-11-05T06:42:22.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": null,
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg10406",
          "amount": 58.4,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r10379"
        }
      ],
      "exchangeRate": null,
      "id": "o10406",
      "state": "SUBMITTED",
      "taxCalculated": false,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.962Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": null,
          "priceInfo": {
            "discounted": false,
            "amount": 29.97,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 29.97,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 29.97,
                "quantity": 3,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 2,
                  "size": 3
                },
                "tax": 3.43,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 9.99,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 9.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci1000406",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 3,
          "pointOfNoRevision": false,
          "productId": "prod10026",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "sku10008",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "Cat5 Networking Cable",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "priorityShippingMethod",
          "description": "sg10406",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 0,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "US",
            "lastName": "DAVIS",
            "address3": null,
            "city": "Indian Orchard",
            "address2": null,
            "prefix": null,
            "address1": "203 Main Street",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "01151",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "GRACE",
            "phoneNumber": "9087654321",
            "faxNumber": null,
            "middleName": null,
            "state": "MA",
            "email": "GRACE.DAVIS@test.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 3,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 2,
                "size": 3
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci1000406",
              "state": "INITIAL",
              "id": "r10377"
            }
          ],
          "state": "INITIAL",
          "id": "sg10406",
          "stateDetail": null,
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Anderson",
        "firstName": "Kim",
        "loyaltyPrograms": [],
        "shippingAddress": {
          "country": "US",
          "lastName": "Anderson",
          "address3": null,
          "city": "Syracuse",
          "address2": null,
          "prefix": null,
          "address1": "21 Cedar Ave",
          "postalCode": "13202",
          "jobTitle": null,
          "companyName": null,
          "county": null,
          "ownerId": null,
          "suffix": null,
          "version": 2,
          "firstName": "Kim",
          "phoneNumber": "212-555-1977",
          "repositoryId": "se-980031",
          "faxNumber": null,
          "middleName": null,
          "state": "NY",
          "id": "se-980031"
        },
        "middleName": null,
        "login": "kim@example.com",
        "parentOrganization": null,
        "email": "kim@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": null,
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "se-570031",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1541400144000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1541400140000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": null,
      "paymentGroups": [
        {
          "expirationYear": "2016",
          "amountAuthorized": 58.4,
          "amount": 58.4,
          "gatewayName": null,
          "paymentProps": {},
          "expirationMonth": "05",
          "submittedDate": "2014-09-04T10:15:15.000Z",
          "authorizationStatus": [],
          "IIN": null,
          "token": "9997000128476518",
          "paymentGroupClassType": "tokenizedCreditCard",
          "creditCardNumber": "1111",
          "paymentMethod": "tokenizedCreditCard",
          "state": "AUTHORIZED",
          "id": "pg10406",
          "billingAddress": {
            "country": "US",
            "lastName": "DAVIS",
            "address3": null,
            "city": "Indian Orchard",
            "address2": null,
            "prefix": null,
            "address1": "Address Line 1",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "01151",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "GRACE",
            "phoneNumber": "12345678",
            "faxNumber": null,
            "middleName": null,
            "state": "MA",
            "email": "GRACE.DAVIS@test.com"
          },
          "debitStatus": [],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 29.97,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 3.43,
        "rawSubtotal": 29.97,
        "total": 58.4,
        "shipping": 25,
        "primaryCurrencyTotal": 29.97,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 3,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 3.43,
        "countyTax": 0,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 3.43,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2018-11-05T06:42:24.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-02-06T06:44:17.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": "2def8d65-78be-46d4-b9db-dacbb99817a3",
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg10413",
          "amount": 50.75,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r30390"
        }
      ],
      "exchangeRate": null,
      "id": "o10411",
      "state": "REMOVED",
      "taxCalculated": true,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.000Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": "ci1549435429779",
          "priceInfo": {
            "discounted": false,
            "amount": 21.99,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 21.99,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 21.99,
                "quantity": 1,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 0,
                  "size": 1
                },
                "tax": 1.76,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 21.99,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 21.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci1000411",
          "state": "REMOVED",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 1,
          "pointOfNoRevision": false,
          "productId": "Product_36Exy",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "Sku_36Fxy",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "The Girl with the Dragon Tattoo",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "standardShippingMethod",
          "description": "sg30411",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 2,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "US",
            "lastName": "Anderson",
            "address3": null,
            "city": "Syracuse",
            "address2": null,
            "prefix": null,
            "address1": "21 Cedar Ave",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "13202",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "Kim",
            "phoneNumber": "212-555-1977",
            "faxNumber": null,
            "middleName": null,
            "state": "NY",
            "email": "kim@example.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 1,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 0,
                "size": 1
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci1000411",
              "state": "REMOVED",
              "id": "r30388"
            }
          ],
          "state": "REMOVED",
          "id": "sg30411",
          "stateDetail": "The shipping group [sg30411] has been removed",
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Anderson",
        "firstName": "Kim",
        "loyaltyPrograms": [],
        "shippingAddress": {
          "country": "US",
          "lastName": "Anderson",
          "address3": null,
          "city": "Syracuse",
          "address2": null,
          "prefix": null,
          "address1": "21 Cedar Ave",
          "postalCode": "13202",
          "jobTitle": null,
          "companyName": null,
          "county": null,
          "ownerId": null,
          "suffix": null,
          "version": 2,
          "firstName": "Kim",
          "phoneNumber": "212-555-1977",
          "repositoryId": "se-980031",
          "faxNumber": null,
          "middleName": null,
          "state": "NY",
          "id": "se-980031"
        },
        "middleName": null,
        "login": "kim@example.com",
        "parentOrganization": null,
        "email": "kim@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": "o10411",
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "se-570031",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": "service",
      "lastModifiedTime": 1549436409189,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1549435430000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": "en",
      "paymentGroups": [
        {
          "expirationYear": "2020",
          "amountAuthorized": 0,
          "amount": 50.75,
          "gatewayName": "CS-A",
          "paymentProps": {
            "transactionTypeInitiated": "void",
            "uiIntervention": "sop"
          },
          "expirationMonth": "02",
          "submittedDate": "2019-02-06T06:44:17.000Z",
          "authorizationStatus": [
            {
              "authorizationDecision": "ACCEPT",
              "transactionUuid": "707ade8349cf4aa99e9c338805071552",
              "amount": 0,
              "statusProps": {
                "auth_response": "100",
                "req_transaction_type": "authorization,create_payment_token",
                "req_locale": "en",
                "req_payment_method": "card",
                "auth_trans_ref_no": "77997054RWTFHZC4",
                "auth_time": "2019-02-06T06:44:16.358Z",
                "amountAuthroized": "50.75",
                "auth_code": "888888"
              },
              "transactionSuccess": true,
              "errorMessage": "Request was processed successfully.",
              "currency": "USD",
              "reasonCode": "100",
              "transactionId": "3ucldmjvvlngacq7nj4mqq1m82"
            }
          ],
          "IIN": null,
          "token": "9997000108950573",
          "paymentGroupClassType": "tokenizedCreditCard",
          "creditCardNumber": "1111",
          "paymentMethod": "tokenizedCreditCard",
          "state": "REMOVED",
          "id": "pg10413",
          "billingAddress": {
            "country": "US",
            "lastName": "Anderson",
            "address3": null,
            "city": "Syracuse",
            "address2": null,
            "prefix": null,
            "address1": "21 Cedar Ave",
            "companyName": null,
            "jobTitle": null,
            "postalCode": "13202",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "Kim",
            "phoneNumber": "212-555-1977",
            "faxNumber": null,
            "middleName": null,
            "state": "NY",
            "email": "kim@example.com"
          },
          "debitStatus": [],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 21.99,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 3.76,
        "rawSubtotal": 21.99,
        "total": 50.75,
        "shipping": 25,
        "primaryCurrencyTotal": 21.99,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 1,
      "externalContext": false,
      "cancelReason": "Bad product review",
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 3.76,
        "countyTax": 1.88,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 1.88,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-02-06T07:00:09.189Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-02-06T07:02:41.061Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": "cb17b0a3-8c0d-4086-8b8e-661ef39b0c86",
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg10420",
          "amount": 74.5,
          "relationshipType": "ORDERAMOUNT",
          "id": "r30399"
        }
      ],
      "exchangeRate": null,
      "id": "o10413",
      "state": "SUBMITTED",
      "taxCalculated": true,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.000Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": "ci1549435429779",
          "priceInfo": {
            "discounted": false,
            "amount": 43.98,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 43.98,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 43.98,
                "quantity": 2,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 1,
                  "size": 2
                },
                "tax": 3.52,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 21.99,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 21.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci1000413",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 2,
          "pointOfNoRevision": false,
          "productId": "Product_36Exy",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "Sku_36Fxy",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "The Girl with the Dragon Tattoo",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "standardShippingMethod",
          "description": "sg30413",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 2,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "US",
            "lastName": "Anderson",
            "address3": "",
            "city": "Syracuse",
            "address2": "",
            "prefix": "",
            "address1": "21 Cedar Ave",
            "companyName": "",
            "jobTitle": "",
            "postalCode": "13202",
            "county": "",
            "ownerId": null,
            "suffix": "",
            "firstName": "Kim",
            "phoneNumber": "212-555-1977",
            "faxNumber": "",
            "middleName": "",
            "state": "NY",
            "email": "kim@example.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 2,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 1,
                "size": 2
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci1000413",
              "state": "INITIAL",
              "id": "r30397"
            }
          ],
          "state": "INITIAL",
          "id": "sg30413",
          "stateDetail": null,
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Anderson",
        "firstName": "Kim",
        "loyaltyPrograms": [],
        "shippingAddress": {
          "country": "US",
          "lastName": "Anderson",
          "address3": null,
          "city": "Syracuse",
          "address2": null,
          "prefix": null,
          "address1": "21 Cedar Ave",
          "postalCode": "13202",
          "jobTitle": null,
          "companyName": null,
          "county": null,
          "ownerId": null,
          "suffix": null,
          "version": 2,
          "firstName": "Kim",
          "phoneNumber": "212-555-1977",
          "repositoryId": "se-980031",
          "faxNumber": null,
          "middleName": null,
          "state": "NY",
          "id": "se-980031"
        },
        "middleName": null,
        "login": "kim@example.com",
        "parentOrganization": null,
        "email": "kim@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": "o10411",
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "se-570031",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": "service",
      "lastModifiedTime": 1549436561066,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1549435430000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": "en",
      "paymentGroups": [
        {
          "paymentGroupClassType": "physicalGiftCard",
          "amountAuthorized": 74.5,
          "amount": 74.5,
          "gatewayName": "chaseGiftCard",
          "paymentProps": {},
          "paymentMethod": "physicalGiftCard",
          "state": "AUTHORIZED",
          "id": "pg10420",
          "submittedDate": "2019-02-06T07:02:41.002Z",
          "debitStatus": [],
          "authorizationStatus": [
            {
              "amount": 74.5,
              "statusProps": {
                "RespCode": "00",
                "AuthCode": "025322",
                "TerminalID": "001",
                "responseMsg": "Approved"
              },
              "transactionSuccess": true,
              "errorMessage": null,
              "externalStatusProps": [],
              "transactionId": "55B921ABC20A72FAC0212F0B42A6DECE65E05359",
              "transactionTimestamp": "2019-02-06T07:02:41.000Z"
            }
          ],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 43.98,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 5.52,
        "rawSubtotal": 43.98,
        "total": 74.5,
        "shipping": 25,
        "primaryCurrencyTotal": 43.98,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 2,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 5.52,
        "countyTax": 2.76,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 2.76,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-02-06T07:02:41.066Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-02-04T10:17:22.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": "d4ffa8c2-cd43-4910-90d2-178e76a5e461",
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg30417",
          "amount": 137.63,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r40396"
        }
      ],
      "exchangeRate": null,
      "id": "o30421",
      "state": "SUBMITTED",
      "taxCalculated": true,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.000Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": "ci1549274997585",
          "priceInfo": {
            "discounted": false,
            "amount": 125,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 125,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 125,
                "quantity": 1,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 0,
                  "size": 1
                },
                "tax": 12.63,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 125,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 125
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci3000416",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 1,
          "pointOfNoRevision": false,
          "productId": "prodShirt425956",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "skuShirt425956",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "Shirt425956",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "lastName": null,
          "shippingMethod": "inStorePickupShippingGroup",
          "description": "sg40427",
          "submittedDate": null,
          "firstName": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 0,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 0,
            "rawShipping": 0,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "phoneNumber": null,
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "locationId": "Seattle183WA425956",
          "specialInstructions": {},
          "middleName": null,
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": "Seattle183WA425956",
              "amount": 0,
              "quantity": 1,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 0,
                "size": 1
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci3000416",
              "state": "INITIAL",
              "id": "r40394"
            }
          ],
          "state": "INITIAL",
          "id": "sg40427",
          "stateDetail": null,
          "email": "nakul.kodandapuram@gmail.com",
          "handlingInstructions": [],
          "shippingGroupClassType": "inStorePickupShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": null,
      "queuedOrderSubmitData": null,
      "cartName": "o30421",
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "111308",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1549275442000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1549275441000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": "en",
      "paymentGroups": [
        {
          "paymentGroupClassType": "inStorePayment",
          "amountAuthorized": 137.63,
          "amount": 137.63,
          "gatewayName": "100006",
          "paymentProps": null,
          "paymentMethod": "inStorePayment",
          "state": "AUTHORIZED",
          "id": "pg30417",
          "submittedDate": "2019-02-04T10:17:22.000Z",
          "debitStatus": [],
          "authorizationStatus": [
            {
              "amount": 137.63,
              "statusProps": {},
              "transactionSuccess": true,
              "errorMessage": null,
              "externalStatusProps": [],
              "transactionId": "o30421-pg30417-1549275442757",
              "transactionTimestamp": "2019-02-04T10:17:22.000Z"
            }
          ],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 125,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 12.63,
        "rawSubtotal": 125,
        "total": 137.63,
        "shipping": 0,
        "primaryCurrencyTotal": 125,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 1,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 12.63,
        "countyTax": 0,
        "isTaxIncluded": false,
        "miscTax": 0,
        "districtTax": 0,
        "stateTax": 8.13,
        "miscTaxInfo": {},
        "countryTax": 0,
        "cityTax": 4.5,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-02-04T10:17:22.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": "2019-02-04T13:37:20.000Z",
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": "1a374fa7-d51d-441f-8365-c3f0bc881c18",
      "organizationId": null,
      "relationships": [
        {
          "paymentGroupId": "pg30428",
          "amount": 136.1,
          "relationshipType": "ORDERAMOUNTREMAINING",
          "id": "r40417"
        }
      ],
      "exchangeRate": null,
      "id": "o30438",
      "state": "SUBMITTED",
      "taxCalculated": true,
      "combinedPriceInfos": null,
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.000Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": "ci1549287159664",
          "priceInfo": {
            "discounted": false,
            "amount": 125,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 125,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 125,
                "quantity": 1,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 0,
                  "size": 1
                },
                "tax": 11.1,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 125,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 125
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci3000425",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 1,
          "pointOfNoRevision": false,
          "productId": "prodShirt425956",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "skuShirt425956",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "Shirt425956",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "lastName": null,
          "shippingMethod": "inStorePickupShippingGroup",
          "description": "sg40451",
          "submittedDate": null,
          "firstName": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 0,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 0,
            "rawShipping": 0,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "phoneNumber": null,
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "locationId": "Manhattan161NY425956",
          "specialInstructions": {},
          "middleName": null,
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": "Manhattan161NY425956",
              "amount": 0,
              "quantity": 1,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 0,
                "size": 1
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci3000425",
              "state": "INITIAL",
              "id": "r40415"
            }
          ],
          "state": "INITIAL",
          "id": "sg40451",
          "stateDetail": null,
          "email": "reza.kalfane@oracle.com",
          "handlingInstructions": [],
          "shippingGroupClassType": "inStorePickupShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Kalfane",
        "firstName": "Réza",
        "loyaltyPrograms": [],
        "shippingAddress": null,
        "middleName": null,
        "login": "reza.kalfane@oracle.com",
        "parentOrganization": null,
        "email": "reza.kalfane@oracle.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": "o30438",
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "111730",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1549287440000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1549287399000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": "en",
      "paymentGroups": [
        {
          "paymentGroupClassType": "inStorePayment",
          "amountAuthorized": 136.1,
          "amount": 136.1,
          "gatewayName": "100006",
          "paymentProps": null,
          "paymentMethod": "inStorePayment",
          "state": "AUTHORIZED",
          "id": "pg30428",
          "submittedDate": "2019-02-04T13:37:20.000Z",
          "debitStatus": [],
          "authorizationStatus": [
            {
              "amount": 136.1,
              "statusProps": {},
              "transactionSuccess": true,
              "errorMessage": null,
              "externalStatusProps": [],
              "transactionId": "o30438-pg30428-1549287440172",
              "transactionTimestamp": "2019-02-04T13:37:20.000Z"
            }
          ],
          "currencyCode": "USD"
        }
      ],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 125,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 11.1,
        "rawSubtotal": 125,
        "total": 136.1,
        "shipping": 0,
        "primaryCurrencyTotal": 125,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 1,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 11.1,
        "countyTax": 0,
        "isTaxIncluded": false,
        "miscTax": 0.47,
        "districtTax": 0,
        "stateTax": 5,
        "miscTaxInfo": {
          "Special": 0.47
        },
        "countryTax": 0,
        "cityTax": 5.63,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-02-04T13:37:20.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 1,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": null,
      "siteId": "siteUS"
    },
    {
      "gwp": false,
      "secondaryCurrencyCode": null,
      "submittedDate": null,
      "salesChannel": "default",
      "buyerId": 12345,
      "configuratorId": null,
      "uuid": null,
      "organizationId": "or-100001",
      "relationships": [],
      "exchangeRate": null,
      "id": "o30441",
      "state": "INCOMPLETE",
      "taxCalculated": true,
      "combinedPriceInfos": "{\"taxPriceInfo\":{\"discounted\":false,\"secondaryCurrencyTaxAmount\":0,\"amount\":4.3,\"valueAddedTax\":0,\"adjustments\":[],\"countyTax\":2.12,\"isTaxIncluded\":false,\"miscTax\":0.18,\"shippingItemsTaxPriceInfos\":{\"sg40456\":{\"discounted\":false,\"secondaryCurrencyTaxAmount\":0,\"amount\":4.3,\"valueAddedTax\":0,\"adjustments\":[],\"countyTax\":2.12,\"isTaxIncluded\":false,\"miscTax\":0.18,\"shippingItemsTaxPriceInfos\":{},\"districtTax\":0,\"stateTax\":2,\"miscTaxInfo\":{\"Special\":0.18},\"countryTax\":0,\"cityTax\":0,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.CloudTaxPriceInfo\",\"currencyCode\":null,\"closenessQualifiers\":null,\"finalReasonCode\":null}},\"districtTax\":0,\"stateTax\":2,\"miscTaxInfo\":{\"Special\":0.18},\"countryTax\":0,\"cityTax\":0,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.CloudTaxPriceInfo\",\"currencyCode\":\"USD\",\"closenessQualifiers\":null,\"finalReasonCode\":null},\"ci3000427_recurringChargePriceInfo\":null,\"priceInfo\":{\"secondaryCurrencyTaxAmount\":0,\"frequencyAmountTotals\":{},\"secondaryCurrencyShippingAmount\":0,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"Order Subtotal\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"isTaxIncluded\":false,\"secondaryCurrencyTotal\":0,\"manualAdjustmentTotal\":0,\"taxExclusiveAmount\":0,\"discountAmount\":0,\"rawSubtotal\":24.99,\"totalWithoutTax\":49.99,\"lkpValExcludingFreeShip\":null,\"total\":54.29,\"shipping\":25,\"primaryCurrencyTotal\":24.99,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.CloudOrderPriceInfo\",\"closenessQualifiers\":null,\"discounted\":false,\"amount\":24.99,\"tax\":4.3,\"frequencyTaxTotals\":{},\"shippingItemsSubtotalPriceInfos\":{\"sg40456\":{\"secondaryCurrencyTaxAmount\":0,\"frequencyAmountTotals\":{},\"secondaryCurrencyShippingAmount\":0,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"Order Shipping Items Subtotal\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"isTaxIncluded\":false,\"secondaryCurrencyTotal\":0,\"manualAdjustmentTotal\":0,\"taxExclusiveAmount\":0,\"discountAmount\":0,\"rawSubtotal\":24.99,\"totalWithoutTax\":24.99,\"lkpValExcludingFreeShip\":null,\"total\":24.99,\"shipping\":0,\"primaryCurrencyTotal\":24.99,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.CloudOrderPriceInfo\",\"closenessQualifiers\":null,\"discounted\":false,\"amount\":24.99,\"tax\":0,\"frequencyTaxTotals\":{},\"shippingItemsSubtotalPriceInfos\":{},\"taxableShippingItemsSubtotalPriceInfos\":{},\"currencyCode\":\"USD\",\"nonTaxableShippingItemsSubtotalPriceInfos\":{},\"finalReasonCode\":null}},\"taxableShippingItemsSubtotalPriceInfos\":{\"sg40456\":{\"discounted\":false,\"amount\":24.99,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"Order Taxable Shipping Items Subtotal\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"manualAdjustmentTotal\":0,\"discountAmount\":0,\"tax\":0,\"rawSubtotal\":24.99,\"shippingItemsSubtotalPriceInfos\":{},\"taxableShippingItemsSubtotalPriceInfos\":{},\"total\":24.99,\"shipping\":0,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.OrderPriceInfo\",\"currencyCode\":null,\"nonTaxableShippingItemsSubtotalPriceInfos\":{},\"closenessQualifiers\":null,\"finalReasonCode\":null}},\"currencyCode\":\"USD\",\"nonTaxableShippingItemsSubtotalPriceInfos\":{\"sg40456\":{\"discounted\":false,\"amount\":0,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":0,\"adjustmentDescription\":\"Order Non-Taxable Shipping Items Subtotal\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":0,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":0,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"manualAdjustmentTotal\":0,\"discountAmount\":0,\"tax\":0,\"rawSubtotal\":0,\"shippingItemsSubtotalPriceInfos\":{},\"taxableShippingItemsSubtotalPriceInfos\":{},\"total\":0,\"shipping\":0,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.OrderPriceInfo\",\"currencyCode\":null,\"nonTaxableShippingItemsSubtotalPriceInfos\":{},\"closenessQualifiers\":null,\"finalReasonCode\":null}},\"finalReasonCode\":null},\"ci3000427_externalPriceDetails\":null,\"recurringChargePriceInfo\":null,\"ci3000427_externalRecurringChargeDetails\":null,\"ci3000427\":{\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"List price\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"rawTotalPrice\":24.99,\"quantityAsQualifier\":0,\"orderDiscountShare\":0,\"priceList\":{},\"currentPriceDetails\":[{\"discounted\":false,\"orderManualAdjustmentShare\":0,\"secondaryCurrencyTaxAmount\":0,\"quantityDerivedAsFloatingPoint\":1,\"amount\":24.99,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"List price\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"quantity\":1,\"fractional\":false,\"quantityAsQualifier\":0,\"range\":{\"highBound\":0,\"lowBound\":0,\"size\":1},\"orderDiscountShare\":0,\"tax\":2.15,\"quantityWithFraction\":0,\"itemPriceInfo\":null,\"quantityAsQualifierDerivedAsFloatingPoint\":0,\"amountIsFinal\":false,\"quantityWithFractionAsQualifier\":0,\"detailedUnitPrice\":24.99,\"class\":\"class atg.commerce.pricing.CloudDetailedItemPriceInfo\",\"currencyCode\":\"USD\",\"closenessQualifiers\":null,\"finalReasonCode\":null}],\"amountIsFinal\":false,\"onSale\":false,\"discountable\":true,\"class\":\"class atg.commerce.pricing.CloudItemPriceInfo\",\"closenessQualifiers\":null,\"discounted\":false,\"quantityWithFractionDiscounted\":0,\"amount\":24.99,\"secondaryCurrencyShippingSurcharge\":0,\"salePrice\":0,\"quantityDiscountedDerivedAsFloatingPoint\":0,\"fractional\":false,\"priceListId\":\"listPrices\",\"quantityDiscounted\":0,\"quantityAsQualifierDerivedAsFloatingPoint\":0,\"quantityWithFractionAsQualifier\":0,\"shippingSurcharge\":0,\"currencyCode\":\"USD\",\"currentPriceDetailsSorted\":[{\"discounted\":false,\"orderManualAdjustmentShare\":0,\"secondaryCurrencyTaxAmount\":0,\"quantityDerivedAsFloatingPoint\":1,\"amount\":24.99,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"List price\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":24.99,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"quantity\":1,\"fractional\":false,\"quantityAsQualifier\":0,\"range\":{\"highBound\":0,\"lowBound\":0,\"size\":1},\"orderDiscountShare\":0,\"tax\":2.15,\"quantityWithFraction\":0,\"itemPriceInfo\":null,\"quantityAsQualifierDerivedAsFloatingPoint\":0,\"amountIsFinal\":false,\"quantityWithFractionAsQualifier\":0,\"detailedUnitPrice\":24.99,\"class\":\"class atg.commerce.pricing.CloudDetailedItemPriceInfo\",\"currencyCode\":\"USD\",\"closenessQualifiers\":null,\"finalReasonCode\":null}],\"listPrice\":24.99,\"finalReasonCode\":null},\"sg40456\":{\"discounted\":false,\"secondaryCurrencyTaxAmount\":0,\"amount\":25,\"rawSecondaryCurrencyShippingAmount\":0,\"secondaryCurrencyShippingAmount\":0,\"adjustments\":[{\"pricingModel\":null,\"quoteInfoIndex\":null,\"coupon\":null,\"quantityAdjusted\":1,\"adjustmentDescription\":\"Shipping\",\"pricingModelGroupIndex\":null,\"manualPricingAdjustment\":null,\"quantityAdjustedDerivedAsFloatingPoint\":1,\"quantityWithFractionAdjusted\":0,\"totalAdjustment\":25,\"class\":\"class atg.commerce.pricing.PricingAdjustment\",\"pricingModelIndex\":null}],\"taxIncluded\":true,\"rawShipping\":25,\"shippingTax\":2.15,\"amountIsFinal\":false,\"class\":\"class atg.commerce.pricing.CloudShippingPriceInfo\",\"currencyCode\":\"USD\",\"closenessQualifiers\":null,\"finalReasonCode\":null},\"externalOrderPriceDetails\":null}",
      "commerceItems": [
        {
          "OfferEndsDateLineItem": "2020-07-02T03:42:42.000Z",
          "deactivationDate": null,
          "returnedQuantity": 0,
          "availabilityDate": null,
          "billingProfileId": null,
          "externalData": [],
          "billingAccountId": null,
          "preOrderQuantity": 0,
          "CustomMessageLineItem": "CustomMessage",
          "commerceItemId": "ci1549288120965",
          "priceInfo": {
            "discounted": false,
            "amount": 24.99,
            "secondaryCurrencyShippingSurcharge": 0,
            "rawTotalPrice": 24.99,
            "salePrice": 0,
            "priceListId": "listPrices",
            "quantityDiscounted": 0,
            "amountIsFinal": false,
            "onSale": false,
            "shippingSurcharge": 0,
            "discountable": true,
            "currentPriceDetailsSorted": [
              {
                "secondaryCurrencyTaxAmount": 0,
                "discounted": false,
                "amount": 24.99,
                "quantity": 1,
                "amountIsFinal": false,
                "range": {
                  "lowBound": 0,
                  "highBound": 0,
                  "size": 1
                },
                "tax": 2.15,
                "orderDiscountShare": 0,
                "detailedUnitPrice": 24.99,
                "currencyCode": "USD"
              }
            ],
            "currencyCode": "USD",
            "listPrice": 24.99
          },
          "catalogId": null,
          "assetId": null,
          "externalRecurringChargeDetails": null,
          "externalPriceDetails": null,
          "actionCode": null,
          "id": "ci3000427",
          "state": "INITIAL",
          "serviceId": null,
          "locationInventoryInfoMap": {},
          "serviceAccountId": null,
          "nameLineItem": "My name",
          "quantity": 1,
          "pointOfNoRevision": false,
          "productId": "Product_27Fxyzi",
          "ReferralCodeLineItem": "1234",
          "ShippingInstructionsLineItem": "ShippingInstructions",
          "externalId": null,
          "originalCommerceItemId": null,
          "transactionDate": null,
          "catalogRefId": "Sku_27Gxyzi",
          "customerAccountId": null,
          "recurringChargePriceInfo": null,
          "lineAttributes": [],
          "catalogKey": null,
          "productDisplayName": "Akira",
          "shopperInput": {},
          "activationDate": null,
          "backOrderQuantity": 0,
          "GiftWrappingLineItem": false,
          "DiscountLineItem": 0
        }
      ],
      "shippingGroups": [
        {
          "shippingMethod": "standardShippingMethod",
          "description": "sg40456",
          "submittedDate": null,
          "priceInfo": {
            "secondaryCurrencyTaxAmount": 0,
            "discounted": false,
            "shippingTax": 2.15,
            "secondaryCurrencyShippingAmount": 0,
            "amount": 25,
            "rawShipping": 25,
            "amountIsFinal": false,
            "currencyCode": "USD"
          },
          "shipOnDate": null,
          "actualShipDate": null,
          "trackingInfo": [],
          "specialInstructions": {},
          "shippingAddress": {
            "country": "US",
            "lastName": "Dilliard",
            "address3": null,
            "city": "Bohemia",
            "address2": "Suffolk",
            "prefix": null,
            "address1": "70 Euclid Ave #722",
            "companyName": "National Discount Auto Parts",
            "jobTitle": null,
            "postalCode": "11716",
            "county": null,
            "ownerId": null,
            "suffix": null,
            "firstName": "Leota",
            "phoneNumber": "631-748-6479",
            "faxNumber": null,
            "middleName": null,
            "state": "NY",
            "email": "leota@example.com"
          },
          "commerceItemRelationships": [
            {
              "availablePickupDate": null,
              "inventoryLocationId": null,
              "amount": 0,
              "quantity": 1,
              "pointOfNoRevision": false,
              "relationshipType": "SHIPPINGQUANTITY",
              "returnedQuantity": 0,
              "preferredPickupDate": null,
              "range": {
                "lowBound": 0,
                "highBound": 0,
                "size": 1
              },
              "commerceItemExternalId": null,
              "commerceItemId": "ci3000427",
              "state": "INITIAL",
              "id": "r40427"
            }
          ],
          "state": "INITIAL",
          "id": "sg40456",
          "stateDetail": null,
          "trackingNumber": null,
          "handlingInstructions": [],
          "shippingGroupClassType": "hardgoodShippingGroup"
        }
      ],
      "freezeDate": null,
      "taxExempt": false,
      "shippingInstructions": "Deliver the product after 6 PM",
      "profile": {
        "lastName": "Dilliard",
        "firstName": "Leota",
        "loyaltyPrograms": [],
        "shippingAddress": null,
        "middleName": null,
        "login": "leota@example.com",
        "parentOrganization": {
          "name": "National Discount Auto Parts",
          "id": "or-100001"
        },
        "email": "leota@example.com"
      },
      "queuedOrderSubmitData": null,
      "cartName": "o30441",
      "paymentInitiatedEmailSent": false,
      "payShippingInSecondaryCurrency": null,
      "shippingGroupCount": 1,
      "taxExemptionCode": null,
      "createdByOrderId": null,
      "estimatedDeliveryDate": "1980-01-01T00:00:00.000Z",
      "orderAction": "order",
      "submissionErrorMessages": [],
      "profileId": "bb-110006",
      "activeQuoteOrderId": null,
      "approverIds": [],
      "agentId": null,
      "lastModifiedTime": 1549288299000,
      "priceGroupId": "defaultPriceGroup",
      "creationTime": 1549288121000,
      "sourceSystem": "Cloud Commerce",
      "gwpMarkers": [],
      "locale": "en",
      "paymentGroups": [],
      "payTaxInSecondaryCurrency": null,
      "priceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "secondaryCurrencyShippingAmount": 0,
        "amount": 24.99,
        "secondaryCurrencyTotal": 0,
        "manualAdjustmentTotal": 0,
        "discountAmount": 0,
        "tax": 4.3,
        "rawSubtotal": 24.99,
        "total": 54.29,
        "shipping": 25,
        "primaryCurrencyTotal": 24.99,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "submissionProgress": [],
      "catalogId": null,
      "referralCode": null,
      "customMessage": "Birthday gift",
      "totalCommerceItemCount": 1,
      "externalContext": false,
      "cancelReason": null,
      "quoteInfo": null,
      "taxPriceInfo": {
        "secondaryCurrencyTaxAmount": 0,
        "discounted": false,
        "valueAddedTax": 0,
        "amount": 4.3,
        "countyTax": 2.12,
        "isTaxIncluded": false,
        "miscTax": 0.18,
        "districtTax": 0,
        "stateTax": 2,
        "miscTaxInfo": {
          "Special": 0.18
        },
        "countryTax": 0,
        "cityTax": 0,
        "amountIsFinal": false,
        "currencyCode": "USD"
      },
      "lastModifiedDate": "2019-02-04T13:51:39.000Z",
      "approvalSystemMessages": [],
      "approverMessages": [],
      "paymentGroupCount": 0,
      "giftWrapping": false,
      "submissionErrorCodes": [],
      "recurringChargePriceInfo": null,
      "organization": {
        "repositoryId": "or-100001",
        "name": "National Discount Auto Parts",
        "active": true,
        "id": "or-100001"
      },
      "siteId": "siteUS"
    }
  ]
};