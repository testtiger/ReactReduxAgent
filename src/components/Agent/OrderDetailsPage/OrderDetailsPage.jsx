import React, { Component } from "react";
import OrderIdAndState from "./OrderIdAndState.jsx";
import CustomerInfo from "./CustomerInfo.jsx";
import OrderedCartItems from "./OrderedCartItems.jsx";
import ShippingInfo from "./ShippingInfo.jsx";
import { Grid, Container } from "semantic-ui-react";
import OrderSummary from "./OrderSummary.jsx";
export default class OrderDetailsPage extends Component {


    constructor(props){
        super(props);
        if (!this.props.match.params.id) {
            throw Error("order id cannot be empty /undefined");
        }
        if (this.props.match.params.id) {
            alert(this.props.match.params.id);
        }
        this.state = {
            profileId: this.props.match.params.id,
            getProfileResponse: "",
            errorMessage: "",
            tabToBeRendered: "profile"
        };
    }
  render() {
    var stateDetailsAsUser = "Fulfilled";
    var submittedDate = "2019-02-01T13:25:30.000Z";
    var orderId = "o50420";
    var siteID = "siteUS";
    var resp = {
      profileId: "120057"
    };

    var shippingGroups = [
      {
        taxPriceInfo: {
          cityTax: 0,
          secondaryCurrencyTaxAmount: 0,
          amount: 0,
          valueAddedTax: 0,
          countyTax: 0,
          isTaxIncluded: false,
          miscTax: 0,
          districtTax: 0,
          stateTax: 0,
          countryTax: 0
        },
        shippingMethod: {
          secondaryCurrencyTaxAmount: 0,
          shippingTax: 0,
          cost: 11,
          value: "groundShippingMethod",
          shippingMethodDescription: "Ground",
          displayName: "Ground"
        },
        shippingGroupId: "sg60427",
        type: "hardgoodShippingGroup",
        submittedDate: null,
        priceInfo: {
          amount: 229.99,
          total: 240.99,
          shipping: 11,
          shippingSurchargeValue: 0,
          tax: 0,
          subTotal: 229.99,
          currencyCode: "USD",
          totalWithoutTax: 240.99
        },
        discountInfo: {
          orderDiscount: 0,
          discountDescList: [],
          shippingDiscount: 0
        },
        recurringChargePriceInfo: null,
        shipOnDate: null,
        trackingInfo: [],
        actualShipDate: null,
        shippingAddress: {
          lastName: "k",
          country: "US",
          address3: null,
          address2: "line2",
          city: "alabama",
          prefix: null,
          address1: "line1",
          postalCode: "36006",
          companyName: null,
          jobTitle: null,
          county: "some county",
          suffix: null,
          firstName: "Diwakara",
          phoneNumber: "789456123",
          stateName: "Alabama",
          faxNumber: null,
          alias: null,
          middleName: null,
          state: "AL",
          countryName: "United States",
          email: "some1@gmail.com"
        },
        items: [
          {
            primaryThumbImageURL:
              "/ccstore/v1/images/?source=/file/v4675296977080013589/products/xbox360_LARGE.jpg&height=100&width=100",
            rawTotalPrice: 229.99,
            returnedQuantity: 0,
            dynamicProperties: [],
            displayName: "Xbox 360",
            priceOverridenBy: "",
            shippingSurchargeValue: 0,
            availabilityDate: null,
            externalData: [],
            discountAmount: 0,
            preOrderQuantity: 0,
            overriddenPrice: "",
            commerceItemId: "ci5000443",
            price: 229.99,
            isPriceOverridden: false,
            variant: [],
            onSale: false,
            primaryImageAltText: "Xbox 360",
            stateDetailsAsUser:
              "The item has been initialized within the shipping group",
            commerceId: "ci5000443",
            unitPrice: 229.99,
            primaryImageTitle: "Xbox 360",
            amount: 229.99,
            quantity: 1,
            pointOfNoRevision: false,
            productId: "prod10012",
            salePrice: 0,
            detailedItemPriceInfo: [
              {
                discounted: false,
                secondaryCurrencyTaxAmount: 0,
                amount: 229.99,
                quantity: 1,
                tax: 0,
                orderDiscountShare: 0,
                detailedUnitPrice: 229.99,
                currencyCode: "USD"
              }
            ],
            active: true,
            catRefId: "sku10025",
            skuProperties: [
              {
                name: "Not Returnable",
                id: "nonreturnable",
                value: false,
                propertyType: "sku-base"
              },
              {
                name: "Name",
                id: "displayName",
                value: null,
                propertyType: "sku-base"
              },
              {
                name: "Active",
                id: "active",
                value: true,
                propertyType: "sku-base"
              },
              {
                name: "Id",
                id: "id",
                value: "sku10025",
                propertyType: "sku-base"
              }
            ],
            discountInfo: [],
            route: "/xbox-360/product/prod10012",
            shopperInput: {},
            backOrderQuantity: 0,
            listPrice: 229.99,
            status: "INITIAL",
            priceOverrideReason: {}
          }
        ],
        trackingNumber: null,
        status: "INITIAL"
      }
    ];

    var priceListGroup = {
      deleted: false,
      isTaxIncluded: false,
      displayName: "Default Price Group",
      repositoryId: "defaultPriceGroup",
      listPriceList: {
        repositoryId: "listPrices"
      },
      active: true,
      salePriceList: {
        repositoryId: "salePrices"
      },
      currency: {
        currencyType: null,
        symbol: "$",
        deleted: false,
        displayName: "US Dollar",
        repositoryId: "en_US",
        fractionalDigits: 2,
        currencyCode: "USD",
        numericCode: "840"
      },
      id: "defaultPriceGroup",
      locale: "en_US",
      shippingSurchargePriceList: {
        repositoryId: "shippingSurchargePrices"
      }
    };
    var priceInfo = {
      amount: 229.99,
      total: 240.99,
      shipping: 11,
      shippingSurchargeValue: 0,
      tax: 0,
      subTotal: 229.99,
      currencyCode: "USD",
      totalWithoutTax: 240.99
    };
    var customerInfo = {
      firstName: "agentprof",
      lastName: "agentprof",
      middleName: null,
      email: "agentprofile@cc1549005129356.com",
      profileId: resp.profileId
    };
    var shoppingCartItems = [
      {
        dynamicProperties: [],
        stateDetailsAsUser: "Added to order",
        discountInfo: [],
        siteId: "siteUS",
        rawTotalPrice: 263.88,
        returnedQuantity: 2,
        displayName: "The Girl with the Dragon Tattoo",
        priceOverridenBy: "",
        shippingSurchargeValue: 0,
        availabilityDate: null,
        discountAmount: 0,
        externalData: [],
        imageInfo: {
          primaryThumbImageURL:
            "/ccstore/v1/images/?source=/file/v3838394227481959246/products/girldragontattoo_LARGE.jpg&height=100&width=100"
        },
        preOrderQuantity: 0,
        overriddenPrice: 20.55,
        commerceItemId: "ci1000466",
        price: 263.88,
        isPriceOverridden: false,
        variant: [],
        onSale: false,
        actionCode: null,
        locationInventoryInfoMap: [],
        unitPrice: 21.99,
        childSKUs: [
          {
            primaryThumbImageURL: null
          }
        ],
        quantity: 12,
        productId: "Product_36Exy",
        pointOfNoRevision: false,
        salePrice: 0,
        detailedItemPriceInfo: [
          {
            discounted: false,
            secondaryCurrencyTaxAmount: 0,
            amount: 263.88,
            quantity: 12,
            tax: 26.4,
            orderDiscountShare: 0,
            detailedUnitPrice: 21.99,
            currencyCode: "USD"
          }
        ],
        giftWithPurchaseCommerceItemMarkers: [],
        originalCommerceItemId: null,
        tax: 26.4,
        catRefId: "Sku_36Fxy",
        stateDescription: "INITIAL",
        backOrderQuantity: 0,
        listPrice: 21.99,
        status: 0,
        priceOverrideReason: {}
      },
      {
        dynamicProperties: [],
        stateDetailsAsUser: "Added to order",
        discountInfo: [],
        siteId: "siteUS",
        rawTotalPrice: 263.88,
        returnedQuantity: 2,
        displayName: "The Girl with the Dragon Tattoo",
        priceOverridenBy: "",
        shippingSurchargeValue: 0,
        availabilityDate: null,
        discountAmount: 0,
        externalData: [],
        imageInfo: {
          primaryThumbImageURL:
            "/ccstore/v1/images/?source=/file/v3838394227481959246/products/girldragontattoo_LARGE.jpg&height=100&width=100"
        },
        preOrderQuantity: 0,
        overriddenPrice: "",
        commerceItemId: "ci1000466",
        price: 263.88,
        isPriceOverridden: false,
        variant: [],
        onSale: false,
        actionCode: null,
        locationInventoryInfoMap: [],
        unitPrice: 21.99,
        childSKUs: [
          {
            primaryThumbImageURL: null
          }
        ],
        quantity: 12,
        productId: "Product_36Exy",
        pointOfNoRevision: false,
        salePrice: 0,
        detailedItemPriceInfo: [
          {
            discounted: false,
            secondaryCurrencyTaxAmount: 0,
            amount: 263.88,
            quantity: 12,
            tax: 26.4,
            orderDiscountShare: 0,
            detailedUnitPrice: 21.99,
            currencyCode: "USD"
          }
        ],
        giftWithPurchaseCommerceItemMarkers: [],
        originalCommerceItemId: null,
        tax: 26.4,
        catRefId: "Sku_36Fxy",
        stateDescription: "INITIAL",
        backOrderQuantity: 0,
        listPrice: 21.99,
        status: 0,
        priceOverrideReason: {}
      }
    ];

    var shippingAddress = shippingGroups[0].shippingAddress;
    var shippingMethodName = shippingGroups[0].shippingMethod.displayName;

    return (
      <Container textAlign="center">
        <Grid columns={3}>
          <Grid.Row />
          <Grid.Row />

          <Grid.Row>
            <OrderIdAndState
              stateDetailsAsUser={stateDetailsAsUser}
              submittedDate={submittedDate}
              orderId={orderId}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <CustomerInfo customerInfo={customerInfo} />
            </Grid.Column>
            <Grid.Column />

            <Grid.Column>
              <OrderSummary
                priceInfo={priceInfo}
                currecySybmol={priceListGroup.currency.symbol}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <OrderedCartItems shoppingCartItems={shoppingCartItems} />
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <ShippingInfo />
            </Grid.Column>
            <Grid.Column />
            <Grid.Column>
              <ShippingInfo />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

/**
 *
 *  <OrderIdAndState />
        <CustomerInfo />

        <ShippingInfo /> */
