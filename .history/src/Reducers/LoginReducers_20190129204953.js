import { FETCH_RECENT_ORDERS } from "../ReduxActions/ActionConstants.js";
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

export function quickLinks(quick = [], action) {
    switch (action.type) {
        case FETCH_RECENT_ORDERS:
            return [];

        default:
            return orders;
    }
}
