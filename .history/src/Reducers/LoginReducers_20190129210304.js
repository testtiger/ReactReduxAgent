import { FETCH_RECENT_ORDERS } from "../ReduxActions/ActionConstants.js";
import { FETCH_QUICK_LINKS } from "../ReduxActions/ActionConstants.js";
import {combineReducers} from "./redux";

var sampleStoreObject = {
  AUTH_TOKEN: "",
  DASH_BOARD: {
    RECENT_ORDERS: [],
    QUICK_LINKS: []
  }
};

export function recentOrders(orders = [], action) {
  switch (action.type) {
    case FETCH_RECENT_ORDERS:
      return [];

    default:
      return orders;
  }
}

export function quickLinks(quickLinks = [], action) {
    switch (action.type) {
      case FETCH_QUICK_LINKS:
        return [];

      default:
        return quickLinks;
    }
}

combineReducers()