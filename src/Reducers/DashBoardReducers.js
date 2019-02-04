import {
  SET_ANNOUNCEMENTS,
  SET_QUICK_LINKS,
  SET_RECENT_ORDERS,
  SET_PENDING_ACTIONS
} from "../ReduxActions/ActionConstants.js";
import { combineReducers } from "redux";
import { SET_AUTH_TOKEN } from "../ReduxActions/ActionConstants.js";

/*var sampleStoreObject = {
  Login: {
    AUTH_TOKEN: "",
    isLoggedIn: false
  },
  DASH_BOARD: {
    recentOrders: [],
    quickLinks: [],
    announcements: []
  }
};*/

let loginInitialState = {
  AUTH_TOKEN: null,
  isLoggedIn: false
};

let dashboardInitialState = {
  recentOrders: [],
  quickLinks: [],
  announcements: [],
  pendingActions:[]
};


export function recentOrders(state = [], action) {
  switch (action.type) {
    case SET_RECENT_ORDERS:
      return [...state, ...action.payload.recentOrders];
    default:
      return state;
  }
}

export function pendingActions(state = [], action) {
  switch (action.type) {
    case SET_PENDING_ACTIONS:
      return [...state, ...action.payload.pendingActions];
    default:
      return state;
  }
}
export function announcements(state = [], action) {
  switch (action.type) {
    case SET_ANNOUNCEMENTS:
      return [...state, ...action.payload.announcements];
    default:
      return state;
  }
}

export function quickLinks(state = [], action) {
  switch (action.type) {
    case SET_QUICK_LINKS:
      return [...state, ...action.payload.quickLinks];
    default:
      return state;
  }
}

export function dashboardReducer(state = dashboardInitialState, action) {
  switch (action.type) {
    case SET_RECENT_ORDERS:
      var recentOrdersList = recentOrders(state.recentOrders, action);
      return Object.assign(
        {},
        state,
        Object.assign({}, state, {
          recentOrders: recentOrdersList
        })
      );
    case SET_QUICK_LINKS:
      var quickLinksList = quickLinks(state.quickLinks, action);
      return Object.assign(
        {},
        state,
        Object.assign({}, state, {
          quickLinks: quickLinksList
        })
      );
    case SET_ANNOUNCEMENTS:
      var announcementsList = announcements(state.announcements, action);
      return Object.assign(
        {},
        state,
        Object.assign({}, state, {
          announcements: announcementsList
        })
      );
    case SET_PENDING_ACTIONS:
      var pendingActionsList = pendingActions(state.pendingActions, action);
      return Object.assign(
        {},
        state,
        Object.assign({}, state, {
          pendingActions: pendingActionsList
        })
      );
    default:
      return state;
  }
}

export function loginReducer(state = loginInitialState, action) {
  console.log("I am in Login reducer", action);
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return Object.assign(
        {},
        state,
        Object.assign({}, loginInitialState, {
          AUTH_TOKEN: action.payload.AUTH_TOKEN,
          isLoggedIn: action.payload.isLoggedIn
        })
      );
    default:
      return state;
  }
}

var rootReducer = combineReducers({
  DASH_BOARD: dashboardReducer,
  LOGIN: loginReducer
});

export default rootReducer;
