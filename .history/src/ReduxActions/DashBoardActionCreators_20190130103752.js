import { FETCH_RECENT_ORDERS } from "./ActionConstants";
import { makeRestcall } from "../Rest/agent-rest-client";
import { LOGIN_URI } from "../Rest/RestConstants";

function recentOrdersActionCreator() {

    makeRestcall
  return {
    type: FETCH_RECENT_ORDERS
    //payload:
  };
}
