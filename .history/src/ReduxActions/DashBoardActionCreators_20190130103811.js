import { FETCH_RECENT_ORDERS } from "./ActionConstants";
import { make } from "../Rest/agent-rest-client";
import { LOGIN_URI } from "../Rest/RestConstants";

function recentOrdersActionCreator() {

   
  return {
    type: FETCH_RECENT_ORDERS
    //payload:
  };
}
