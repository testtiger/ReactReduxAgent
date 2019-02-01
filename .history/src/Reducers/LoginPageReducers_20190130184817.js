import { FETCH_RECENT_ORDERS } from "../ReduxActions/ActionConstants.js";
import { FETCH_QUICK_LINKS } from "../ReduxActions/ActionConstants.js";
import { combineReducers } from "./redux";
import DashboardPage from "../components/Dashboard/DashboardPage.jsx";

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

let dashboardInitialState = {
    AUTH_TOKEN: nu,
  quickLinks: []
};
export function login(state = [], action) {
    switch (action.type) {
        case FETCH_RECENT_ORDERS:
            return [];
        default:
            return state;
    }
}




var rootReducer = combineReducers({
   
});

export default rootReducer;
