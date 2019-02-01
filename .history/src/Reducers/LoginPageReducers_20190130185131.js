import { SET_AUTH_TOKEN } from "../ReduxActions/ActionConstants.js";
import { combineReducers } from "./redux";

var sampleStoreObject = {
  Login: {
    AUTH_TOKEN: "",
    isLoggedIn: false
  },
  DASH_BOARD: {
    RECENT_ORDERS: [],
    QUICK_LINKS: []
  }
};

let loginInitialState = {
  AUTH_TOKEN: null,
  isLoggedIn: false
};
export function login(state = loginInitialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
          AUTH_TOKEN: "Bearer " + response.access_token, isLoggedIn
          Object.assign({}, state, action.payload.AUTH_TOKEN, isLoggedIn)
        var localState=[...]
          return [loginInitialState];
    default:
      return state;
  }
}

var rootReducer = combineReducers({});

export default rootReducer;
